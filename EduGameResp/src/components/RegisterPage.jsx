


// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './AuthForms.css'; // Use the shared CSS

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
 const [school, setSchool] = useState(''); 
  const [userClass, setUserClass] = useState(''); // Changed to userClass for clarity
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signup(email, password, name, userClass,school);
      navigate('/'); // Redirect to home on successful signup
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    }
    setLoading(false);
  };
 
  return (
    <div className="auth-container"> {/* Use the shared container class */}
      <div className="auth-form-card"> {/* Use the shared card class */}
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
          <input type="text" value={userClass} onChange={(e) => setUserClass(e.target.value)} placeholder="Your Class" required />
        <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Your School" required /> 
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 characters)" required />
        
          <button disabled={loading} type="submit">Sign Up</button>
        </form>
        <div className="switch-auth-link">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;