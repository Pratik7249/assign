import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>📚 EdTrack</h2>
      <div style={styles.links}>
        {role === 'teacher' && (
          <>
            <button onClick={() => navigate('/create-assignment')} style={styles.button}>
              Create Assignment
            </button>
            <button onClick={() => navigate('/submissions')} style={styles.button}>
              View Submissions
            </button>
          </>
        )}

        {role === 'student' && (
          <>
            <button onClick={() => navigate('/submit-assignment')} style={styles.button}>
              Submit Assignment
            </button>
            <button onClick={() => navigate('/submissions')} style={styles.button}>
              My Submissions
            </button>
          </>
        )}

        <button onClick={handleLogout} style={{ ...styles.button, background: '#e74c3c' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#2c3e50',
    padding: '10px 20px',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    background: '#3498db',
    border: 'none',
    padding: '8px 12px',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Navbar;