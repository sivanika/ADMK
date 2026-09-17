import express from 'express';
import News from '../models/News.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/news (Public)
router.get('/', async (req, res) => {
  try {
    const { lang } = req.query;
    let filter = {};
    if (lang && lang !== 'all') {
      filter = { $or: [{ lang }, { lang: 'both' }] };
    }
    const news = await News.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: news.length, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/news/:id (Public)
router.get('/:id', async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/news (Admin Protected)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const title = req.body.title || req.body.title_ta || req.body.title_en;
    const summary = req.body.summary || req.body.summary_ta || req.body.summary_en;
    const details = req.body.details || req.body.details_ta || req.body.details_en || summary;
    const date = req.body.date || req.body.date_ta || req.body.date_en || new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const tag = req.body.tag || req.body.tag_ta || req.body.tag_en || 'செய்தி';
    const image = req.body.image || '/assets/karthikeyan_speech.png';
    const lang = req.body.lang || 'ta';
    const isFeatured = req.body.isFeatured !== undefined ? Boolean(req.body.isFeatured) : true;
    const order = Number(req.body.order) || 0;
    
    if (!title || !summary) {
      return res.status(400).json({ success: false, message: 'Title and summary are required' });
    }

    const created = await News.create({
      title,
      summary,
      details,
      date,
      tag,
      image,
      lang,
      isFeatured,
      order
    });

    res.status(201).json({ success: true, data: created, message: 'News created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/news/:id (Admin Protected)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.json({ success: true, data: updated, message: 'News updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/news/:id (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.json({ success: true, message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
