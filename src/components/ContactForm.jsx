import React, { useState } from 'react';
import { Mail, User, Phone, MessageSquare, Send, MapPin } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // TODO: Implement Firebase/Email service
      console.log('Contact form submission:', formData);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info-section">
          <h1 className="contact-main-title">Get In Touch</h1>
          <p className="contact-description">
            Have questions about our properties? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="detail-icon">
                <MapPin />
              </div>
              <div className="detail-text">
                <h3>Visit Us</h3>
                <p>HMT SWARNAPURI COLONY, MIYAPUR, HYDERABAD<br />HYDERABAD - 500049</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="detail-icon">
                <Phone />
              </div>
              <div className="detail-text">
                <h3>Call Us</h3>
                <p>9182624047<br />Mon-Fri 9am-6pm</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="detail-icon">
                <Mail />
              </div>
              <div className="detail-text">
                <h3>Email Us</h3>
                <p>Mheshwarreddy@s-properties.com<br />supports-properties.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2 className="form-title">Send us a Message</h2>

            {success && (
              <div className="success-message">
                <span className="success-icon">✓</span>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {errors.submit && (
              <div className="error-message-contact">
                {errors.submit}
              </div>
            )}

            <div className="form-grid">
              <div className="form-group-contact">
                <label htmlFor="name" className="contact-label">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`contact-input ${errors.name ? 'error' : ''}`}
                  placeholder="Sanjana Duvvuri"
                />
                {errors.name && <span className="error-text-contact">{errors.name}</span>}
              </div>

              <div className="form-group-contact">
                <label htmlFor="email" className="contact-label">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`contact-input ${errors.email ? 'error' : ''}`}
                  placeholder="sanjana@gmail.com"
                />
                {errors.email && <span className="error-text-contact">{errors.email}</span>}
              </div>

              <div className="form-group-contact">
                <label htmlFor="phone" className="contact-label">
                  <Phone size={18} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`contact-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+91 9999999990"
                />
                {errors.phone && <span className="error-text-contact">{errors.phone}</span>}
              </div>

              <div className="form-group-contact">
                <label htmlFor="subject" className="contact-label">
                  <MessageSquare size={18} />
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`contact-input ${errors.subject ? 'error' : ''}`}
                  placeholder="Property inquiry"
                />
                {errors.subject && <span className="error-text-contact">{errors.subject}</span>}
              </div>
            </div>

            <div className="form-group-contact full-width">
              <label htmlFor="message" className="contact-label">
                <MessageSquare size={18} />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`contact-textarea ${errors.message ? 'error' : ''}`}
                rows="6"
                placeholder="Tell us about your property needs..."
              />
              {errors.message && <span className="error-text-contact">{errors.message}</span>}
            </div>

            <button type="submit" className="contact-submit-btn" disabled={loading}>
              <Send size={20} />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;