// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/signup', formData);
      navigate('/login');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Signup</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input style={styles.input} type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select style={styles.input} name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button style={styles.button} type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/login" style={styles.loginLink}>Login</Link></p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  loginLink: {
    color: '#3498db',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default Signup;
