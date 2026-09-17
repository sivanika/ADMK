import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    tag: {
      type: String,
      default: 'களப்பணி',
      trim: true
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    image: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      enum: ['ta', 'en', 'both'],
      default: 'ta'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Activity', activitySchema);
