import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="nav-container"
    >
      <div className="nav-content">
        <Link href="/">
          <img src="/logo.png" alt="MentorQ Logo" className="logo" />
        </Link>
        
        <div className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link href="/test-portal" className={router.pathname === '/test-portal' ? 'active' : ''}>Test Portal</Link></li>
          <li className="dropdown">
            <span>Roles <FaUser /></span>
            <div className="dropdown-content">
              <Link href="/become-mentor"><FaChalkboardTeacher /> Become Mentor</Link>
              <Link href="/register/student"><FaUserGraduate /> Student Signup</Link>
            </div>
          </li>
          <li><Link href="/contact" className={router.pathname === '/contact' ? 'active' : ''}>Contact Us</Link></li>
          <li><Link href="/about" className={router.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
          
          {user ? (
            <>
              <li><Link href="/dashboard" className="dashboard-link">Dashboard</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link href="/login" className="login-btn">Login</Link></li>
          )}
        </ul>
      </div>

      <style jsx>{`
        .nav-container {
          background: #1a1a2e;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-content {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          position: relative;
        }
        .logo {
          width: 200px;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .logo:hover {
          transform: scale(1.05);
        }
        .mobile-menu {
          display: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-links li {
          position: relative;
        }
        .nav-links a {
          color: #c0c0c0;
          font-weight: 600;
          font-size: 1.1em;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .nav-links a:hover, .nav-links a.active {
          color: #ffd700;
        }
        .login-btn, .dashboard-link {
          background: #ffd700;
          color: #1a1a2e !important;
          padding: 8px 20px;
          border-radius: 30px;
          font-weight: 700;
        }
        .login-btn:hover, .dashboard-link:hover {
          background: #ffeb3b;
        }
        .logout-btn {
          background: #f44336;
          color: white !important;
          padding: 8px 20px;
          border-radius: 30px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }
        .logout-btn:hover {
          background: #ff6659;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          background: #1f1f1f;
          min-width: 200px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          z-index: 1;
          border-radius: 8px;
          padding: 10px 0;
        }
        .dropdown-content a {
          padding: 10px 15px;
          display: block;
          color: #d4d4d4 !important;
        }
        .dropdown:hover .dropdown-content {
          display: block;
        }
        
        @media (max-width: 992px) {
          .mobile-menu {
            display: block;
          }
          .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: #1a1a2e;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 40px;
            gap: 30px;
            transition: left 0.3s ease;
          }
          .nav-links.active {
            left: 0;
          }
          .dropdown-content {
            position: static;
            display: none;
            width: 100%;
            box-shadow: none;
          }
          .dropdown:hover .dropdown-content {
            display: none;
          }
          .dropdown.active .dropdown-content {
            display: block;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;