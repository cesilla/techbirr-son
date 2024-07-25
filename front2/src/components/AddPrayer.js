import React, { useState } from 'react';
import './AddPrayer.css';


const AddPrayer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prayers, setPrayers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to API or update state
    console.log({ title, description, prayers });
  };

  return (
    <div className="add-prayer-container">
      <h1>Add New Prayer</h1>
      <form onSubmit={handleSubmit} className="add-prayer-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prayers">Prayers</label>
          <textarea
            id="prayers"
            value={prayers}
            onChange={(e) => setPrayers(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Prayer</button>
      </form>
    </div>
  );
};

export default AddPrayer;
