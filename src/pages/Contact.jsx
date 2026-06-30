import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address.';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate on type
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process submission
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 1200);
  };

  return (
    <div className="contact-page animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="contact-header">
          <h1 className="contact-title">Contact <span className="text-gradient">Us</span></h1>
          <p className="contact-subtitle">Have a question or feedback? We would love to hear from you.</p>
        </div>

        <div className="contact-layout">
          {/* Left: Contact Info */}
          <div className="contact-info-section">
            <div className="info-card-grid">
              <div className="info-card glass-panel">
                <div className="info-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <a href="tel:+15550199">+1 (555) 0199</a>
                  <p>Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <a href="mailto:support@shopsphere.com">support@shopsphere.com</a>
                  <p>We reply within 24 hours</p>
                </div>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon-wrapper">
                  <MapPin size={20} />
                </div>
                <div className="info-text">
                  <h3>Headquarters</h3>
                  <p className="address-text">100 Tech Avenue, Silicon Valley, CA</p>
                </div>
              </div>

              <div className="info-card glass-panel">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-text">
                  <h3>Working Hours</h3>
                  <p>Monday - Friday: 9 AM - 6 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-form-section">
            {submitSuccess ? (
              <div className="contact-success-card glass-panel animate-scale-in">
                <div className="success-icon-circle-large">
                  <CheckCircle size={40} />
                </div>
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. A support representative will review your message and get back to you shortly.</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="btn btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="contact-form-card glass-panel">
                <h2>Send a Message</h2>
                <form onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control ${errors.name ? 'input-error' : ''}`}
                      placeholder="Your name"
                      required
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'input-error' : ''}`}
                      placeholder="Your email address"
                      required
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-control ${errors.subject ? 'input-error' : ''}`}
                      placeholder="Subject of your inquiry"
                      required
                    />
                    {errors.subject && <p className="form-error">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-control textarea-control ${errors.message ? 'input-error' : ''}`}
                      placeholder="Type your message here..."
                      required
                    ></textarea>
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-submit-message"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="btn-spinner"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
