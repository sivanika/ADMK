// Frontend API Service communicating with Node/MongoDB backend

const API_BASE = '/api';

export const api = {
  // --- Auth ---
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async getMe(token) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  // --- Upload ---
  async uploadImage(file, token) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return data.url;
  },

  // --- News ---
  async getNews(lang = 'ta') {
    const res = await fetch(`${API_BASE}/news?lang=${lang}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch news');
    return json.data || [];
  },

  async createNews(newsData, token) {
    const res = await fetch(`${API_BASE}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newsData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create news');
    return json.data;
  },

  async updateNews(id, newsData, token) {
    const res = await fetch(`${API_BASE}/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newsData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update news');
    return json.data;
  },

  async deleteNews(id, token) {
    const res = await fetch(`${API_BASE}/news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete news');
    return json;
  },

  // --- Events ---
  async getEvents(lang = 'ta') {
    const res = await fetch(`${API_BASE}/events?lang=${lang}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch events');
    return json.data || [];
  },

  async createEvent(eventData, token) {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create event');
    return json.data;
  },

  async updateEvent(id, eventData, token) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update event');
    return json.data;
  },

  async deleteEvent(id, token) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete event');
    return json;
  },

  // --- Activities ---
  async getActivities(lang = 'ta') {
    const res = await fetch(`${API_BASE}/activities?lang=${lang}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch activities');
    return json.data || [];
  },

  async createActivity(activityData, token) {
    const res = await fetch(`${API_BASE}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(activityData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create activity');
    return json.data;
  },

  async updateActivity(id, activityData, token) {
    const res = await fetch(`${API_BASE}/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(activityData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update activity');
    return json.data;
  },

  async deleteActivity(id, token) {
    const res = await fetch(`${API_BASE}/activities/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete activity');
    return json;
  },

  // --- Grievances / Citizen Petitions ---
  async createGrievance(grievanceData) {
    const res = await fetch(`${API_BASE}/grievances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grievanceData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to submit grievance');
    return json.data;
  },

  async getGrievances(token) {
    const res = await fetch(`${API_BASE}/grievances`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch grievances');
    return json.data || [];
  },

  async trackGrievance(trackingId) {
    const res = await fetch(`${API_BASE}/grievances/track/${encodeURIComponent(trackingId)}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Tracking ID not found');
    return json.data;
  },

  async updateGrievance(id, updateData, token) {
    const res = await fetch(`${API_BASE}/grievances/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update grievance');
    return json.data;
  },

  async deleteGrievance(id, token) {
    const res = await fetch(`${API_BASE}/grievances/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete grievance');
    return json;
  }
};
