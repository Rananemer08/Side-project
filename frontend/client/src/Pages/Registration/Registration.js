import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Registration.css";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(''); 
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8100/api/users', {
          username,
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          userType,
        });
  
        // Check userType and navigate accordingly
        if (userType === 'Creator') {
          navigate('/');
        } else if (userType === 'Viewer') {
          navigate('/memespage');
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };
  
    return (
      <div className='regBack'>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                autoComplete="off"
                name="username"
                className="form-control rounded-0"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName">
                <strong>First Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                autoComplete="off"
                name="firstName"
                className="form-control rounded-0"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                autoComplete="off"
                name="lastName"
                className="form-control rounded-0"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userType">
                <strong>User Type</strong>
              </label>
              <select
                className="form-control rounded-0"
                name="userType"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="Creator">Creator</option>
                <option value="Viewer">Viewer</option>
                
              </select>
            </div>
            
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
          </form>
          <p>Already Have an Account</p>
          <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </button>
        </div>
      </div>
      </div>
    );
  };
  
  export default Registration;
  