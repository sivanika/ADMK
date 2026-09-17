import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    summary: {
      type: String,
      required: true,
      trim: true
    },
    details: {
      type: String,
      default: '',
      trim: true
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    tag: {
      type: String,
      default: 'செய்தி'
    },
    image: {
      type: String,
      default: '/assets/karthikeyan_speech.png'
    },
    lang: {
      type: String,
      enum: ['ta', 'en', 'both'],
      default: 'ta'
    },
    isFeatured: {
      type: Boolean,
      default: false
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

export default mongoose.model('News', newsSchema);
