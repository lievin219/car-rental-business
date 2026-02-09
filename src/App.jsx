import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Car, Shield, Clock, MapPin, ChevronRight, 
  Star, Calendar, Users, Search, Menu, X, Phone, Mail 
} from 'lucide-react';
import './App.css';
import BookingPage from './BookingPage';
import FleetPage from './FleetPage';
import lievin from './assets/images/lievin.jpg'
import lumiere from './assets/images/lumiere.jpg'
import lucrece from './assets/images/lucrece.jpg'
import loic from './assets/images/loic.jpg'
import rav4 from './assets/images/rav4.jpg'
import v8 from './assets/images/v8.jpg'


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showFleet, setShowFleet] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const cars = [
    {
      id: 1,
      name: "Mercedes S-Class",
      category: "Rav4",
      price: "150",
      image: lievin,
      seats: 5,
      transmission: "Automatic",
      rating: 4.9,
      features: ["GPS Navigation", "Leather Seats", "Climate Control", "Premium Sound"],
      description: "Experience ultimate luxury with the Mercedes S-Class, perfect for business meetings and special occasions in Kigali."
    },
    {
      id: 2,
      name: "v8",
      category: "V8",
      price: "180",
      image: v8,
      seats: 7,
      transmission: "Automatic",
      rating: 4.8,
      features: ["Panoramic Roof", "7 Seats", "All-Wheel Drive", "Premium Audio"],
      description: "Ideal for family trips and group travel across Rwanda's stunning landscapes."
    },
    {
      id: 3,
      name: "rav4",
      category: "chinesse cars",
      price: "140",
      image: rav4,
      seats: 5,
      transmission: "Automatic",
      rating: 4.9,
      features: ["Massage Seats", "Advanced Safety", "LED Lighting", "Wireless Charging"],
      description: "The perfect blend of comfort and performance for executive travel in Rwanda."
    },
    {
      id: 4,
      name: "Range Rover",
      category: "Premium SUV",
      price: "200",
      image: loic,
      seats: 5,
      transmission: "Automatic",
      rating: 5.0,
      features: ["Terrain Response", "Air Suspension", "Premium Interior", "360° Camera"],
      description: "Conquer any terrain in style, from Kigali city to Volcanoes National Park."
    }
  ];

  const features = [
    {
      icon: <Shield />,
      title: "Fully Insured",
      description: "Comprehensive insurance coverage on all vehicles for your peace of mind"
    },
    {
      icon: <Clock />,
      title: "24/7 Support",
      description: "Round-the-clock customer service throughout Rwanda"
    },
    {
      icon: <MapPin />,
      title: "Kigali & Beyond",
      description: "Convenient pickup in Kigali with delivery across Rwanda"
    },
    {
      icon: <Car />,
      title: "Premium Fleet",
      description: "Latest luxury models meticulously maintained to the highest standards"
    }
  ];

  const handleBookNow = (car = null) => {
    setSelectedCar(car);
    setShowBooking(true);
    setShowFleet(false);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedCar(null);
  };

  const handleViewAllFleet = () => {
    setShowFleet(true);
    setShowBooking(false);
  };

  const handleCloseFleet = () => {
    setShowFleet(false);
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
            <span className="logo-text">EuroAsia Rwanda</span>
          </motion.div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#fleet" onClick={() => setIsMenuOpen(false)}>Our Fleet</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
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
              Luxury Meets
              <span className="gradient-text"> The Land of a Thousand Hills</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Rwanda's premier luxury car rental service
              <br />Experience world-class vehicles in the heart of Africa
            </motion.p>
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Available</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">4.9★</div>
                <div className="stat-label">Rating</div>
              </div>
            </motion.div>
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
                onClick={handleViewAllFleet}
              >
                View All Vehicles <ChevronRight />
              </motion.button>
              <motion.button 
                className="btn-hero-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              >
                Our Services
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
                <input type="text" placeholder="Kigali International Airport" />
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
              <Search /> Search Available Cars
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="services">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose EuroAsia Rwanda</h2>
            <p className="section-subtitle">
              Experience international luxury standards right here in Kigali
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
            <h2 className="section-title">Featured Premium Fleet</h2>
            <p className="section-subtitle">
              Handpicked luxury vehicles for your Rwandan journey
            </p>
          </motion.div>

          <div className="cars-grid">
            {cars.slice(0, 4).map((car, index) => (
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
                  <div className="car-badge">Popular</div>
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

          <motion.div 
            className="fleet-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button 
              className="btn-view-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllFleet}
            >
              View Complete Fleet <ChevronRight />
            </motion.button>
          </motion.div>
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
          <h2>Ready to Experience Luxury in Rwanda?</h2>
          <p>Book your premium vehicle today and explore the beauty of the Land of a Thousand Hills in style</p>
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
      <footer className="footer" id="about">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <Car className="logo-icon" />
                <span>EuroAsia Rwanda</span>
              </div>
              <p>Premium luxury car rentals in the heart of Kigali, Rwanda. Bringing world-class service to East Africa.</p>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#fleet">Our Fleet</a>
              <a href="#services">Services</a>
              <a href="#about">About Us</a>
            </div>
            
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p><Mail size={16} /> info@euroasia-rwanda.com</p>
              <p><Phone size={16} /> +250 788 470 902</p>
              <p><MapPin size={16} /> Kigali, Rwanda</p>
              <p className="support-badge">🕐 24/7 Support Available</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 EuroAsia Car Rental Rwanda. All rights reserved.</p>
            <p className="footer-tagline">Luxury Redefined in Rwanda</p>
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

      {/* Fleet Page Modal */}
      <AnimatePresence>
        {showFleet && (
          <FleetPage 
            cars={cars}
            onClose={handleCloseFleet}
            onBookCar={handleBookNow}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
