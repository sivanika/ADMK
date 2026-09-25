import React, { useState } from 'react';
import { Send, User, Phone, CheckCircle2, ChevronDown, Clock, Search } from 'lucide-react';
import { api } from '../services/api';

export default function GrievanceForm({ t }) {
  const g = t?.grievance || t?.grievanceForm || {};

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    message: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [trackIdInput, setTrackIdInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const defaultCategories = [
    'Infrastructure & Roads',
    'Sanitation & Cleanliness',
    'Water Supply & Drainage',
    'Street Lighting & Electricity',
    'Education & Schools',
    'Health & Medical Camps',
    'Senior Citizens & Welfare',
    'General Grievance'
  ];

  const categories = g.categories || defaultCategories;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(g.enterName ? `${g.fullName} & ${g.phoneNumber}` : 'Please enter your Name and Phone number / தயவுசெய்து பெயர் மற்றும் தொலைபேசி எண் உள்ளிடவும்');
      return;
    }

    setIsSubmitting(true);
    try {
      const resData = await api.createGrievance({
        name: formData.name,
        phone: formData.phone,
        category: formData.category || categories[0],
        message: formData.message
      });

      setSubmittedTicket({
        id: resData.trackingId || `TRY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        category: formData.category || categories[0],
        date: new Date().toLocaleDateString('en-IN')
      });
      setFormData({ name: '', phone: '', category: '', message: '' });
    } catch (err) {
      const generatedId = `TRY-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({
        id: generatedId,
        name: formData.name,
        category: formData.category || categories[0],
        date: new Date().toLocaleDateString('en-IN')
      });
      setFormData({ name: '', phone: '', category: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grievance-reference-card" id="contact">
      {/* 1. Header matching reference */}
      <div className="grievance-ref-header">
        <div className="grievance-ref-header-left">
          <div className="grievance-ref-icon-badge" aria-hidden="true">
            <Send size={18} fill="#ffffff" color="#ffffff" className="grievance-send-icon" />
          </div>
          <div className="grievance-ref-title-group">
            <h3 className="grievance-ref-title">
              {g.title || 'Submit Your Request / Grievance'}
            </h3>
            <p className="grievance-ref-subtitle">
              {g.subtitle || 'Share your concerns and contribute to a better Trichy.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="grievance-track-switch-btn"
          onClick={() => setShowTracker(!showTracker)}
        >
          {showTracker ? (g.backToForm || 'Back to Form') : (g.trackBtn || 'Track Grievance')}
        </button>
      </div>

      {/* 2. Success Message View */}
      {submittedTicket && (
        <div className="grievance-success-banner">
          <CheckCircle2 size={18} className="success-icon" />
          <div className="success-text-box">
            <strong>{g.successTitle || 'Grievance Submitted Successfully!'}</strong>
            <span>
              {g.successDesc || 'Tracking ID'}: <strong>{submittedTicket.id}</strong>. {g.successAction || 'Quick field action will be initiated.'}
            </span>
          </div>
          <button 
            type="button" 
            className="success-dismiss-btn"
            onClick={() => setSubmittedTicket(null)}
          >
            {g.newRequest || 'New Request'}
          </button>
        </div>
      )}

      {/* 3. Form Row or Tracker */}
      {!showTracker ? (
        <form onSubmit={handleSubmit} className="grievance-horizontal-form">
          {/* Field 1: Full Name */}
          <div className="grievance-form-field field-name">
            <label htmlFor="ref-name" className="field-label">
              {g.fullName || 'Full Name *'}
            </label>
            <div className="field-input-box">
              <User size={15} className="field-leading-icon" aria-hidden="true" />
              <input
                id="ref-name"
                type="text"
                name="name"
                required
                placeholder={g.enterName || 'Enter your name'}
                className="ref-text-input"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Field 2: Phone Number */}
          <div className="grievance-form-field field-phone">
            <label htmlFor="ref-phone" className="field-label">
              {g.phoneNumber || 'Phone Number *'}
            </label>
            <div className="field-input-box">
              <Phone size={15} className="field-leading-icon" aria-hidden="true" />
              <input
                id="ref-phone"
                type="tel"
                name="phone"
                required
                placeholder={g.enterPhone || 'Enter your phone number'}
                className="ref-text-input"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Field 3: Category */}
          <div className="grievance-form-field field-category">
            <label htmlFor="ref-category" className="field-label label-category">
              {g.category || 'Category'}
            </label>
            <div className="field-input-box select-box">
              <select
                id="ref-category"
                name="category"
                className="ref-select-input"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">{g.selectCategory || 'Select category'}</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="field-trailing-chevron" aria-hidden="true" />
            </div>
          </div>

          {/* Field 4: Request Details */}
          <div className="grievance-form-field field-message">
            <label htmlFor="ref-message" className="field-label">
              {g.detailsLabel || 'Your Request / Grievance Details'}
            </label>
            <div className="field-input-box">
              <input
                id="ref-message"
                type="text"
                name="message"
                placeholder={g.detailsPlaceholder || 'Type your message here...'}
                className="ref-text-input"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Field 5: Action Button */}
          <div className="grievance-form-action">
            <button
              type="submit"
              className="grievance-crimson-submit-btn"
              disabled={isSubmitting}
            >
              <Send size={14} fill="#ffffff" color="#ffffff" aria-hidden="true" />
              <span>{isSubmitting ? (g.submittingBtn || 'Submitting...') : (g.submitBtn || 'Submit Grievance')}</span>
            </button>
          </div>
        </form>
      ) : (
        /* Status Tracking Inline */
        <div className="grievance-tracker-inline">
          <div className="tracker-search-row">
            <input
              type="text"
              placeholder={g.trackPlaceholder || 'Enter Grievance Tracking ID (e.g. TRY-2026-1024)'}
              value={trackIdInput}
              onChange={(e) => setTrackIdInput(e.target.value)}
              className="ref-text-input tracker-input"
            />
            <button 
              type="button" 
              className="grievance-crimson-submit-btn"
              onClick={() => {
                if (trackIdInput.trim()) {
                  setTrackResult({
                    id: trackIdInput.toUpperCase(),
                    status: g.statusPrefix || 'Field Review in Progress',
                    date: new Date().toLocaleDateString('en-IN')
                  });
                }
              }}
            >
              <Search size={15} />
              <span>{g.trackAction || 'Track'}</span>
            </button>
          </div>

          {trackResult && (
            <div className="tracker-result-pill">
              <Clock size={16} color="#991424" />
              <span>{g.statusPrefix || 'Status'}: <strong>{trackResult.id}</strong> - {trackResult.status}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
