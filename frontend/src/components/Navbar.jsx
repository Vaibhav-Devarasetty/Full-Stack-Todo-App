import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <nav>
            <h1>To-Do-List</h1>
            {isLoggedIn ? (
                <button onClick={handleLogoutClick}>Logout</button>
            ) : (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;