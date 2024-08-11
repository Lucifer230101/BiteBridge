import React, { useState } from 'react';
import './bootstrap/dist/css/bootstrap.min.css';
import './styles/SignupPage.css'// Import your custom CSS

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <div className="signup-container">
            <div className="icon-container">
                <img src={`${process.env.PUBLIC_URL}/images/burger-icon.png`} alt="Sign Up Icon" /> {/* Replace with your image URL */}
            </div>
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="col btn btn-pink-moon">Sign Up</button>
                </form>
            </div>
        </div>
    );
};



export default SignUpPage;
