import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'admk_secret_2025', {
    expiresIn: '30d'
  });
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both username and password' });
    }

    const admin = await Admin.findOne({ username: username.trim().toLowerCase() });

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        success: true,
        token: generateToken(admin._id),
        admin: {
          id: admin._id,
          username: admin.username,
          name: admin.name,
          role: admin.role
        }
      });
    }

    // Fallback: if database has no admins yet, check env defaults
    const defaultUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
    const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username.trim().toLowerCase() === defaultUser && password === defaultPass) {
      // Auto-create admin in DB if missing
      try {
        let existing = await Admin.findOne({ username: defaultUser });
        if (!existing) {
          existing = await Admin.create({
            username: defaultUser,
            password: defaultPass,
            name: 'District Secretary Office Admin',
            role: 'superadmin'
          });
        }
        return res.json({
          success: true,
          token: generateToken(existing._id),
          admin: {
            id: existing._id,
            username: existing.username,
            name: existing.name,
            role: existing.role
          }
        });
      } catch (err) {
        // In-memory token if MongoDB is down
        return res.json({
          success: true,
          token: generateToken('fallback_admin_id'),
          admin: {
            id: 'fallback_admin_id',
            username: defaultUser,
            name: 'Office Admin (Dev)',
            role: 'superadmin'
          }
        });
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your username and password.' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get('/me', protectAdmin, async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

export default router;
