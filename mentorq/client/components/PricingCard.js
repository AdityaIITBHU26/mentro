import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PricingCard = ({ plan, price, features, recommended }) => {
  return (
    <motion.div
      className={`pricing-card ${recommended ? 'recommended' : ''}`}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {recommended && <div className="recommended-badge">Most Popular</div>}
      <h3>{plan}</h3>
      <div className="price">
        <span>₹</span>
        {price}
        <span>/month</span>
      </div>
      <ul className="features">
        {features.map((feature, index) => (
          <li key={index}>
            {feature.available ? <FaCheck className="available" /> : <FaTimes className="unavailable" />}
            {feature.text}
          </li>
        ))}
      </ul>
      <button className="btn">Get Started</button>
      <style jsx>{`
        .pricing-card {
          background: #1f1f1f;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .recommended {
          border: 2px solid #ffd700;
          transform: scale(1.05);
        }
        .recommended-badge {
          position: absolute;
          top: -15px;
          right: 20px;
          background: #ffd700;
          color: #1a1a2e;
          padding: 5px 15px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.9em;
        }
        h3 {
          font-size: 1.8em;
          margin-bottom: 15px;
          color: #ffd700;
          text-align: center;
        }
        .price {
          font-size: 2.5em;
          font-weight: 700;
          margin-bottom: 25px;
          text-align: center;
          color: white;
        }
        .price span:first-child {
          font-size: 0.6em;
          vertical-align: super;
        }
        .price span:last-child {
          font-size: 0.4em;
          color: #888;
          margin-left: 5px;
        }
        .features {
          list-style: none;
          margin-bottom: 30px;
          flex-grow: 1;
        }
        .features li {
          margin: 15px 0;
          display: flex;
          align-items: center;
        }
        .features svg {
          margin-right: 10px;
          font-size: 1.2em;
        }
        .available {
          color: #4CAF50;
        }
        .unavailable {
          color: #F44336;
        }
        .btn {
          display: block;
          width: 100%;
          padding: 15px;
          background: #ffd700;
          color: #1a1a2e;
          border-radius: 30px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn:hover {
          background: #ffeb3b;
        }
      `}</style>
    </motion.div>
  );
};

export default PricingCard;