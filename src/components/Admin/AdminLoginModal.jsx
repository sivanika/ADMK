import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await api.login(username, password);
      if (res.token) {
        localStorage.setItem('admk_admin_token', res.token);
        localStorage.setItem('admk_admin_user', JSON.stringify(res.admin));
        onLoginSuccess(res.token, res.admin);
        onClose();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog admin-login-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="title-pill"></div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={20} color="#9e1b25" />
              <span>நிர்வாகி உள்நுழைவு (Admin Login)</span>
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '16px' }}>
            செய்திகள், நிகழ்வுகள் மற்றும் புகைப்படங்களை சேர்க்க, திருத்த மற்றும் நிர்வகிக்க உங்கள் உள்நுழைவு விவரங்களை உள்ளிடவும்.
          </p>

          {errorMessage && (
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '6px',
              fontSize: '0.82rem',
              marginBottom: '14px',
              border: '1px solid #fecaca'
            }}>
              {errorMessage}
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              பயனர்பெயர் (Username)
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="custom-input"
                style={{ paddingLeft: '36px' }}
                placeholder="admin"
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              கடவுச்சொல் (Password)
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="custom-input"
                style={{ paddingLeft: '36px', paddingRight: '36px' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '8px', color: '#94a3b8', padding: '4px' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px' }}>
              Default: <code>admin</code> / <code>admin123</code>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="form-submit-btn"
            style={{ width: '100%', marginTop: '6px' }}
          >
            {isLoading ? 'உள்நுழைகிறது...' : 'உள்நுழைக (Sign In)'}
          </button>
        </form>
      </div>
    </div>
  );
}
