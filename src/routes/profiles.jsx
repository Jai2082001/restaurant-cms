import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/slices/userSlices';

const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.user);
  
  const [name, setName] = useState(userProfile.name);
  const [address, setAddress] = useState(userProfile.address || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateProfile({ name, address }));
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address:
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            placeholder="Enter your address"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
