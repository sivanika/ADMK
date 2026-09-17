const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: { type: String, default: 'களப்பணி' },
  date: { type: String, default: '' },
  image: { type: String, required: true },
  lang: { type: String, default: 'ta' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

async function addActivities() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');

  const newItems = [
    {
      title: 'கழக மூத்த முன்னோடிக்கு பொன்னாடை போர்த்தி நினைவுப் பரிசு வழங்கி கௌரவிப்பு - C. கார்த்திகேயன் B.E.',
      tag: 'கௌரவிப்பு',
      date: '17 செப் 2025',
      image: '/assets/veteran_felicitation.jpg',
      lang: 'ta',
      order: 0
    },
    {
      title: '“களமிறங்குவோம் வெற்றி பெறுவோம்” - திருச்சி மாநகர் மாவட்ட கழக பிரம்மாண்ட கள ஆய்வு ஆலோசனைக் கூட்டம்',
      tag: 'கழக மாநாடு',
      date: '17 செப் 2025',
      image: '/assets/party_stage_conference.jpg',
      lang: 'ta',
      order: 1
    }
  ];

  for (const item of newItems) {
    const exists = await Activity.findOne({ image: item.image });
    if (!exists) {
      await Activity.create(item);
      console.log('Inserted:', item.title);
    } else {
      console.log('Already exists:', item.title);
    }
  }

  const count = await Activity.countDocuments();
  console.log('Total activities in MongoDB Atlas:', count);
  await mongoose.disconnect();
  process.exit(0);
}

addActivities().catch(err => {
  console.error(err);
  process.exit(1);
});
