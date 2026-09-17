import express from 'express';
import Activity from '../models/Activity.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/activities (Public)
router.get('/', async (req, res) => {
  try {
    const { lang } = req.query;
    let filter = {};
    if (lang && lang !== 'all') {
      filter = { $or: [{ lang }, { lang: 'both' }] };
    }
    const activities = await Activity.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/activities/:id (Public)
router.get('/:id', async (req, res) => {
  try {
    const item = await Activity.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Activity photo not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/activities (Admin Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, tag, date, image, lang, order } = req.body;

    if (!title || !image) {
      return res.status(400).json({ success: false, message: 'Title and image are required' });
    }

    const created = await Activity.create({
      title,
      tag: tag || 'களப்பணி',
      date: date || new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      image,
      lang: lang || 'ta',
      order: Number(order) || 0
    });

    res.status(201).json({ success: true, data: created, message: 'Activity photo added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/activities/:id (Admin Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Activity photo not found' });
    }
    res.json({ success: true, data: updated, message: 'Activity photo updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/activities/:id (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Activity photo not found' });
    }
    res.json({ success: true, message: 'Activity photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
