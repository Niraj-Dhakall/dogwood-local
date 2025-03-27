import React, { useState } from 'react';
import axios from 'axios';

const CreateGroupSettings = () => {
  const [formData, setFormData] = useState({
    user_id: '', // Will be populated from auth context or props in a real app
    name: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.user_id || !formData.name) {
      setMessage({ 
        text: 'User ID and group name are required fields', 
        type: 'error' 
      });
      return;
    }

    // Format the request data
    const requestData = {
      user_id: parseInt(formData.user_id),
      name: formData.name,
      description: formData.description
    };

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post('/createGroup', requestData);
      
      // Handle successful response
      setMessage({ 
        text: `Group "${response.data.name}" created successfully!`, 
        type: 'success' 
      });
      
      // Clear form after successful submission
      setFormData({
        user_id: formData.user_id, // Keep the user ID
        name: '',
        description: ''
      });
    } catch (error) {
      // Handle error response
      const errorMessage = error.response?.data || 'Failed to create group. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Group</h2>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Group Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Creating...' : 'Create Group'}
        </button>
      </form>
    </div>
  );
};

export default CreateGroupSettings;