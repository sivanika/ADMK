import express from 'express';
import Grievance from '../models/Grievance.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to generate tracking ID (e.g. TRY-2025-XXXX)
const generateTrackingId = () => {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `TRY-${year}-${randNum}`;
};

// 1. POST /api/grievances - Public Citizen Submission
router.post('/', async (req, res) => {
  try {
    const { name, phone, address, category, subCategory, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone number are required'
      });
    }

    let trackingId = generateTrackingId();
    // Ensure uniqueness
    let existing = await Grievance.findOne({ trackingId });
    while (existing) {
      trackingId = generateTrackingId();
      existing = await Grievance.findOne({ trackingId });
    }

    const dateStr = new Date().toLocaleDateString('ta-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newGrievance = await Grievance.create({
      trackingId,
      name,
      phone,
      address: address || '',
      category: category || 'பொதுக் கோரிக்கை',
      subCategory: subCategory || '',
      message: message || '',
      status: 'மனு பெறப்பட்டது (Received)',
      statusStep: 1,
      date: dateStr
    });

    res.status(201).json({
      success: true,
      message: 'Grievance registered successfully',
      data: newGrievance
    });
  } catch (error) {
    console.error('Error submitting grievance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit grievance'
    });
  }
});

// 2. GET /api/grievances/track/:trackingId - Public Status Tracking
router.get('/track/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    const cleanId = trackingId.trim().toUpperCase();

    const grievance = await Grievance.findOne({
      trackingId: { $regex: new RegExp(`^${cleanId}$`, 'i') }
    });

    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: 'மனு எண் காணப்படவில்லை (Petition Tracking ID not found)'
      });
    }

    res.json({
      success: true,
      data: grievance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Tracking failed'
    });
  }
});

// 3. GET /api/grievances - Admin List All Grievances
router.get('/', protectAdmin, async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: grievances.length,
      data: grievances
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch grievances'
    });
  }
});

// 4. PUT /api/grievances/:id - Admin Update Status / Admin Notes
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { status, statusStep, adminNotes } = req.body;
    const updateFields = {};

    if (status !== undefined) updateFields.status = status;
    if (statusStep !== undefined) updateFields.statusStep = statusStep;
    if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    }

    res.json({
      success: true,
      message: 'Grievance status updated',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update grievance'
    });
  }
});

// 5. DELETE /api/grievances/:id - Admin Delete
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deleted = await Grievance.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    }

    res.json({
      success: true,
      message: 'Grievance deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete grievance'
    });
  }
});

export default router;
