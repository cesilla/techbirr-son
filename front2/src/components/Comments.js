import React, { useState } from 'react';
import './Comments.css';

const Comments = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="comments">
      <h3>Yorumlar</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Yorum ekle"
      />
      <button onClick={handleAddComment}>Ekle</button>
    </div>
  );
};

export default Comments;
