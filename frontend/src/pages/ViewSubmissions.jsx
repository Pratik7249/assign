import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewSubmissions = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem('role');         // 'teacher' or 'student'
  const userId = localStorage.getItem('userId');     // student ID for filtering

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get('http://localhost:8000/assignments');
        setAssignments(res.data);
      } catch (err) {
        alert('Failed to fetch assignments');
        setAssignments([]);
      }
    };
    fetchAssignments();
  }, []);

  const fetchSubmissions = async (assignmentId) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/submissions/${assignmentId}`);
      let data = res.data;

      if (role === 'student') {
        data = data.filter((sub) => sub.student_id == userId);
      }

      setSubmissions(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Failed to fetch submissions');
      setSubmissions([]);
    }
  };

  const handleAssignmentChange = (e) => {
    const id = e.target.value;
    setSelectedAssignmentId(id);
    if (id) {
      fetchSubmissions(id);
    } else {
      setSubmissions([]);
    }
  };

  const selectedAssignmentTitle = assignments.find(
    (a) => a.id === parseInt(selectedAssignmentId)
  )?.title;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📄 View Submissions</h2>

      <select
        value={selectedAssignmentId}
        onChange={handleAssignmentChange}
        style={styles.select}
      >
        <option value="">Select Assignment</option>
        {assignments.map((a) => (
          <option key={a.id} value={a.id}>
            {a.title}
          </option>
        ))}
      </select>

      {selectedAssignmentId && (
        <h3 style={{ marginTop: '10px' }}>
          Submissions for: <em>{selectedAssignmentTitle}</em>
        </h3>
      )}

      {!selectedAssignmentId && !loading && (
        <p style={{ marginTop: '20px' }}>Please select an assignment to view submissions.</p>
      )}

      {loading && <p>Loading submissions...</p>}

      {!loading && submissions.length > 0 && (
        <ul style={styles.submissionList}>
          {submissions.map((sub) => (
            <li key={sub.id || `${sub.student_id}-${sub.timestamp}`} style={styles.submissionItem}>
              <p><strong>👨‍🎓 Student ID:</strong> {sub.student_id}</p>
              <p><strong>📅 Submitted On:</strong> {new Date(sub.timestamp).toLocaleString()}</p>
              <p><strong>📝 Content:</strong> {sub.content || <em>No content submitted</em>}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}

      {!loading && selectedAssignmentId && submissions.length === 0 && (
        <p>No submissions found{role === 'student' ? ' for you' : ''} for this assignment.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  heading: {
    marginBottom: '20px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    width: '100%',
  },
  submissionList: {
    listStyleType: 'none',
    padding: 0,
  },
  submissionItem: {
    background: '#f4f4f4',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '15px',
  },
};

export default ViewSubmissions;
