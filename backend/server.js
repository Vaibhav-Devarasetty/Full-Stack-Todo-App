const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Add this new requirement
const app = express();
const port = 4000;

// Add JWT secret key
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Updated task schema with user reference
const taskSchema = new mongoose.Schema({
  task: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Updated routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

// Protected routes
app.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(400).send('Error fetching tasks');
  }
});

app.post('/tasks', authenticateToken, async (req, res) => {
  const { task } = req.body;
  try {
    const newTask = await Task.create({ 
      task,
      user: req.userId
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).send('Error adding task');
  }
});

app.delete('/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findOneAndDelete({ 
      _id: id,
      user: req.userId 
    });
    if (!deletedTask) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send('Task deleted');
  } catch (error) {
    res.status(400).send('Error deleting task');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});