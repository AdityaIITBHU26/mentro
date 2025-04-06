import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DashboardNav from '../../components/DashboardNav';
import { motion } from 'framer-motion';
import { FaBook, FaUserTie, FaChartLine, FaMedal } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/login');
          return;
        }

        const userRes = await axios.get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const statsRes = await axios.get('/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(userRes.data);
        setStats(statsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardNav user={user} />
      
      <main className="dashboard-main">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="dashboard-content"
        >
          <h1>Welcome, {user.name}</h1>
          <p className="subtitle">Here's your preparation overview</p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FaBook />
              </div>
              <div className="stat-info">
                <h3>{stats?.testsTaken || 0}</h3>
                <p>Tests Taken</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaChartLine />
              </div>
              <div className="stat-info">
                <h3>{stats?.averageScore ? `${stats.averageScore}%` : 'N/A'}</h3>
                <p>Average Score</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaUserTie />
              </div>
              <div className="stat-info">
                <h3>{stats?.mentorSessions || 0}</h3>
                <p>Mentor Sessions</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaMedal />
              </div>
              <div className="stat-info">
                <h3>{stats?.rank || 'N/A'}</h3>
                <p>Current Rank</p>
              </div>
            </div>
          </div>
          
          <div className="dashboard-sections">
            <div className="recent-tests">
              <h2>Recent Tests</h2>
              {stats?.recentTests?.length > 0 ? (
                <div className="tests-list">
                  {stats.recentTests.map((test, index) => (
                    <div key={index} className="test-item">
                      <div className="test-info">
                        <h4>{test.testName}</h4>
                        <p>{test.subject} • {test.date}</p>
                      </div>
                      <div className={`test-score ${test.score >= 70 ? 'high' : test.score >= 50 ? 'medium' : 'low'}`}>
                        {test.score}%
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-tests">No recent tests found</p>
              )}
              <button className="view-all" onClick={() => router.push('/dashboard/tests')}>
                View All Tests
              </button>
            </div>
            
            <div className="upcoming-sessions">
              <h2>Upcoming Sessions</h2>
              {stats?.upcomingSessions?.length > 0 ? (
                <div className="sessions-list">
                  {stats.upcomingSessions.map((session, index) => (
                    <div key={index} className="session-item">
                      <div className="session-info">
                        <h4>Session with {session.mentor}</h4>
                        <p>{session.date} • {session.time}</p>
                      </div>
                      <button className="join-btn" onClick={() => router.push(`/dashboard/mentorship/${session.id}`)}>
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-sessions">No upcoming sessions</p>
              )}
              <button className="schedule-btn" onClick={() => router.push('/dashboard/mentorship')}>
                Schedule New Session
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #0f0f0f;
          color: #d4d4d4;
        }
        .dashboard-main {
          flex: 1;
          padding: 40px;
          margin-left: 250px;
        }
        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #ffd700;
        }
        .subtitle {
          color: #c0c0c0;
          margin-bottom: 30px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: #1f1f1f;
          border-radius: 15px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .stat-icon {
          background: rgba(255, 215, 0, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffd700;
          font-size: 1.2rem;
        }
        .stat-info h3 {
          font-size: 1.8rem;
          color: white;
          margin-bottom: 5px;
        }
        .stat-info p {
          color: #c0c0c0;
          font-size: 0.9rem;
        }
        .dashboard-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .recent-tests, .upcoming-sessions {
          background: #1f1f1f;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #ffd700;
          border-bottom: 1px solid #333;
          padding-bottom: 10px;
        }
        .tests-list, .sessions-list {
          margin-bottom: 20px;
        }
        .test-item, .session-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #333;
        }
        .test-item:last-child, .session-item:last-child {
          border-bottom: none;
        }
        .test-info h4, .session-info h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }
        .test-info p, .session-info p {
          color: #888;
          font-size: 0.9rem;
        }
        .test-score {
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 600;
        }
        .test-score.high {
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
        }
        .test-score.medium {
          background: rgba(255, 152, 0, 0.2);
          color: #FF9800;
        }
        .test-score.low {
          background: rgba(244, 67, 54, 0.2);
          color: #F44336;
        }
        .join-btn {
          background: #ffd700;
          color: #1a1a2e;
          border: none;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .join-btn:hover {
          background: #ffeb3b;
        }
        .no-tests, .no-sessions {
          color: #888;
          text-align: center;
          padding: 20px 0;
        }
        .view-all, .schedule-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .view-all {
          background: transparent;
          color: #ffd700;
          border: 1px solid #ffd700;
        }
        .view-all:hover {
          background: rgba(255, 215, 0, 0.1);
        }
        .schedule-btn {
          background: #ffd700;
          color: #1a1a2e;
        }
        .schedule-btn:hover {
          background: #ffeb3b;
        }
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #0f0f0f;
        }
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 215, 0, 0.3);
          border-radius: 50%;
          border-top-color: #ffd700;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 1200px) {
          .dashboard-main {
            margin-left: 0;
            padding: 20px;
          }
          .dashboard-sections {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (max-width: 576px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;