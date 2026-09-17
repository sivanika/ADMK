import express from 'express';
import Event from '../models/Event.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/events (Public)
router.get('/', async (req, res) => {
  try {
    const { lang } = req.query;
    let filter = {};
    if (lang && lang !== 'all') {
      filter = { $or: [{ lang }, { lang: 'both' }] };
    }
    const events = await Event.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/events/:id (Public)
router.get('/:id', async (req, res) => {
  try {
    const item = await Event.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/events (Admin Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, day, month, location, time, description, lang, order } = req.body;

    if (!title || !day || !month || !location || !time) {
      return res.status(400).json({ success: false, message: 'Title, day, month, location, and time are required' });
    }

    const created = await Event.create({
      title,
      day,
      month,
      location,
      time,
      description: description || '',
      lang: lang || 'ta',
      order: Number(order) || 0
    });

    res.status(201).json({ success: true, data: created, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/events/:id (Admin Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: updated, message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/events/:id (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
