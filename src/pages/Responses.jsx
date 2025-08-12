import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './Responses.css';

export default function Responses() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const { data } = await api.get(`/api/responses/${formId}`);
      setResponses(data);
    } catch (err) {
      alert('Failed to load responses');
    }
  };

  return (
    <div className="responses-container">
      <h2 className="responses-title">Responses</h2>
      {responses.length === 0 && <p>No responses yet.</p>}
      <div className="responses-list">
        {responses.map((r) => (
          <div key={r._id} className="response-card">
            <div className="response-date">
              {new Date(r.submittedAt).toLocaleString()}
            </div>
            <div className="response-answers">
              {r.answers.map((a, idx) => (
                <div key={idx} className="response-item">
                  <strong>{a.question}:</strong> {a.answer}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
