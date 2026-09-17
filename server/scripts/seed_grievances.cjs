const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const GrievanceSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, default: '' },
  category: { type: String, default: 'பொதுக் கோரிக்கை' },
  subCategory: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, default: 'மனு பெறப்பட்டது (Received)' },
  statusStep: { type: Number, default: 1 },
  adminNotes: { type: String, default: '' },
  date: { type: String, default: '' }
}, { timestamps: true });

const Grievance = mongoose.models.Grievance || mongoose.model('Grievance', GrievanceSchema);

async function seedGrievances() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');

  const samples = [
    {
      trackingId: 'TRY-2025-4182',
      name: 'மு. அன்பரசன்',
      phone: '9842145678',
      address: 'எண் 14, சின்னக்கடை வீதி, திருச்சி - 620002',
      category: 'சாலை & உள்கட்டமைப்பு',
      subCategory: 'தெருவிளக்கு & சாலை சீரமைப்பு',
      message: 'எங்கள் பகுதியில் உள்ள 3 தெருவிளக்குகள் கடந்த 10 நாட்களாக எரியவில்லை. மாலை நேரங்களில் பொதுமக்கள் மற்றும் முதியவர்கள் நடமாட சிரமமாக உள்ளது. விரைந்து நடவடிக்கை எடுக்க வேண்டுகிறேன்.',
      status: 'பரிசீலனையில் (Under Review)',
      statusStep: 2,
      date: '16 செப் 2025'
    },
    {
      trackingId: 'TRY-2025-8293',
      name: 'க. மீனாட்சி',
      phone: '9789123450',
      address: '45, மேலரண் சாலை, மலைக்கோட்டை அருகில், திருச்சி',
      category: 'குடிநீர் வசதி',
      subCategory: 'குடிநீர் விநியோகம்',
      message: 'மலைக்கோட்டை சுற்றுவட்டார பகுதிகளில் குடிநீர் விநியோக அழுத்தத்தை அதிகரிக்கவும் புதிய குடிநீர் இணைப்பு பணிகளை விரைந்து முடிக்கவும் கோருகிறேன்.',
      status: 'மனு பெறப்பட்டது (Received)',
      statusStep: 1,
      date: '17 செப் 2025'
    }
  ];

  for (const item of samples) {
    const exists = await Grievance.findOne({ trackingId: item.trackingId });
    if (!exists) {
      await Grievance.create(item);
      console.log('Created sample grievance:', item.trackingId);
    } else {
      console.log('Already exists:', item.trackingId);
    }
  }

  const count = await Grievance.countDocuments();
  console.log('Total Grievances in MongoDB Atlas:', count);
  await mongoose.disconnect();
  process.exit(0);
}

seedGrievances().catch(err => {
  console.error(err);
  process.exit(1);
});
