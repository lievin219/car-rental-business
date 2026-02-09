import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Calendar, MapPin, User, Mail, Phone, CreditCard, 
  CheckCircle, ChevronLeft, ChevronRight, Clock, Shield,
  AlertCircle, X
} from 'lucide-react';
import './BookingPage.css';

function BookingPage({ selectedCar, onClose, allCars }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Step 1: Car Selection
    carId: selectedCar?.id || null,
    
    // Step 2: Date & Location
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    
    // Step 3: Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    driversLicense: '',
    
    // Step 4: Extras
    insurance: 'basic',
    gps: false,
    childSeat: false,
    additionalDriver: false,
    
    // Step 5: Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);

  // Calculate rental days and total price
  useEffect(() => {
    if (bookingData.pickupDate && bookingData.dropoffDate) {
      const pickup = new Date(bookingData.pickupDate);
      const dropoff = new Date(bookingData.dropoffDate);
      const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        setRentalDays(days);
        
        const car = allCars.find(c => c.id === bookingData.carId) || selectedCar;
        let total = car ? parseFloat(car.price) * days : 0;
        
        // Add extras
        if (bookingData.insurance === 'premium') total += 25 * days;
        if (bookingData.insurance === 'full') total += 45 * days;
        if (bookingData.gps) total += 10 * days;
        if (bookingData.childSeat) total += 8 * days;
        if (bookingData.additionalDriver) total += 15 * days;
        
        setTotalPrice(total);
      }
    }
  }, [bookingData, selectedCar, allCars]);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!bookingData.carId) newErrors.carId = 'Please select a car';
        break;
        
      case 2:
        if (!bookingData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required';
        if (!bookingData.dropoffLocation) newErrors.dropoffLocation = 'Dropoff location is required';
        if (!bookingData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
        if (!bookingData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
        if (!bookingData.dropoffDate) newErrors.dropoffDate = 'Dropoff date is required';
        if (!bookingData.dropoffTime) newErrors.dropoffTime = 'Dropoff time is required';
        
        // Validate dates
        if (bookingData.pickupDate && bookingData.dropoffDate) {
          const pickup = new Date(bookingData.pickupDate);
          const dropoff = new Date(bookingData.dropoffDate);
          if (dropoff <= pickup) {
            newErrors.dropoffDate = 'Dropoff date must be after pickup date';
          }
        }
        break;
        
      case 3:
        if (!bookingData.firstName) newErrors.firstName = 'First name is required';
        if (!bookingData.lastName) newErrors.lastName = 'Last name is required';
        if (!bookingData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(bookingData.email)) newErrors.email = 'Email is invalid';
        if (!bookingData.phone) newErrors.phone = 'Phone number is required';
        if (!bookingData.driversLicense) newErrors.driversLicense = 'Driver\'s license is required';
        break;
        
      case 5:
        if (!bookingData.cardNumber) newErrors.cardNumber = 'Card number is required';
        else if (bookingData.cardNumber.replace(/\s/g, '').length < 16) {
          newErrors.cardNumber = 'Card number must be 16 digits';
        }
        if (!bookingData.cardName) newErrors.cardName = 'Cardholder name is required';
        if (!bookingData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!bookingData.cvv) newErrors.cvv = 'CVV is required';
        else if (bookingData.cvv.length < 3) newErrors.cvv = 'CVV must be 3 digits';
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(5)) {
      setCurrentStep(6);
      // Here you would normally send data to backend
      console.log('Booking submitted:', bookingData);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const car = allCars?.find(c => c.id === bookingData.carId) || selectedCar;

  const steps = [
    { number: 1, title: 'Select Car', icon: Car },
    { number: 2, title: 'Date & Location', icon: Calendar },
    { number: 3, title: 'Your Details', icon: User },
    { number: 4, title: 'Extras', icon: Shield },
    { number: 5, title: 'Payment', icon: CreditCard },
    { number: 6, title: 'Confirmation', icon: CheckCircle }
  ];

  return (
    <div className="booking-overlay">
      <motion.div 
        className="booking-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <button className="booking-close" onClick={onClose}>
          <X />
        </button>

        {/* Progress Steps */}
        <div className="booking-steps">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
            >
              <div className="step-icon">
                <step.icon size={20} />
              </div>
              <span className="step-title">{step.title}</span>
            </div>
          ))}
        </div>

        <div className="booking-content">
          <AnimatePresence mode="wait">
            {/* Step 1: Car Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="booking-step"
              >
                <h2>Select Your Vehicle</h2>
                <p className="step-subtitle">Choose from our premium fleet</p>
                
                <div className="cars-selection">
                  {allCars?.map((carOption) => (
                    <div
                      key={carOption.id}
                      className={`car-option ${bookingData.carId === carOption.id ? 'selected' : ''}`}
                      onClick={() => handleInputChange('carId', carOption.id)}
                    >
                      <div className="car-option-image">
                        <img src={carOption.image} alt={carOption.name} />
                      </div>
                      <div className="car-option-details">
                        <h3>{carOption.name}</h3>
                        <p className="car-option-category">{carOption.category}</p>
                        <div className="car-option-price">
                          <span className="price">${carOption.price}</span>
                          <span className="period">/day</span>
                        </div>
                      </div>
                      {bookingData.carId === carOption.id && (
                        <div className="selected-badge">
                          <CheckCircle />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {errors.carId && <span className="error-message">{errors.carId}</span>}
              </motion.div>
            )}

            {/* Step 2: Date & Location */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="booking-step"
              >
                <h2>Rental Details</h2>
                <p className="step-subtitle">When and where do you need the car?</p>
                
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label><MapPin size={18} /> Pickup Location</label>
                    <select
                      value={bookingData.pickupLocation}
                      onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                      className={errors.pickupLocation ? 'error' : ''}
                    >
                      <option value="">Select location</option>
                      <option value="london">London Heathrow Airport</option>
                      <option value="paris">Paris Charles de Gaulle</option>
                      <option value="rome">Rome Fiumicino Airport</option>
                      <option value="tokyo">Tokyo Narita Airport</option>
                      <option value="singapore">Singapore Changi Airport</option>
                      <option value="dubai">Dubai International Airport</option>
                    </select>
                    {errors.pickupLocation && <span className="error-message">{errors.pickupLocation}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label><MapPin size={18} /> Dropoff Location</label>
                    <select
                      value={bookingData.dropoffLocation}
                      onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                      className={errors.dropoffLocation ? 'error' : ''}
                    >
                      <option value="">Select location</option>
                      <option value="london">London Heathrow Airport</option>
                      <option value="paris">Paris Charles de Gaulle</option>
                      <option value="rome">Rome Fiumicino Airport</option>
                      <option value="tokyo">Tokyo Narita Airport</option>
                      <option value="singapore">Singapore Changi Airport</option>
                      <option value="dubai">Dubai International Airport</option>
                    </select>
                    {errors.dropoffLocation && <span className="error-message">{errors.dropoffLocation}</span>}
                  </div>

                  <div className="form-group">
                    <label><Calendar size={18} /> Pickup Date</label>
                    <input
                      type="date"
                      value={bookingData.pickupDate}
                      onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={errors.pickupDate ? 'error' : ''}
                    />
                    {errors.pickupDate && <span className="error-message">{errors.pickupDate}</span>}
                  </div>

                  <div className="form-group">
                    <label><Clock size={18} /> Pickup Time</label>
                    <input
                      type="time"
                      value={bookingData.pickupTime}
                      onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                      className={errors.pickupTime ? 'error' : ''}
                    />
                    {errors.pickupTime && <span className="error-message">{errors.pickupTime}</span>}
                  </div>

                  <div className="form-group">
                    <label><Calendar size={18} /> Dropoff Date</label>
                    <input
                      type="date"
                      value={bookingData.dropoffDate}
                      onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
                      min={bookingData.pickupDate || new Date().toISOString().split('T')[0]}
                      className={errors.dropoffDate ? 'error' : ''}
                    />
                    {errors.dropoffDate && <span className="error-message">{errors.dropoffDate}</span>}
                  </div>

                  <div className="form-group">
                    <label><Clock size={18} /> Dropoff Time</label>
                    <input
                      type="time"
                      value={bookingData.dropoffTime}
                      onChange={(e) => handleInputChange('dropoffTime', e.target.value)}
                      className={errors.dropoffTime ? 'error' : ''}
                    />
                    {errors.dropoffTime && <span className="error-message">{errors.dropoffTime}</span>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="booking-step"
              >
                <h2>Your Information</h2>
                <p className="step-subtitle">Please provide your contact details</p>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label><User size={18} /> First Name</label>
                    <input
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label><User size={18} /> Last Name</label>
                    <input
                      type="text"
                      value={bookingData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>

                  <div className="form-group">
                    <label><Mail size={18} /> Email Address</label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john.doe@example.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label><Phone size={18} /> Phone Number</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 234 567 8900"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Driver's License Number</label>
                    <input
                      type="text"
                      value={bookingData.driversLicense}
                      onChange={(e) => handleInputChange('driversLicense', e.target.value)}
                      placeholder="DL123456789"
                      className={errors.driversLicense ? 'error' : ''}
                    />
                    {errors.driversLicense && <span className="error-message">{errors.driversLicense}</span>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Extras */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="booking-step"
              >
                <h2>Additional Options</h2>
                <p className="step-subtitle">Enhance your rental experience</p>
                
                <div className="extras-section">
                  <h3>Insurance Coverage</h3>
                  <div className="insurance-options">
                    <label className={`insurance-option ${bookingData.insurance === 'basic' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="insurance"
                        value="basic"
                        checked={bookingData.insurance === 'basic'}
                        onChange={(e) => handleInputChange('insurance', e.target.value)}
                      />
                      <div className="insurance-content">
                        <h4>Basic Coverage</h4>
                        <p>Included in base price</p>
                        <span className="insurance-price">Free</span>
                      </div>
                    </label>

                    <label className={`insurance-option ${bookingData.insurance === 'premium' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="insurance"
                        value="premium"
                        checked={bookingData.insurance === 'premium'}
                        onChange={(e) => handleInputChange('insurance', e.target.value)}
                      />
                      <div className="insurance-content">
                        <h4>Premium Coverage</h4>
                        <p>Reduced deductible, theft protection</p>
                        <span className="insurance-price">+$25/day</span>
                      </div>
                    </label>

                    <label className={`insurance-option ${bookingData.insurance === 'full' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="insurance"
                        value="full"
                        checked={bookingData.insurance === 'full'}
                        onChange={(e) => handleInputChange('insurance', e.target.value)}
                      />
                      <div className="insurance-content">
                        <h4>Full Coverage</h4>
                        <p>Zero deductible, complete peace of mind</p>
                        <span className="insurance-price">+$45/day</span>
                      </div>
                    </label>
                  </div>

                  <h3>Additional Equipment</h3>
                  <div className="extras-grid">
                    <label className="extra-option">
                      <input
                        type="checkbox"
                        checked={bookingData.gps}
                        onChange={(e) => handleInputChange('gps', e.target.checked)}
                      />
                      <div className="extra-content">
                        <h4>GPS Navigation</h4>
                        <p>Never get lost with turn-by-turn navigation</p>
                        <span className="extra-price">+$10/day</span>
                      </div>
                    </label>

                    <label className="extra-option">
                      <input
                        type="checkbox"
                        checked={bookingData.childSeat}
                        onChange={(e) => handleInputChange('childSeat', e.target.checked)}
                      />
                      <div className="extra-content">
                        <h4>Child Seat</h4>
                        <p>Safety-certified child seat</p>
                        <span className="extra-price">+$8/day</span>
                      </div>
                    </label>

                    <label className="extra-option">
                      <input
                        type="checkbox"
                        checked={bookingData.additionalDriver}
                        onChange={(e) => handleInputChange('additionalDriver', e.target.checked)}
                      />
                      <div className="extra-content">
                        <h4>Additional Driver</h4>
                        <p>Add a second authorized driver</p>
                        <span className="extra-price">+$15/day</span>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="booking-step"
              >
                <h2>Payment Information</h2>
                <p className="step-subtitle">Secure payment processing</p>
                
                <div className="payment-info">
                  <AlertCircle size={18} />
                  <p>Your payment information is encrypted and secure</p>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label><CreditCard size={18} /> Card Number</label>
                    <input
                      type="text"
                      value={bookingData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={errors.cardNumber ? 'error' : ''}
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      value={bookingData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      placeholder="JOHN DOE"
                      className={errors.cardName ? 'error' : ''}
                    />
                    {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                  </div>

                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={bookingData.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        handleInputChange('expiryDate', value);
                      }}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={errors.expiryDate ? 'error' : ''}
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      value={bookingData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      maxLength="4"
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="booking-step confirmation-step"
              >
                <div className="confirmation-icon">
                  <CheckCircle size={80} />
                </div>
                <h2>Booking Confirmed!</h2>
                <p className="confirmation-message">
                  Your reservation has been successfully processed
                </p>

                <div className="booking-summary">
                  <h3>Booking Details</h3>
                  
                  <div className="summary-row">
                    <span className="summary-label">Vehicle:</span>
                    <span className="summary-value">{car?.name}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Pickup:</span>
                    <span className="summary-value">
                      {bookingData.pickupLocation} - {bookingData.pickupDate} at {bookingData.pickupTime}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Dropoff:</span>
                    <span className="summary-value">
                      {bookingData.dropoffLocation} - {bookingData.dropoffDate} at {bookingData.dropoffTime}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Duration:</span>
                    <span className="summary-value">{rentalDays} days</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Customer:</span>
                    <span className="summary-value">{bookingData.firstName} {bookingData.lastName}</span>
                  </div>

                  <div className="summary-row total">
                    <span className="summary-label">Total Amount:</span>
                    <span className="summary-value">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <p className="confirmation-note">
                  A confirmation email has been sent to <strong>{bookingData.email}</strong>
                </p>

                <button className="btn-confirmation" onClick={onClose}>
                  Return to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary Sidebar */}
        {currentStep < 6 && (
          <div className="booking-sidebar">
            <h3>Booking Summary</h3>
            
            {car && (
              <div className="summary-car">
                <img src={car.image} alt={car.name} />
                <div>
                  <h4>{car.name}</h4>
                  <p>{car.category}</p>
                </div>
              </div>
            )}

            <div className="summary-details">
              {rentalDays > 0 && (
                <>
                  <div className="summary-item">
                    <span>Rental ({rentalDays} days)</span>
                    <span>${(car ? parseFloat(car.price) * rentalDays : 0).toFixed(2)}</span>
                  </div>

                  {bookingData.insurance === 'premium' && (
                    <div className="summary-item">
                      <span>Premium Insurance</span>
                      <span>${(25 * rentalDays).toFixed(2)}</span>
                    </div>
                  )}

                  {bookingData.insurance === 'full' && (
                    <div className="summary-item">
                      <span>Full Coverage</span>
                      <span>${(45 * rentalDays).toFixed(2)}</span>
                    </div>
                  )}

                  {bookingData.gps && (
                    <div className="summary-item">
                      <span>GPS Navigation</span>
                      <span>${(10 * rentalDays).toFixed(2)}</span>
                    </div>
                  )}

                  {bookingData.childSeat && (
                    <div className="summary-item">
                      <span>Child Seat</span>
                      <span>${(8 * rentalDays).toFixed(2)}</span>
                    </div>
                  )}

                  {bookingData.additionalDriver && (
                    <div className="summary-item">
                      <span>Additional Driver</span>
                      <span>${(15 * rentalDays).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="summary-total">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="booking-actions">
            {currentStep > 1 && (
              <button className="btn-secondary" onClick={prevStep}>
                <ChevronLeft /> Back
              </button>
            )}
            
            {currentStep < 5 && (
              <button className="btn-primary" onClick={nextStep}>
                Continue <ChevronRight />
              </button>
            )}

            {currentStep === 5 && (
              <button className="btn-primary" onClick={handleSubmit}>
                Complete Booking <CheckCircle />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default BookingPage;
