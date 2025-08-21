import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// PUBLIC_INTERFACE
/**
 * Handles user login by making a POST request to the backend.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The user data from the backend.
 */
const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// PUBLIC_INTERFACE
/**
 * Logs the user out by removing the user data from local storage.
 */
const logout = () => {
  localStorage.removeItem('user');
};

// PUBLIC_INTERFACE
/**
 * Retrieves the current user's data from local storage.
 * @returns {object | null} The user data or null if not found.
 */
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
