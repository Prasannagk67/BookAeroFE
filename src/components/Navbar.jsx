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

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_USER_REGISTER_API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('User registered successfully!');
                setFormData({
                    fullName: '',
                    userName: '',
                    email: '',
                    mobileNumber: '',
                    password: ''
                });
                handleClose();
            } else {
                const error = await response.text();
                alert('Registration failed: ' + error);
            }
        } catch (err) {
            alert('Error: ' + err.message);
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