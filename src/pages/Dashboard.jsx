import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../services/auth';
import './Dashboard.css';

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const { data } = await api.get('/api/forms/my');
      setForms(data);
    } catch (err) {
      alert('Failed to load forms', err);
    }
  };

  const logout = () => {
    clearToken();
    nav('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>📋 My Forms</h2>
        <div className="action-buttons">
          <Link to="/create" className="btn btn-primary">
            ➕ Create Form
          </Link>
          <button onClick={logout} className="btn btn-danger">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Form List */}
      <div className="form-grid">
        {forms.length === 0 && (
          <p className="empty-message">
            No forms yet. Click "Create Form" to start one! 🚀
          </p>
        )}

        {forms.map((f) => (
          <div key={f._id} className="form-card">
            <div className="form-info">
              <h3>{f.title}</h3>
              <p>ID: {f.formId}</p>
            </div>
            <div className="form-actions">
              <a
                href={`/forms/${f.formId}/fill`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success btn-sm"
              >
                Open
              </a>
              <Link
                to={`/responses/${f.formId}`}
                className="btn btn-info btn-sm"
              >
                Responses
              </Link>
            </div>
            <button>Delete Form</button>
          </div>
        ))}
      </div>
    </div>
  );
}
