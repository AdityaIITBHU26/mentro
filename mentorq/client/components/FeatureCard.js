import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="feature-item"
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="feature-icon">
      <Icon size={40} color="#ffd700" />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <style jsx>{`
      .feature-item {
        background: #1f1f1f;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        text-align: center;
        height: 100%;
      }
      .feature-icon {
        margin-bottom: 20px;
      }
      h3 {
        font-size: 1.4em;
        margin-bottom: 15px;
        color: #ffd700;
      }
      p {
        color: #c0c0c0;
      }
    `}</style>
  </motion.div>
);

export default FeatureCard;