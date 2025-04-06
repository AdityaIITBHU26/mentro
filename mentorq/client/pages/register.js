import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { name, email, password, confirmPassword, role } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="register-container"
      >
        <div className="register-card">
          <h1>Create an Account</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">I am a</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
            
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <div className="login-link">
            Already have an account? <Link href="/login">Login here</Link>
          </div>
        </div>
      </motion.main>
      
      <Footer />

      <style jsx>{`
        .register-page {
          background: #0f0f0f;
          min-height: 100vh;
        }
        .register-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
        }
        .register-card {
          background: #1f1f1f;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          width: 100%;
          max-width: 500px;
        }
        h1 {
          color: #ffd700;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2rem;
        }
        .error-message {
          color: #f44336;
          background: rgba(244, 67, 54, 0.1);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #c0c0c0;
        }
        input, select {
          width: 100%;
          padding: 12px 15px;
          background: #2a2a2a;
          border: 1px solid #333;
          border-radius: 8px;
          color: #d4d4d4;
          font-size: 1rem;
        }
        input:focus, select:focus {
          border-color: #ffd700;
          outline: none;
        }
        .btn {
          width: 100%;
          padding: 15px;
          background: #ffd700;
          color: #1a1a2e;
          border: none;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        .btn:hover {
          background: #ffeb3b;
          transform: translateY(-2px);
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-link {
          text-align: center;
          margin-top: 20px;
          color: #c0c0c0;
        }
        .login-link a {
          color: #ffd700;
          text-decoration: none;
        }
        
        @media (max-width: 576px) {
          .register-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}