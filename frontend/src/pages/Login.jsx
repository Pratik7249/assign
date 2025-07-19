import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      navigate(role === 'teacher' ? '/create-assignment' : '/submit-assignment');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login', { email, password });
      const { id, role } = res.data;
      localStorage.setItem('token', id);
      localStorage.setItem('userId', id);
      localStorage.setItem('role', role.toLowerCase());
      navigate(role === 'teacher' ? '/create-assignment' : '/submit-assignment');
    } catch (err) {
      alert('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Log In</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.signupText}>
        Don't have an account?{' '}
        <span style={styles.signupLink} onClick={() => navigate('/signup')}>
          Sign up
        </span>
      </p>
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
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  signupText: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
  },
  signupLink: {
    color: '#3498db',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default Login;