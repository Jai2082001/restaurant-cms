// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/userSlices.js';
import { useNavigate } from 'react-router-dom';
import AccountPage from '../components/AccountLogged.jsx';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleGoogleLogin = ()=>{
    window.location.href = `${process.env.REACT_APP_FETCH_LINK}/auth/google`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Dispatch registerUser for registration
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      dispatch(registerUser({ email, password })).then((result) => {
        if (result.type === 'auth/registerUser/fulfilled') {
          alert('Registration successful! Please log in.');
          setIsRegistering(false); // Switch to login form after successful registration
        }
      });
    } else {
      // Dispatch loginUser for login
      dispatch(loginUser({ email, password })).then((result) => {
        if (result.type === 'auth/loginUser/fulfilled') {
          alert('Logged in successfully!');
          navigate('/'); // Redirect to a secured page
        }
      });
    }
  };


  const AccountNotLogged =  () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {status === 'loading' && <p className="text-blue-500 mb-4 text-center">Loading...</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {isRegistering && (
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {isRegistering ? 'Register' : 'Log In'}
        </button>
        <button onClick={handleGoogleLogin} className="w-full mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Login with Google</button>


        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)} // Toggle between login and register
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? 'Already have an account? Log In' : 'Need an account? Register'}
          </button>
        </div>
      </form>
    </div>
    )
  }

  return (
    <>
    {!isAuthenticated && <AccountNotLogged></AccountNotLogged>}
    {isAuthenticated && <AccountPage></AccountPage>}   
    </>
    
  );

};

export default Account;
