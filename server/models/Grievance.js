import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      default: '',
      trim: true
    },
    category: {
      type: String,
      default: 'பொதுக் கோரிக்கை',
      trim: true
    },
    subCategory: {
      type: String,
      default: '',
      trim: true
    },
    message: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      default: 'மனு பெறப்பட்டது (Received)'
    },
    statusStep: {
      type: Number,
      default: 1
    },
    adminNotes: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    }
  },
  { timestamps: true }
);

const Grievance = mongoose.models.Grievance || mongoose.model('Grievance', grievanceSchema);

export default Grievance;
