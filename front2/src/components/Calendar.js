import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Calendar.css';

const Calendar = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPrayerTimes = async (city, country) => {
    const promises = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];

      promises.push(
        axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2&date=${formattedDate}`)
      );
    }

    try {
      const responses = await Promise.all(promises);
      const times = responses.map(response => response.data.data.timings);
      setPrayerTimes(times);
      setLoading(false);
    } catch (error) {
      setError('Error fetching prayer times');
      setLoading(false);
      console.error('Prayer Times Error:', error);
    }
  };

  useEffect(() => {
    fetchPrayerTimes('Istanbul', 'Turkey'); // Replace with the desired city and country
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="calendar-page">
      {error && <p>{error}</p>}
      <div className="calendar">
        {prayerTimes.length > 0 ? (
          prayerTimes.map((times, index) => (
            <div key={index} className="calendar-day">
              <h3>Day {index + 1}</h3>
              <p>Fajr: {times.Fajr}</p>
              <p>Dhuhr: {times.Dhuhr}</p>
              <p>Asr: {times.Asr}</p>
              <p>Maghrib: {times.Maghrib}</p>
              <p>Isha: {times.Isha}</p>
            </div>
          ))
        ) : (
          <p>No prayer times available</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
