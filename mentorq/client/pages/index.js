import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import Testimonial from '../components/Testimonial';

export default function Home() {
  const features = [
    {
      title: "1:1 Elite Mentorship",
      description: "Exclusive daily guidance from IITians & toppers."
    },
    {
      title: "Precision Study Plans",
      description: "Customized strategies for peak performance."
    },
    {
      title: "Advanced Analytics",
      description: "Track your progress with premium tools."
    },
    {
      title: "CBT Mastery",
      description: "Realistic test simulations for exam dominance."
    }
  ];

  const pricingPlans = [
    {
      plan: "Basic",
      price: "999",
      features: [
        { text: "5 Tests per month", available: true },
        { text: "Basic Analytics", available: true },
        { text: "Email Support", available: true },
        { text: "1:1 Mentorship", available: false },
        { text: "Advanced Analytics", available: false }
      ],
      recommended: false
    },
    {
      plan: "Premium",
      price: "1999",
      features: [
        { text: "Unlimited Tests", available: true },
        { text: "Advanced Analytics", available: true },
        { text: "Priority Support", available: true },
        { text: "2 Mentor Sessions", available: true },
        { text: "Study Planner", available: true }
      ],
      recommended: true
    },
    {
      plan: "Elite",
      price: "2999",
      features: [
        { text: "Unlimited Tests", available: true },
        { text: "Premium Analytics", available: true },
        { text: "24/7 Support", available: true },
        { text: "Weekly Mentor Sessions", available: true },
        { text: "Custom Study Plan", available: true }
      ],
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "JEE Advanced 2024 Topper",
      content: "MentorQ's personalized guidance helped me secure AIR 23 in JEE Advanced. The 1:1 mentorship was invaluable!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "NEET 2024 Aspirant",
      content: "The test series was so close to the actual NEET exam. I improved my score by 120 marks in 3 months!",
      rating: 5
    },
    {
      name: "Dr. Amit Singh",
      role: "Mentor (IIT Delhi)",
      content: "Teaching through MentorQ is rewarding. The platform makes it easy to connect with serious students.",
      rating: 4
    }
  ];

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mentor<span>Q</span>
          </motion.h1>
          <motion.p 
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Elite Mentorship for JEE & NEET Success
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Personalized Guidance from India's Top Minds
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <a href="#signup" className="btn">Unlock Your Potential</a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Excellence Redefined</h2>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="stats-container"
        >
          <div className="stat-item">
            <h3>5000+</h3>
            <p>Students Mentored</p>
          </div>
          <div className="stat-item">
            <h3>250+</h3>
            <p>IIT/NIT Mentors</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Success Rate</p>
          </div>
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Tests Taken</p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Success Stories</h2>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <Testimonial 
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Choose Your Plan</h2>
          <p>Flexible options to match your preparation needs</p>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <PricingCard 
                key={index}
                plan={plan.plan}
                price={plan.price}
                features={plan.features}
                recommended={plan.recommended}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Signup Section */}
      <section className="signup" id="signup">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready to Transform Your Preparation?</h2>
          <p>Join thousands of students achieving their dreams with MentorQ</p>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Your Phone" required />
            </div>
            <button type="submit" className="btn">Enroll Now</button>
          </form>
        </motion.div>
      </section>

      <Footer />

      <style jsx>{`
        .home-container {
          overflow-x: hidden;
        }
        .hero {
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          color: #fff;
          padding: 120px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          margin-bottom: 20px;
          color: #fff;
        }
        .hero h1 span {
          color: #ffd700;
        }
        .tagline {
          font-size: 1.8rem;
          font-style: italic;
          color: #c0c0c0;
          margin-bottom: 15px;
        }
        .hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
        }
        .btn {
          display: inline-block;
          padding: 15px 40px;
          background: #ffd700;
          color: #1a1a2e;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .btn:hover {
          background: #ffeb3b;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }
        section {
          padding: 80px 20px;
        }
        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem;
          color: #ffd700;
          margin-bottom: 20px;
          text-align: center;
        }
        .features, .testimonials, .pricing {
          background: #0f0f0f;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 0;
        }
        .stats {
          background: linear-gradient(rgba(26, 26, 46, 0.9), rgba(26, 26, 46, 0.9)), url('/pattern.png');
          background-size: cover;
        }
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        .stat-item h3 {
          font-size: 3rem;
          color: #ffd700;
          margin-bottom: 10px;
        }
        .stat-item p {
          font-size: 1.2rem;
          color: #d4d4d4;
        }
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 0;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 0;
        }
        .signup {
          background: linear-gradient(135deg, #16213e, #1a1a2e);
          text-align: center;
        }
        .signup p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          color: #d4d4d4;
        }
        .signup form {
          max-width: 800px;
          margin: 0 auto;
        }
        .form-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .signup input {
          width: 100%;
          padding: 15px;
          border: 1px solid #333;
          border-radius: 8px;
          font-size: 1.1rem;
          background: #2a2a2a;
          color: #d4d4d4;
        }
        .signup input:focus {
          border-color: #ffd700;
          outline: none;
        }
        
        @media (max-width: 768px) {
          .hero {
            padding: 80px 20px;
          }
          .hero h1 {
            font-size: 3rem;
          }
          .tagline {
            font-size: 1.4rem;
          }
          section {
            padding: 60px 20px;
          }
          h2 {
            font-size: 2.2rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .tagline {
            font-size: 1.2rem;
          }
          .stats-container {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .stat-item h3 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}