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
    dispatch(updateProfile({ name, address }));
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your address"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;