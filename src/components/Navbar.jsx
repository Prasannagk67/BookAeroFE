import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        email: '',
        mobileNumber: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleOpen = () => {
        setShowModal(true);
        setError(null);
        setSuccess(false);
    };

    const handleClose = () => {
        setShowModal(false);
        setError(null);
        setSuccess(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${process.env.REACT_APP_USER_REGISTER_API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    fullName: '',
                    userName: '',
                    email: '',
                    mobileNumber: '',
                    password: ''
                });
                setTimeout(() => {
                    handleClose();
                }, 1500);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        }
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-left'>
                    <h1 className='logo'>BookAero</h1>
                </div>
                <div className='navbar-right'>
                    <button className='register-button' onClick={handleOpen}>Register</button>
                </div>
            </nav>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Register</h2>
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="success-message">
                                Registration successful! Closing...
                            </div>
                        )}
                        <form className="register-form" onSubmit={handleSubmit}>
                            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                            <input type="text" name="userName" placeholder="User Name" value={formData.userName} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            <input type="text" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                            <button type="submit">Submit</button>
                            <button type="button" className="close-btn" onClick={handleClose}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;