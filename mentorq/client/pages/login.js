import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="login-container"
      >
        <div className="login-card">
          <h1>Login to MentorQ</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
            
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="register-link">
            Don't have an account? <Link href="/register">Register here</Link>
          </div>
        </div>
      </motion.main>
      
      <Footer />

      <style jsx>{`
        .login-page {
          background: #0f0f0f;
          min-height: 100vh;
        }
        .login-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
        }
        .login-card {
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
        input {
          width: 100%;
          padding: 12px 15px;
          background: #2a2a2a;
          border: 1px solid #333;
          border-radius: 8px;
          color: #d4d4d4;
          font-size: 1rem;
        }
        input:focus {
          border-color: #ffd700;
          outline: none;
        }
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .remember-me input {
          width: auto;
        }
        .form-options a {
          color: #ffd700;
          text-decoration: none;
          font-size: 0.9rem;
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
        }
        .btn:hover {
          background: #ffeb3b;
          transform: translateY(-2px);
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .register-link {
          text-align: center;
          margin-top: 20px;
          color: #c0c0c0;
        }
        .register-link a {
          color: #ffd700;
          text-decoration: none;
        }
        
        @media (max-width: 576px) {
          .login-card {
            padding: 30px 20px;
          }
          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
}