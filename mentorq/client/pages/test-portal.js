import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const TestPortal = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await axios.get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(userRes.data);
        
        // Fetch tests
        const testsRes = await axios.get('/api/tests');
        setTests(testsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  const startTest = (testId) => {
    if (!user?.subscription?.isActive) {
      alert('Please subscribe to access this test');
      router.push('/pricing');
    } else {
      router.push(`/test/${testId}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="test-portal-container">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="test-portal"
      >
        <h1>Test Portal</h1>
        <p className="subtitle">Master JEE & NEET with our advanced CBT platform</p>
        
        <div className="test-categories">
          <button className="category-btn active">All Tests</button>
          <button className="category-btn">JEE</button>
          <button className="category-btn">NEET</button>
          <button className="category-btn">Foundation</button>
        </div>
        
        <div className="test-grid">
          {tests.map((test) => (
            <motion.div 
              key={test._id}
              className="test-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="test-header">
                <h3>{test.title}</h3>
                <span className={`tag ${test.examType.toLowerCase()}`}>
                  {test.examType}
                </span>
              </div>
              <p className="test-description">{test.description}</p>
              <div className="test-meta">
                <span>⏱️ {test.duration} mins</span>
                <span>📝 {test.questions.length} questions</span>
                <span>🎯 {test.totalMarks} marks</span>
              </div>
              <div className="test-footer">
                {test.isPremium && !user?.subscription?.isActive ? (
                  <span className="premium-tag">Premium</span>
                ) : (
                  <button 
                    className="start-btn"
                    onClick={() => startTest(test._id)}
                  >
                    Start Test
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
      
      <Footer />

      <style jsx>{`
        .test-portal-container {
          background: #0f0f0f;
          color: #d4d4d4;
          min-height: 100vh;
        }
        .test-portal {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          color: #ffd700;
          text-align: center;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 1.2rem;
          text-align: center;
          margin-bottom: 40px;
          color: #c0c0c0;
        }
        .test-categories {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .category-btn {
          padding: 8px 20px;
          background: #1f1f1f;
          border: 1px solid #333;
          border-radius: 30px;
          color: #d4d4d4;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .category-btn:hover, .category-btn.active {
          background: #ffd700;
          color: #1a1a2e;
          border-color: #ffd700;
        }
        .test-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }
        .test-card {
          background: #1f1f1f;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .test-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .test-header h3 {
          font-size: 1.4rem;
          color: #ffd700;
          margin-right: 15px;
        }
        .tag {
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .tag.jee {
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
        }
        .tag.neet {
          background: rgba(33, 150, 243, 0.2);
          color: #2196F3;
        }
        .tag.foundation {
          background: rgba(156, 39, 176, 0.2);
          color: #9C27B0;
        }
        .test-description {
          flex-grow: 1;
          margin-bottom: 20px;
          color: #c0c0c0;
        }
        .test-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 0.9rem;
          color: #888;
        }
        .test-footer {
          display: flex;
          justify-content: flex-end;
        }
        .premium-tag {
          background: rgba(255, 215, 0, 0.2);
          color: #ffd700;
          padding: 8px 15px;
          border-radius: 30px;
          font-weight: 600;
        }
        .start-btn {
          background: #ffd700;
          color: #1a1a2e;
          border: none;
          padding: 8px 20px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .start-btn:hover {
          background: #ffeb3b;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .test-portal {
            padding: 20px;
          }
          h1 {
            font-size: 2.2rem;
          }
          .test-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default TestPortal;