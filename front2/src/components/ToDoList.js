import React, { useState } from 'react';
import './ToDoList.css';

const initialPrayers = [
  { name: 'Fajr', time: 'Sabah Namazı', completed: false },
  { name: 'Dhuhr', time: 'Öğle Namazı', completed: false },
  { name: 'Asr', time: 'İkindi Namazı', completed: false },
  { name: 'Maghrib', time: 'Akşam Namazı', completed: false },
  { name: 'Isha', time: 'Yatsı Namazı', completed: false }
];

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [prayers, setPrayers] = useState(initialPrayers);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const handleTogglePrayer = (index) => {
    const updatedPrayers = prayers.map((prayer, prayerIndex) => {
      if (prayerIndex === index) {
        return { ...prayer, completed: !prayer.completed };
      }
      return prayer;
    });
    setPrayers(updatedPrayers);
  };

  return (
    <div className="todo-list">
      <h3>To-Do List</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => handleToggleTask(index)}>{task.text}</span>
            <button onClick={() => handleDeleteTask(index)}>Sil</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Yeni görev ekle"
      />
      <button onClick={handleAddTask}>Ekle</button>

      <h3>Günlük Namazlar</h3>
      <ul>
        {prayers.map((prayer, index) => (
          <li key={index} className={prayer.completed ? 'completed' : ''}>
            <span onClick={() => handleTogglePrayer(index)}>{prayer.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
