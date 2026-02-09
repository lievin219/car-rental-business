import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Star, ChevronRight, Filter, Grid, List } from 'lucide-react';
import './FleetPage.css';

function FleetPage({ cars, onClose, onBookCar }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCar, setSelectedCar] = useState(null);

  const categories = ['all', 'Rav4', 'V8', 'chinesse cars',];

  const filteredCars = selectedCategory === 'all' 
    ? cars 
    : cars.filter(car => car.category === selectedCategory);

  const handleCarDetails = (car) => {
    setSelectedCar(car);
  };

  const handleBookNow = (car) => {
    onBookCar(car);
  };

  return (
    <motion.div 
      className="fleet-page-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="fleet-page-container"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="fleet-page-header">
          <div>
            <h1>Our Complete Fleet</h1>
            <p>Browse our premium collection of luxury vehicles</p>
          </div>
          <motion.button 
            className="close-button"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>

        {/* Filters and View Toggle */}
        <div className="fleet-controls">
          <div className="filter-section">
            <Filter size={20} />
            <div className="category-filters">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Vehicles' : category}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="view-toggle">
            <motion.button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Grid size={20} />
            </motion.button>
            <motion.button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <List size={20} />
            </motion.button>
          </div>
        </div>

        {/* Fleet Display */}
        <div className={`fleet-content ${viewMode}`}>
          <AnimatePresence mode="wait">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                className={`fleet-car-card ${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <div className="fleet-car-image">
                  <img src={car.image} alt={car.name} />
                  <div className="fleet-car-overlay">
                    <motion.button 
                      className="view-details-btn"
                      onClick={() => handleCarDetails(car)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
                
                <div className="fleet-car-info">
                  <div className="fleet-car-header">
                    <div>
                      <div className="fleet-car-category">{car.category}</div>
                      <h3 className="fleet-car-name">{car.name}</h3>
                      {viewMode === 'list' && (
                        <p className="fleet-car-description">{car.description}</p>
                      )}
                    </div>
                    <div className="fleet-car-rating">
                      <Star size={18} fill="#d4af37" color="#d4af37" />
                      <span>{car.rating}</span>
                    </div>
                  </div>

                  <div className="fleet-car-specs">
                    <div className="spec-item">
                      <Users size={16} />
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="spec-item">
                      <span>⚙️</span>
                      <span>{car.transmission}</span>
                    </div>
                  </div>

                  {viewMode === 'list' && car.features && (
                    <div className="fleet-car-features">
                      {car.features.map((feature, idx) => (
                        <span key={idx} className="feature-badge">{feature}</span>
                      ))}
                    </div>
                  )}

                  <div className="fleet-car-footer">
                    <div className="fleet-car-price">
                      <span className="price-label">Starting from</span>
                      <div>
                        <span className="price-amount">${car.price}</span>
                        <span className="price-period">/day</span>
                      </div>
                    </div>
                    <motion.button 
                      className="fleet-book-btn"
                      onClick={() => handleBookNow(car)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now <ChevronRight size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
          <div className="no-results">
            <p>No vehicles found in this category</p>
          </div>
        )}
      </motion.div>

      {/* Car Details Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div 
            className="car-details-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCar(null)}
          >
            <motion.div 
              className="car-details-content"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedCar(null)}
              >
                <X size={24} />
              </button>

              <div className="car-details-image">
                <img src={selectedCar.image} alt={selectedCar.name} />
              </div>

              <div className="car-details-info">
                <div className="car-details-category">{selectedCar.category}</div>
                <h2>{selectedCar.name}</h2>
                <div className="car-details-rating">
                  <Star size={20} fill="#d4af37" color="#d4af37" />
                  <span>{selectedCar.rating} Rating</span>
                </div>

                <p className="car-details-description">{selectedCar.description}</p>

                <div className="car-details-specs-grid">
                  <div className="spec-detail">
                    <Users size={24} />
                    <div>
                      <span className="spec-label">Capacity</span>
                      <span className="spec-value">{selectedCar.seats} Passengers</span>
                    </div>
                  </div>
                  <div className="spec-detail">
                    <span style={{ fontSize: '24px' }}>⚙️</span>
                    <div>
                      <span className="spec-label">Transmission</span>
                      <span className="spec-value">{selectedCar.transmission}</span>
                    </div>
                  </div>
                </div>

                {selectedCar.features && (
                  <div className="car-details-features">
                    <h4>Features & Amenities</h4>
                    <div className="features-grid">
                      {selectedCar.features.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          <ChevronRight size={16} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="car-details-footer">
                  <div className="details-price">
                    <span className="details-price-label">Daily Rate</span>
                    <div>
                      <span className="details-price-amount">${selectedCar.price}</span>
                      <span className="details-price-period">/day</span>
                    </div>
                  </div>
                  <motion.button 
                    className="details-book-btn"
                    onClick={() => handleBookNow(selectedCar)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book This Vehicle <ChevronRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FleetPage;
