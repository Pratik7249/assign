import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmitAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const role = (localStorage.getItem('role') || '').toLowerCase();
  const studentId = localStorage.getItem('userId');

  useEffect(() => {
    if (role !== 'student' || !studentId) {
      alert('Access denied. Only students can submit assignments.');
      navigate('/login');
    }
  }, [navigate, role, studentId]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get('http://localhost:8000/assignments');
        setAssignments(res.data);
      } catch (err) {
        alert('Failed to load assignments');
        console.error('Error fetching assignments:', err);
      }
    };
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assignmentIdInt = parseInt(selectedAssignmentId);
    const studentIdInt = parseInt(studentId);

    if (isNaN(assignmentIdInt) || isNaN(studentIdInt)) {
      alert('Invalid assignment or student ID');
      return;
    }

    try {
      await axios.post('http://localhost:8000/submit', {
        assignment_id: assignmentIdInt,
        student_id: studentIdInt,
        content,
      });

      alert('Submission successful!');
      setContent('');
      setSelectedAssignmentId('');
    } catch (err) {
      console.error('Error submitting assignment:', err);
      alert(
        err?.response?.data?.detail?.[0]?.msg ||
          'Submission failed. Please try again.'
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Submit Assignment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={selectedAssignmentId}
          onChange={(e) => setSelectedAssignmentId(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">Select Assignment</option>
          {assignments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Your Submission"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>Submit</button>
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
  select: {
    padding: '8px',
    fontSize: '16px',
  },
  textarea: {
    padding: '8px',
    fontSize: '16px',
    height: '100px',
  },
  button: {
    background: '#3498db',
    color: 'white',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default SubmitAssignment;
