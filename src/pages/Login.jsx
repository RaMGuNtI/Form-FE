import React, { useState } from 'react';
import api from '../services/api';
import { saveToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', form);
      saveToken(data.token);
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={submit} className="auth-form">
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="auth-input"
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="auth-input"
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>
      <p>Don't Have an Account <span className='spa' onClick={()=>nav("/register")}>Register</span></p>
    </div>
  );
}
