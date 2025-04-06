import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaBook, FaUserTie, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';

const DashboardNav = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout');
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="dashboard-nav">
      <div className="user-profile">
        <div className="avatar">
          <img src={user?.profile?.photo || '/default-avatar.png'} alt={user?.name} />
        </div>
        <h3>{user?.name}</h3>
        <p>{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
      </div>
      
      <nav>
        <ul>
          <li>
            <Link href="/dashboard" className={router.pathname === '/dashboard' ? 'active' : ''}>
              <FaHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/tests" className={router.pathname === '/dashboard/tests' ? 'active' : ''}>
              <FaBook /> Tests
            </Link>
          </li>
          <li>
            <Link href="/dashboard/mentorship" className={router.pathname === '/dashboard/mentorship' ? 'active' : ''}>
              <FaUserTie /> Mentorship
            </Link>
          </li>
          <li>
            <Link href="/dashboard/progress" className={router.pathname === '/dashboard/progress' ? 'active' : ''}>
              <FaChartLine /> Progress
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className={router.pathname === '/dashboard/settings' ? 'active' : ''}>
              <FaCog /> Settings
            </Link>
          </li>
        </ul>
      </nav>
      
      <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt /> Logout
      </button>

      <style jsx>{`
        .dashboard-nav {
          width: 250px;
          background: #1a1a2e;
          height: 100vh;
          position: fixed;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
        }
        .user-profile {
          text-align: center;
          margin-bottom: 40px;
        }
        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 15px;
          border: 3px solid #ffd700;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .user-profile h3 {
          color: #ffd700;
          margin-bottom: 5px;
        }
        .user-profile p {
          color: #c0c0c0;
          font-size: 0.9em;
        }
        nav ul {
          list-style: none;
          flex-grow: 1;
        }
        nav ul li {
          margin-bottom: 15px;
        }
        nav ul li a {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #d4d4d4;
          padding: 10px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        nav ul li a:hover, nav ul li a.active {
          background: rgba(255, 215, 0, 0.1);
          color: #ffd700;
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f44336;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: auto;
        }
        .logout-btn:hover {
          background: #ff6659;
        }
        
        @media (max-width: 992px) {
          .dashboard-nav {
            width: 100%;
            height: auto;
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 20px;
          }
          .user-profile {
            display: none;
          }
          nav ul {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }
          .logout-btn {
            margin-left: auto;
          }
        }
        
        @media (max-width: 576px) {
          .dashboard-nav {
            flex-direction: column;
          }
          nav ul {
            flex-direction: column;
            gap: 5px;
          }
          .logout-btn {
            margin-left: 0;
            margin-top: 15px;
          }
        }
      `}</style>
    </aside>
  );
};

export default DashboardNav;