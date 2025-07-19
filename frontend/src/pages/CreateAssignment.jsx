import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [teacherId, setTeacherId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const role = (localStorage.getItem('role') || '').toLowerCase();
  const id = localStorage.getItem('userId');

  if (role !== 'teacher' || !id || isNaN(parseInt(id))) {
    alert('Access denied. Only teachers can create assignments.');
    // Delay navigation slightly to prevent race with render
    setTimeout(() => navigate('/login'), 0);
  } else {
    setTeacherId(parseInt(id));
  }
}, []);


const handleCreate = async (e) => {
  e.preventDefault();

  if (!title || !description || !dueDate) {
    alert('Please fill in all fields.');
    return;
  }

  const teacherId = parseInt(localStorage.getItem('userId'));
  if (isNaN(teacherId)) {
    alert('Invalid teacher ID. Please log in again.');
    return;
  }

  const payload = {
    title: title.trim(),
    description: description.trim(),
    due_date: dueDate, // format: YYYY-MM-DD
    teacher_id: teacherId
  };

  try {
    console.log("📤 Sending payload:", payload);
    const res = await axios.post('http://localhost:8000/assignments', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    alert('✅ Assignment created successfully!');
    setTitle('');
    setDescription('');
    setDueDate('');
  } catch (err) {
    const detail = err.response?.data?.detail;
    const msg = Array.isArray(detail) ? detail[0]?.msg : detail || err.message;
    console.error('❌ Submission error:', detail || err);
    alert('Error: ' + msg);
  }
};


  return (
    <div style={styles.container}>
      <h2>Create Assignment</h2>
      <form onSubmit={handleCreate} style={styles.form}>
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Assignment Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Create</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  textarea: {
    padding: '8px',
    fontSize: '16px',
    height: '100px',
  },
  button: {
    background: '#2ecc71',
    color: 'white',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default CreateAssignment;
