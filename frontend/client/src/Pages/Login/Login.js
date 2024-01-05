import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8100/api/users/login', {
          email,
          password,
        }, { 
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        const { token, user } = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        if (user.userType === 'Creator') {
          navigate('/'); // Navigate to dashboard for creators
        } else {
          navigate('/memespage'); // Navigate to memepages for viewers
        }
  
      } catch (error) {
        console.error('Login failed:', error.response.data); // Log detailed error response
    
    
        
      }
    };
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
         type="password"
         placeholder="Enter Password"
        name="password"
         className="form-control rounded-0"
         autoComplete="current-password" 
        onChange={(e) => setPassword(e.target.value)}
       />

          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          </form>
          <p>Don't Have Account?</p>
          <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Register
          </button>
        
      </div>
    </div>
  )
}

export default Login