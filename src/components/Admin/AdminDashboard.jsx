import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Edit2, Trash2, Upload, Newspaper, Calendar, Image, 
  LogOut, CheckCircle, AlertCircle, RefreshCw, Eye,
  FileText, Phone, MapPin, Tag, Copy, Check, Search, Filter, ExternalLink
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdminDashboard({ isOpen, onClose, token, onDataUpdated }) {
  const [activeTab, setActiveTab] = useState('news'); // 'news' | 'events' | 'activities' | 'grievances'
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success'|'error', text: '' }

  // Data states
  const [newsList, setNewsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [grievanceList, setGrievanceList] = useState([]);

  // Grievance search & filter states
  const [grievanceSearch, setGrievanceSearch] = useState('');
  const [grievanceFilterStatus, setGrievanceFilterStatus] = useState('all');
  const [viewingGrievance, setViewingGrievance] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Modal editor states
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null for new, item object for edit
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form fields state
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const showStatus = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [n, e, a, g] = await Promise.all([
        api.getNews('all').catch(() => []),
        api.getEvents('all').catch(() => []),
        api.getActivities('all').catch(() => []),
        api.getGrievances(token).catch(() => [])
      ]);
      setNewsList(n);
      setEventsList(e);
      setActivitiesList(a);
      setGrievanceList(g);
      if (onDataUpdated) onDataUpdated();
    } catch (err) {
      showStatus('error', 'தரவை ஏற்றுவதில் பிழை: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // --- Handlers for Open Add / Edit ---
  const handleOpenAdd = () => {
    setEditingItem(null);
    if (activeTab === 'news') {
      setFormData({
        title: '',
        summary: '',
        details: '',
        date: new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        tag: 'செய்தி',
        image: '/assets/karthikeyan_speech.png',
        lang: 'ta',
        isFeatured: true
      });
    } else if (activeTab === 'events') {
      setFormData({
        title: '',
        day: '18',
        month: 'செப்',
        location: 'கழக அலுவலகம், தில்லை நகர், திருச்சி',
        time: '10:00 AM - 12:00 PM',
        description: '',
        lang: 'ta'
      });
    } else if (activeTab === 'activities') {
      setFormData({
        title: '',
        tag: 'களப்பணி',
        date: new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        image: '/assets/karthikeyan_speech.png',
        lang: 'ta'
      });
    }
    setEditorOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setEditorOpen(true);
  };

  // --- Handlers for Save ---
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'news') {
        if (editingItem && editingItem._id) {
          await api.updateNews(editingItem._id, formData, token);
          showStatus('success', 'செய்தி வெற்றிகரமாக புதுப்பிக்கப்பட்டது!');
        } else {
          await api.createNews(formData, token);
          showStatus('success', 'புதிய செய்தி வெற்றிகரமாக சேர்க்கப்பட்டது!');
        }
      } else if (activeTab === 'events') {
        if (editingItem && editingItem._id) {
          await api.updateEvent(editingItem._id, formData, token);
          showStatus('success', 'நிகழ்வு வெற்றிகரமாக புதுப்பிக்கப்பட்டது!');
        } else {
          await api.createEvent(formData, token);
          showStatus('success', 'புதிய நிகழ்வு வெற்றிகரமாக சேர்க்கப்பட்டது!');
        }
      } else if (activeTab === 'activities') {
        if (editingItem && editingItem._id) {
          await api.updateActivity(editingItem._id, formData, token);
          showStatus('success', 'புகைப்பட களப்பணி புதுப்பிக்கப்பட்டது!');
        } else {
          await api.createActivity(formData, token);
          showStatus('success', 'புதிய புகைப்பட களப்பணி சேர்க்கப்பட்டது!');
        }
      }
      setEditorOpen(false);
      await loadAllData();
    } catch (err) {
      showStatus('error', 'சேமிப்பதில் பிழை: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers for Delete ---
  const handleDelete = async (id, title) => {
    if (!window.confirm(`நிச்சயமாக நீக்க விரும்புகிறீர்களா?\n\n"${title}"`)) {
      return;
    }
    setLoading(true);
    try {
      if (activeTab === 'news') {
        await api.deleteNews(id, token);
      } else if (activeTab === 'events') {
        await api.deleteEvent(id, token);
      } else if (activeTab === 'activities') {
        await api.deleteActivity(id, token);
      }
      showStatus('success', 'வெற்றிகரமாக நீக்கப்பட்டது!');
      await loadAllData();
    } catch (err) {
      showStatus('error', 'நீக்குவதில் பிழை: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Image Upload Handler ---
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const uploadedUrl = await api.uploadImage(file, token);
      setFormData((prev) => ({ ...prev, image: uploadedUrl }));
      showStatus('success', 'புகைப்படம் வெற்றிகரமாக பதிவேற்றப்பட்டது!');
    } catch (err) {
      showStatus('error', 'புகைப்படம் பதிவேற்றுவதில் பிழை: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // --- Grievance Action Handlers ---
  const handleUpdateGrievanceStatus = async (id, newStatus) => {
    let step = 1;
    if (newStatus.includes('பரிசீலனை') || newStatus.includes('Review')) step = 2;
    if (newStatus.includes('பரிந்துரை') || newStatus.includes('Forwarded')) step = 3;
    if (newStatus.includes('நிறைவு') || newStatus.includes('Resolved')) step = 4;

    try {
      await api.updateGrievance(id, { status: newStatus, statusStep: step }, token);
      showStatus('success', 'மனுவின் நிலை வெற்றிகரமாக மாற்றப்பட்டது!');
      setGrievanceList(prev => prev.map(item => item._id === id ? { ...item, status: newStatus, statusStep: step } : item));
      if (viewingGrievance && viewingGrievance._id === id) {
        setViewingGrievance(prev => ({ ...prev, status: newStatus, statusStep: step }));
      }
    } catch (err) {
      showStatus('error', 'நிலையை மாற்றுவதில் பிழை: ' + err.message);
    }
  };

  const handleDeleteGrievance = async (id, trackingId) => {
    if (!window.confirm(`மனு "${trackingId}"-ஐ நீக்க உறுதி செய்கிறீர்களா?`)) return;
    try {
      await api.deleteGrievance(id, token);
      showStatus('success', `மனு ${trackingId} வெற்றிகரமாக நீக்கப்பட்டது!`);
      setGrievanceList(prev => prev.filter(item => item._id !== id));
      if (viewingGrievance && viewingGrievance._id === id) setViewingGrievance(null);
    } catch (err) {
      showStatus('error', 'நீக்குவதில் பிழை: ' + err.message);
    }
  };

  const handleCopyTrackingId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('admk_admin_token');
    localStorage.removeItem('admk_admin_user');
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 2000, padding: '12px' }}>
      <div className="modal-dialog admin-dashboard-dialog" style={{ maxWidth: '960px', width: '100%', height: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#11151a', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="title-pill" style={{ height: '22px' }}></div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>
                கழக தகவல் மேலாண்மை பலகை (Admin CMS Dashboard)
              </h3>
              <p style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                திருச்சி மாநகர் மாவட்டம் | Node.js + MongoDB Atlas Connected
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleLogout}
              className="admin-logout-btn"
              title="வெளியேறு (Logout)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: '600'
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close" style={{ color: '#fff' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div style={{
            padding: '10px 16px',
            backgroundColor: statusMessage.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: statusMessage.type === 'success' ? '#166534' : '#991b1b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.84rem',
            fontWeight: '600',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}>
            {statusMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '8px 16px 0', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('news')}
            className={`admin-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
            style={{
              padding: '10px 18px',
              fontSize: '0.86rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: activeTab === 'news' ? '3px solid #9e1b25' : '3px solid transparent',
              color: activeTab === 'news' ? '#9e1b25' : '#64748b'
            }}
          >
            <Newspaper size={16} />
            <span>செய்திகள் (News) ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            style={{
              padding: '10px 18px',
              fontSize: '0.86rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: activeTab === 'events' ? '3px solid #9e1b25' : '3px solid transparent',
              color: activeTab === 'events' ? '#9e1b25' : '#64748b'
            }}
          >
            <Calendar size={16} />
            <span>நிகழ்வுகள் (Events) ({eventsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`admin-tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            style={{
              padding: '10px 18px',
              fontSize: '0.86rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: activeTab === 'activities' ? '3px solid #9e1b25' : '3px solid transparent',
              color: activeTab === 'activities' ? '#9e1b25' : '#64748b'
            }}
          >
            <Image size={16} />
            <span>களப்பணிகள் (Activities) ({activitiesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('grievances')}
            className={`admin-tab-btn ${activeTab === 'grievances' ? 'active' : ''}`}
            style={{
              padding: '10px 18px',
              fontSize: '0.86rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderBottom: activeTab === 'grievances' ? '3px solid #9e1b25' : '3px solid transparent',
              color: activeTab === 'grievances' ? '#9e1b25' : '#64748b'
            }}
          >
            <FileText size={16} />
            <span>மனுக்கள் (Grievances) ({grievanceList.length})</span>
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={loadAllData}
              disabled={loading}
              title="புதுப்பி (Refresh)"
              style={{ padding: '6px', color: '#64748b', borderRadius: '4px' }}
            >
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
            </button>
            {activeTab !== 'grievances' && (
              <button
                onClick={handleOpenAdd}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  backgroundColor: '#9e1b25',
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: '700'
                }}
              >
                <Plus size={15} />
                <span>
                  {activeTab === 'news' && 'புதிய செய்தி'}
                  {activeTab === 'events' && 'புதிய நிகழ்வு'}
                  {activeTab === 'activities' && 'புதிய புகைப்படம்'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {/* TAB 1: NEWS */}
          {activeTab === 'news' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {newsList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  செய்திகள் எதுவும் இல்லை. "புதிய செய்தி" கிளிக் செய்து சேர்க்கவும்.
                </div>
              ) : (
                newsList.map((item) => (
                  <div
                    key={item._id || item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '70px 1fr auto',
                      gap: '14px',
                      alignItems: 'center',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '10px 14px'
                    }}
                  >
                    <div style={{ width: '70px', height: '52px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                      <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.72rem', background: '#fee2e2', color: '#9e1b25', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                          {item.tag}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#64748b' }}>{item.date}</span>
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' }}>
                        {item.title}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        style={{ padding: '6px 10px', background: '#f1f5f9', color: '#334155', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                      >
                        <Edit2 size={13} />
                        <span>திருத்து</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id || item.id, item.title)}
                        style={{ padding: '6px 10px', background: '#fef2f2', color: '#dc2626', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                      >
                        <Trash2 size={13} />
                        <span>நீக்கு</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: EVENTS */}
          {activeTab === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {eventsList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  நிகழ்வுகள் எதுவும் இல்லை. "புதிய நிகழ்வு" கிளிக் செய்து சேர்க்கவும்.
                </div>
              ) : (
                eventsList.map((item) => (
                  <div
                    key={item._id || item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '50px 1fr auto',
                      gap: '14px',
                      alignItems: 'center',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '10px 14px'
                    }}
                  >
                    <div style={{ background: '#9e1b25', color: '#fff', textAlign: 'center', borderRadius: '6px', padding: '6px 2px' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', lineHeight: '1' }}>{item.day}</div>
                      <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: '600' }}>{item.month}</div>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>
                        {item.title}
                      </h4>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        📍 {item.location} | ⏰ {item.time}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        style={{ padding: '6px 10px', background: '#f1f5f9', color: '#334155', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                      >
                        <Edit2 size={13} />
                        <span>திருத்து</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id || item.id, item.title)}
                        style={{ padding: '6px 10px', background: '#fef2f2', color: '#dc2626', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
                      >
                        <Trash2 size={13} />
                        <span>நீக்கு</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: ACTIVITIES */}
          {activeTab === 'activities' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
              {activitiesList.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  புகைப்படங்கள் எதுவும் இல்லை. "புதிய புகைப்படம்" கிளிக் செய்து சேர்க்கவும்.
                </div>
              ) : (
                activitiesList.map((item) => (
                  <div
                    key={item._id || item.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                      <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>
                        {item.tag}
                      </span>
                    </div>
                    <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px', lineHeight: '1.3' }}>
                        {item.title}
                      </h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{item.date}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            style={{ padding: '4px 8px', background: '#f1f5f9', color: '#334155', borderRadius: '4px', fontSize: '0.72rem' }}
                          >
                            திருத்து
                          </button>
                          <button
                            onClick={() => handleDelete(item._id || item.id, item.title)}
                            style={{ padding: '4px 8px', background: '#fef2f2', color: '#dc2626', borderRadius: '4px', fontSize: '0.72rem' }}
                          >
                            நீக்கு
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: GRIEVANCES & CITIZEN PETITIONS */}
          {activeTab === 'grievances' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Search and Status Filters */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', background: '#f8fafc', padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <Search size={15} color="#64748b" />
                  <input
                    type="text"
                    placeholder="மனு எண், பெயர், போன் எண் அல்லது விவரம் தேடுக..."
                    value={grievanceSearch}
                    onChange={(e) => setGrievanceSearch(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem' }}
                  />
                  {grievanceSearch && (
                    <button onClick={() => setGrievanceSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Filter size={14} color="#64748b" />
                  <select
                    value={grievanceFilterStatus}
                    onChange={(e) => setGrievanceFilterStatus(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: '600', color: '#334155', outline: 'none', background: '#fff' }}
                  >
                    <option value="all">அனைத்து நிலைகளும் (All)</option>
                    <option value="received">மனு பெறப்பட்டது (Received)</option>
                    <option value="review">பரிசீலனையில் (Under Review)</option>
                    <option value="forwarded">துறைக்கு பரிந்துரை (Forwarded)</option>
                    <option value="resolved">நிறைவுற்றது (Resolved)</option>
                  </select>
                </div>
              </div>

              {/* Grievances List */}
              {grievanceList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <FileText size={42} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                  <p style={{ fontWeight: '600', fontSize: '0.94rem', color: '#475569' }}>மனுக்கள் எதுவும் பதிவு செய்யப்படவில்லை.</p>
                  <p style={{ fontSize: '0.78rem' }}>பொதுமக்கள் இணையதளத்தில் பதிவு செய்யும் மனுக்கள் இங்கு உடனுக்குடன் தோன்றும்.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {grievanceList
                    .filter(item => {
                      if (!grievanceSearch) return true;
                      const q = grievanceSearch.toLowerCase();
                      return (
                        (item.trackingId && item.trackingId.toLowerCase().includes(q)) ||
                        (item.name && item.name.toLowerCase().includes(q)) ||
                        (item.phone && item.phone.toLowerCase().includes(q)) ||
                        (item.category && item.category.toLowerCase().includes(q)) ||
                        (item.message && item.message.toLowerCase().includes(q))
                      );
                    })
                    .filter(item => {
                      if (grievanceFilterStatus === 'all') return true;
                      if (grievanceFilterStatus === 'received') return item.status && item.status.includes('பெறப்பட்டது');
                      if (grievanceFilterStatus === 'review') return item.status && item.status.includes('பரிசீலனை');
                      if (grievanceFilterStatus === 'forwarded') return item.status && item.status.includes('பரிந்துரை');
                      if (grievanceFilterStatus === 'resolved') return item.status && item.status.includes('நிறைவு');
                      return true;
                    })
                    .map(item => (
                      <div
                        key={item._id || item.trackingId}
                        style={{
                          background: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '16px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}
                      >
                        {/* Card Header: Tracking ID, Category Badge, Date */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => handleCopyTrackingId(item.trackingId)}
                              title="Copy Tracking ID"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: '#fef2f2',
                                border: '1px solid #fecaca',
                                color: '#9e1b25',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                fontWeight: '800',
                                cursor: 'pointer'
                              }}
                            >
                              <span>{item.trackingId}</span>
                              {copiedId === item.trackingId ? <Check size={12} color="#15803d" /> : <Copy size={12} />}
                            </button>
                            <span style={{ fontSize: '0.74rem', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                              {item.category} {item.subCategory ? `• ${item.subCategory}` : ''}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            📅 {item.date || new Date(item.createdAt).toLocaleDateString('ta-IN')}
                          </span>
                        </div>

                        {/* Citizen Details Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.84rem' }}>
                          <div>
                            <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block' }}>மனுதாரர் பெயர்:</span>
                            <strong style={{ color: '#0f172a' }}>{item.name}</strong>
                          </div>
                          <div>
                            <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block' }}>தொடர்பு எண்:</span>
                            <a href={`tel:${item.phone}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Phone size={13} />
                              <span>{item.phone}</span>
                            </a>
                          </div>
                          {item.address && (
                            <div style={{ gridColumn: 'span 2' }}>
                              <span style={{ color: '#64748b', fontSize: '0.74rem', display: 'block' }}>முகவரி:</span>
                              <span style={{ color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={13} color="#64748b" />
                                {item.address}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Message / Petition Content */}
                        <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '10px 12px' }}>
                          <span style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>
                            கோரிக்கை விவரம் (Grievance Details):
                          </span>
                          <p style={{ margin: 0, fontSize: '0.84rem', color: '#1e293b', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                            {item.message || 'விவரங்கள் வழங்கப்படவில்லை.'}
                          </p>
                        </div>

                        {/* Status & Actions Footer */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '700' }}>நிலை (Status):</span>
                            <select
                              value={item.status}
                              onChange={(e) => handleUpdateGrievanceStatus(item._id, e.target.value)}
                              style={{
                                padding: '5px 10px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '0.78rem',
                                fontWeight: '700',
                                background: item.status && item.status.includes('நிறைவு') ? '#dcfce7' : item.status && item.status.includes('பரிசீலனை') ? '#fef9c3' : '#f1f5f9',
                                color: item.status && item.status.includes('நிறைவு') ? '#15803d' : item.status && item.status.includes('பரிசீலனை') ? '#a16207' : '#1e293b',
                                cursor: 'pointer',
                                outline: 'none'
                              }}
                            >
                              <option value="மனு பெறப்பட்டது (Received)">மனு பெறப்பட்டது (Received)</option>
                              <option value="பரிசீலனையில் (Under Review)">பரிசீலனையில் (Under Review)</option>
                              <option value="துறைக்கு பரிந்துரைக்கப்பட்டுள்ளது (Forwarded)">துறைக்கு பரிந்துரை (Forwarded)</option>
                              <option value="நிறைவுற்றது (Resolved)">நிறைவுற்றது (Resolved)</option>
                            </select>
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => setViewingGrievance(item)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '5px 10px',
                                background: '#f1f5f9',
                                color: '#334155',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                fontSize: '0.76rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              <Eye size={13} />
                              <span>முழு விவரம்</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteGrievance(item._id, item.trackingId)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '5px 10px',
                                background: '#fef2f2',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '4px',
                                fontSize: '0.76rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={13} />
                              <span>நீக்கு</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- ADD / EDIT FORM MODAL --- */}
        {editorOpen && (
          <div className="modal-overlay" style={{ zIndex: 3000, background: 'rgba(0,0,0,0.7)' }}>
            <div className="modal-dialog" style={{ maxWidth: '640px', width: '100%', maxHeight: '88vh', overflowY: 'auto' }}>
              <div className="modal-header">
                <h3 className="modal-title">
                  {editingItem ? 'பதிவை திருத்துக (Edit Item)' : 'புதிய பதிவு சேர்க்க (Add Item)'}
                </h3>
                <button className="modal-close-btn" onClick={() => setEditorOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} className="modal-body">
                {/* 1. NEWS FORM */}
                {activeTab === 'news' && (
                  <>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                        செய்தி தலைப்பு (Title) *
                      </label>
                      <input
                        type="text"
                        className="custom-input"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="எ.கா: “தலைமை ஒன்று… இலக்கு ஒன்று… கழக வெற்றியே நம் இலக்கு!”"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          பிரிவு / குறியீடு (Tag)
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.tag || ''}
                          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                          placeholder="எழுச்சியுரை / அண்ணா பிறந்தநாள் / நிவாரணம்"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          தேதி (Date)
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.date || ''}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          placeholder="16 செப் 2025"
                        />
                      </div>
                    </div>

                    {/* Image Upload / URL */}
                    <div style={{ marginBottom: '14px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>
                        செய்தி புகைப்படம் (Image)
                      </label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {formData.image && (
                          <div style={{ width: '80px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                            <img src={formData.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            style={{ display: 'none' }}
                            id="news-image-file"
                          />
                          <label
                            htmlFor="news-image-file"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 14px',
                              background: '#9e1b25',
                              color: '#fff',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            <Upload size={14} />
                            <span>{uploadingImage ? 'பதிவேற்றுகிறது...' : 'புகைப்படம் பதிவேற்றுக (Upload Image)'}</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input"
                            style={{ marginTop: '8px', fontSize: '0.76rem' }}
                            value={formData.image || ''}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="அல்லது படத்தின் URL / assets பாதை (/assets/...)"
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                        சுருக்க உரை (Summary) *
                      </label>
                      <textarea
                        className="custom-textarea"
                        rows={2}
                        value={formData.summary || ''}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        required
                        placeholder="செய்தியின் சுருக்கமான விபரம்..."
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                        முழு செய்தி விவரம் (Full Details)
                      </label>
                      <textarea
                        className="custom-textarea"
                        rows={5}
                        value={formData.details || ''}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="நிகழ்வின் முழுமையான அறிக்கை..."
                      />
                    </div>
                  </>
                )}

                {/* 2. EVENTS FORM */}
                {activeTab === 'events' && (
                  <>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                        நிகழ்வு பெயர் (Title) *
                      </label>
                      <input
                        type="text"
                        className="custom-input"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="எ.கா: மக்கள் சந்திப்பு முகாம்"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          தேதி எண் (Day) *
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.day || ''}
                          onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                          required
                          placeholder="எ.கா: 18 அல்லது 25"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          மாதம் (Month) *
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.month || ''}
                          onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                          required
                          placeholder="எ.கா: செப் அல்லது Sep"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          நேரம் (Time) *
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.time || ''}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          required
                          placeholder="10:00 AM - 12:00 PM"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          இடம் (Location) *
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                          placeholder="கழக அலுவலகம், திருச்சி"
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                        நிகழ்வு விபரம் (Description)
                      </label>
                      <textarea
                        className="custom-textarea"
                        rows={3}
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="நிகழ்வின் கூடுதல் விபரங்கள்..."
                      />
                    </div>
                  </>
                )}

                {/* 3. ACTIVITIES FORM */}
                {activeTab === 'activities' && (
                  <>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                        பட தலைப்பு (Title) *
                      </label>
                      <input
                        type="text"
                        className="custom-input"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="எ.கா: பேரறிஞர் அண்ணா பிறந்தநாள் பேரணி"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          குறியீடு (Tag)
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.tag || ''}
                          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                          placeholder="அண்ணா விழா / களப்பணி / கூட்டம்"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                          தேதி (Date)
                        </label>
                        <input
                          type="text"
                          className="custom-input"
                          value={formData.date || ''}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          placeholder="16 செப் 2025"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div style={{ marginBottom: '14px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>
                        களப்பணி புகைப்படம் (Photo) *
                      </label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {formData.image && (
                          <div style={{ width: '80px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                            <img src={formData.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            style={{ display: 'none' }}
                            id="activity-image-file"
                          />
                          <label
                            htmlFor="activity-image-file"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 14px',
                              background: '#9e1b25',
                              color: '#fff',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            <Upload size={14} />
                            <span>{uploadingImage ? 'பதிவேற்றுகிறது...' : 'புகைப்படம் தேர்வு செய்க (Upload)'}</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input"
                            style={{ marginTop: '8px', fontSize: '0.76rem' }}
                            value={formData.image || ''}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            required
                            placeholder="/assets/karthikeyan_speech.png"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setEditorOpen(false)}
                    style={{ flex: 1, padding: '10px', background: '#f1f5f9', color: '#475569', borderRadius: '6px', fontWeight: '600' }}
                  >
                    ரத்து செய் (Cancel)
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploadingImage}
                    className="form-submit-btn"
                    style={{ flex: 2, margin: 0 }}
                  >
                    {loading ? 'சேமிக்கிறது...' : 'சேமிக்கவும் (Save to Database)'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* --- VIEW GRIEVANCE DETAIL MODAL --- */}
        {viewingGrievance && (
          <div className="modal-overlay" style={{ zIndex: 3100, background: 'rgba(0,0,0,0.7)' }} onClick={() => setViewingGrievance(null)}>
            <div className="modal-dialog" style={{ maxWidth: '600px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header" style={{ background: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="title-pill"></div>
                  <h3 className="modal-title">பொதுமக்கள் மனு விவரம் (Grievance Detail)</h3>
                </div>
                <button className="modal-close-btn" onClick={() => setViewingGrievance(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fef2f2', padding: '10px 14px', borderRadius: '6px', border: '1px solid #fecaca' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#9e1b25', display: 'block', fontWeight: '700' }}>மனு கண்காணிப்பு எண் (Tracking ID):</span>
                    <strong style={{ fontSize: '1.05rem', color: '#9e1b25' }}>{viewingGrievance.trackingId}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyTrackingId(viewingGrievance.trackingId)}
                    style={{ padding: '4px 10px', background: '#fff', border: '1px solid #fca5a5', borderRadius: '4px', fontSize: '0.76rem', cursor: 'pointer', fontWeight: '700', color: '#9e1b25', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedId === viewingGrievance.trackingId ? <Check size={13} color="#15803d" /> : <Copy size={13} />}
                    <span>{copiedId === viewingGrievance.trackingId ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.86rem' }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block' }}>மனுதாரர்:</span>
                    <strong style={{ color: '#0f172a' }}>{viewingGrievance.name}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block' }}>அலைபேசி எண்:</span>
                    <a href={`tel:${viewingGrievance.phone}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                      📞 {viewingGrievance.phone}
                    </a>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block' }}>துறை / பிரிவு:</span>
                    <span style={{ fontWeight: '600', color: '#334155' }}>{viewingGrievance.category}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block' }}>பதிவு தேதி:</span>
                    <span style={{ color: '#64748b' }}>{viewingGrievance.date}</span>
                  </div>
                  {viewingGrievance.address && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block' }}>முகவரி:</span>
                      <span style={{ color: '#334155' }}>📍 {viewingGrievance.address}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                    மனு கோரிக்கை விவரம்:
                  </span>
                  <div style={{ padding: '12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', color: '#1e293b', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                    {viewingGrievance.message}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569' }}>நிலை மாற்றுக:</span>
                    <select
                      value={viewingGrievance.status}
                      onChange={(e) => handleUpdateGrievanceStatus(viewingGrievance._id, e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: '700' }}
                    >
                      <option value="மனு பெறப்பட்டது (Received)">மனு பெறப்பட்டது (Received)</option>
                      <option value="பரிசீலனையில் (Under Review)">பரிசீலனையில் (Under Review)</option>
                      <option value="துறைக்கு பரிந்துரைக்கப்பட்டுள்ளது (Forwarded)">துறைக்கு பரிந்துரை (Forwarded)</option>
                      <option value="நிறைவுற்றது (Resolved)">நிறைவுற்றது (Resolved)</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewingGrievance(null)}
                    style={{ padding: '6px 16px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    மூடுக (Close)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
