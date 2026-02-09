import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Car, Shield, Clock, MapPin, ChevronRight, 
  Star, Calendar, Users, Search, Menu, X 
} from 'lucide-react';
import './App.css';
import BookingPage from './BookingPage';
import lievin from './assets/images/lievin.jpg'
import lumiere from './assets/images/lumiere.jpg'
import lucrece from './assets/images/lucrece.jpg'
import loic from './assets/images/loic.jpg'


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const cars = [
    {
      id: 1,
      name: "Mercedes S-Class",
      category: "Luxury Sedan",
      price: "150",
      image: lievin,
      seats: 5,
      transmission: "Automatic",
      rating: 4.9
    },
    {
      id: 2,
      name: "BMW X7",
      category: "Luxury SUV",
      price: "180",
      image: lumiere,
      seats: 7,
      transmission: "Automatic",
      rating: 4.8
    },
    {
      id: 3,
      name: "Audi A8",
      category: "Executive Sedan",
      price: "140",
      image: lucrece,
      seats: 5,
      transmission: "Automatic",
      rating: 4.9
    },
    {
      id: 4,
      name: "Range Rover",
      category: "Premium SUV",
      price: "200",
      image: loic,
      seats: 5,
      transmission: "Automatic",
      rating: 5.0
    }
  ];

  const features = [
    {
      icon: <Shield />,
      title: "Fully Insured",
      description: "Comprehensive insurance coverage on all vehicles"
    },
    {
      icon: <Clock />,
      title: "24/7 Support",
      description: "Round-the-clock customer service and roadside assistance"
    },
    {
      icon: <MapPin />,
      title: "Multiple Locations",
      description: "Convenient pickup and drop-off across Europe and Asia"
    },
    {
      icon: <Car />,
      title: "Premium Fleet",
      description: "Latest models from top European and Asian manufacturers"
    }
  ];

  const handleBookNow = (car = null) => {
    setSelectedCar(car);
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedCar(null);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            <Car className="logo-icon" />
            <span className="logo-text">EuroAsia</span>
          </motion.div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home">Home</a>
            <a href="#fleet">Our Fleet</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBookNow()}
            >
              Book Now
            </motion.button>
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <motion.div 
          className="hero-bg"
          style={{ opacity }}
        />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Journey Between
              <span className="gradient-text"> Continents</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Experience premium car rentals across Europe and Asia
              <br />with unparalleled service and luxury
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button 
                className="btn-hero-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Fleet <ChevronRight />
              </motion.button>
              <motion.button 
                className="btn-hero-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Booking Widget */}
          <motion.div 
            className="booking-widget"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="booking-field">
              <MapPin className="field-icon" />
              <div>
                <label>Pick-up Location</label>
                <input type="text" placeholder="Enter city or airport" />
              </div>
            </div>
            <div className="booking-field">
              <Calendar className="field-icon" />
              <div>
                <label>Pick-up Date</label>
                <input type="date" />
              </div>
            </div>
            <div className="booking-field">
              <Calendar className="field-icon" />
              <div>
                <label>Return Date</label>
                <input type="date" />
              </div>
            </div>
            <motion.button 
              className="btn-search"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBookNow()}
            >
              <Search /> Search
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose EuroAsia</h2>
            <p className="section-subtitle">
              Excellence in every journey, across two continents
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)" }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="fleet" id="fleet">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Premium Fleet</h2>
            <p className="section-subtitle">
              Handpicked luxury vehicles for your journey
            </p>
          </motion.div>

          <div className="cars-grid">
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                className="car-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="car-image">
                  <img src={car.image} alt={car.name} />
                </div>
                <div className="car-category">{car.category}</div>
                <h3 className="car-name">{car.name}</h3>
                
                <div className="car-specs">
                  <span><Users size={16} /> {car.seats} Seats</span>
                  <span>⚙️ {car.transmission}</span>
                  <span><Star size={16} fill="currentColor" /> {car.rating}</span>
                </div>

                <div className="car-footer">
                  <div className="car-price">
                    <span className="price-amount">${car.price}</span>
                    <span className="price-period">/day</span>
                  </div>
                  <motion.button 
                    className="btn-book"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookNow(car)}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Start Your Journey?</h2>
          <p>Book your premium vehicle today and experience luxury on the road</p>
          <motion.button 
            className="btn-cta"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookNow()}
          >
            Book Your Car Now <ChevronRight />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <Car className="logo-icon" />
                <span>EuroAsia</span>
              </div>
              <p>Premium car rentals connecting Europe and Asia</p>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#fleet">Our Fleet</a>
              <a href="#services">Services</a>
              <a href="#about">About Us</a>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@euroasia-rental.com</p>
              <p>Phone: +250788470902</p>
              <p>24/7 Support Available</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 EuroAsia Car Rental. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <BookingPage 
            selectedCar={selectedCar}
            allCars={cars}
            onClose={handleCloseBooking}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
