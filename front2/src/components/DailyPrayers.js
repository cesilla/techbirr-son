import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DailyPrayer.css';

const prayerGroups = [
  { id: 1, title: 'Morning Prayers', description: 'These prayers are to be recited in the morning.' },
  { id: 2, title: 'Evening Prayers', description: 'These prayers are to be recited in the evening.' },
  { id: 3, title: 'Night Prayers', description: 'These prayers are to be recited at night.' },
  // Add more groups as needed
];

const DailyPrayers = () => {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredGroup(id);
  };

  const handleMouseLeave = () => {
    setHoveredGroup(null);
  };

  return (
    <div className="daily-prayers-container">
      <h1>Daily Prayers</h1>
      <div className="prayer-groups">
        {prayerGroups.map(group => (
          <div
            key={group.id}
            className="prayer-group"
            onMouseEnter={() => handleMouseEnter(group.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/prayer-group/${group.id}`} className="prayer-group-link">
              Enter Here
            </Link>
            {hoveredGroup === group.id && <div className="prayer-group-description">{group.description}</div>}
          </div>
        ))}
      </div>
      <Link to="/add-prayer" className="add-prayer-button">
        Add New Prayer
      </Link>
    </div>
  );
};

export default DailyPrayers;
