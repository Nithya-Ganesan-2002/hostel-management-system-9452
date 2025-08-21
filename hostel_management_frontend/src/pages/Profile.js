import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';
import authService from '../services/authService';
import '../components/Form.css';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = authService.getCurrentUser();
        if (user && user.id) {
          const response = await getProfile(user.id);
          setProfile(response.data);
        } else {
          setError('Could not identify user. Please log in again.');
        }
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const user = authService.getCurrentUser();
    if (!user || !user.id) {
      setError('Could not identify user. Please log in again.');
      return;
    }

    setLoading(true);
    try {
      const updateData = { ...profile };
      if (password) {
        updateData.password = password;
      }
      await updateProfile(user.id, updateData);
      setSuccess('Profile updated successfully!');
      setPassword('');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile.name) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="page-title">My Profile</h1>
      <form className="form profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
