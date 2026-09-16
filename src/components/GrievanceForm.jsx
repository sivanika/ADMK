import React, { useState } from 'react';
import { Send, CheckCircle2, Search, Clock, AlertTriangle } from 'lucide-react';

export default function GrievanceForm({ t }) {
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'track'
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: '',
    subCategory: '',
    message: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracking State
  const [trackIdInput, setTrackIdInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(t.lang === 'en' ? 'Please enter your Name and Phone number' : 'தயவுசெய்து உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `TRY-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({
        id: generatedId,
        name: formData.name,
        category: formData.category || t.grievanceForm.categories[0],
        date: new Date().toLocaleDateString(),
        status: 'மனு பெறப்பட்டது (Received)'
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        address: '',
        category: '',
        subCategory: '',
        message: ''
      });
    }, 600);
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackIdInput.trim()) return;

    if (submittedTicket && submittedTicket.id.toLowerCase() === trackIdInput.trim().toLowerCase()) {
      setTrackResult(submittedTicket);
    } else {
      // Demo simulated response
      setTrackResult({
        id: trackIdInput.trim().toUpperCase(),
        name: 'மனுதாரர் (Constituent)',
        category: 'சாலை & உள்கட்டமைப்பு',
        date: '10 செப் 2025',
        status: 'கள ஆய்வு முடிவுற்று துறைக்கு பரிந்துரைக்கப்பட்டுள்ளது (Under Field Review)',
        step: 2
      });
    }
  };

  return (
    <div className="section-box" id="contact">
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="title-pill"></div>
          <h2 className="section-title">{t.grievanceForm.title}</h2>
        </div>
      </div>

      <p className="grievance-subtitle">{t.grievanceForm.subtitle}</p>

      {/* Tabs */}
      <div className="grievance-tabs">
        <button
          className={`form-tab-btn ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          {t.grievanceForm.tabNew}
        </button>
        <button
          className={`form-tab-btn ${activeTab === 'track' ? 'active' : ''}`}
          onClick={() => setActiveTab('track')}
        >
          {t.grievanceForm.tabTrack}
        </button>
      </div>

      {activeTab === 'new' ? (
        submittedTicket ? (
          <div className="ticket-status-result" style={{ background: '#f0fdf4', borderColor: '#86efac' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: '700', marginBottom: '6px' }}>
              <CheckCircle2 size={18} />
              <span>{t.grievanceForm.successMsg}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#374151', marginBottom: '8px' }}>
              {t.grievanceForm.trackingIdText} <strong style={{ color: '#9e1b25' }}>{submittedTicket.id}</strong>
            </p>
            <p style={{ fontSize: '0.76rem', color: '#6b7280' }}>
              இந்த குறிப்பு எண்ணை குறித்துக் கொள்ளவும். உங்கள் மனு மீது விரைவான நடவடிக்கை எடுக்கப்படும்.
            </p>
            <button
              style={{ marginTop: '12px', fontSize: '0.78rem', color: '#9e1b25', fontWeight: '700', textDecoration: 'underline' }}
              onClick={() => setSubmittedTicket(null)}
            >
              + மற்றொரு புதிய கோரிக்கை பதிவு செய்ய
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="petition-form-grid">
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder={t.grievanceForm.nameLabel}
                className="custom-input"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                required
                placeholder={t.grievanceForm.phoneLabel}
                className="custom-input"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-col-full">
              <input
                type="text"
                name="address"
                placeholder={t.grievanceForm.addressLabel}
                className="custom-input"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <select
                name="category"
                className="custom-select"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">{t.grievanceForm.categoryLabel}</option>
                {t.grievanceForm.categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                name="subCategory"
                className="custom-select"
                value={formData.subCategory}
                onChange={handleInputChange}
              >
                <option value="">{t.grievanceForm.subCategoryLabel}</option>
                <option value="அவசர தேவை (Urgent)">அவசர தேவை (Urgent)</option>
                <option value="பொது நலன் (Public Cause)">பொது நலன் (Public Cause)</option>
                <option value="தனிநபர் உதவி (Individual)">தனிநபர் உதவி (Individual)</option>
              </select>
            </div>

            <div className="form-col-full">
              <textarea
                name="message"
                rows="2"
                placeholder={t.grievanceForm.messageLabel}
                className="custom-textarea"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-col-full">
              <button 
                type="submit" 
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                <Send size={15} />
                <span>{isSubmitting ? 'பதிவாகிறது...' : t.grievanceForm.submitBtn}</span>
              </button>
            </div>
          </form>
        )
      ) : (
        /* Status Tracking Tab */
        <div className="tracking-wrapper">
          <form onSubmit={handleTrackSubmit} className="track-input-group">
            <input
              type="text"
              placeholder={t.grievanceForm.trackingPlaceholder}
              className="custom-input"
              value={trackIdInput}
              onChange={(e) => setTrackIdInput(e.target.value)}
            />
            <button type="submit" className="track-btn">
              {t.grievanceForm.trackBtn}
            </button>
          </form>

          {trackResult && (
            <div className="ticket-status-result">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ color: '#0f172a' }}>{trackResult.id}</strong>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>{trackResult.date}</span>
              </div>
              <p style={{ margin: '4px 0', color: '#334155' }}>
                <strong>பிரிவு:</strong> {trackResult.category}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: '#9e1b25', fontWeight: '600' }}>
                <Clock size={15} />
                <span>{trackResult.status}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
