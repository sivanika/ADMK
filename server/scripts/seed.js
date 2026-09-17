import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Admin from '../models/Admin.js';
import News from '../models/News.js';
import Event from '../models/Event.js';
import Activity from '../models/Activity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const initialNews = [
  {
    title: "“தலைமை ஒன்று… இலக்கு ஒன்று… கழக வெற்றியே நம் இலக்கு!” - திருச்சி மாநகர் மாவட்ட கழக செயலாளர் C. கார்த்திகேயன் B.E. எழுச்சியுரை!",
    summary: "திருச்சி மாநகர் மாவட்ட கழக செயலாளர், முன்னாள் ஆவின் சேர்மன் எங்கள் அண்ணன் C. கார்த்திகேயன் அவர்களின் தலைமையில், கழகத் தொண்டர்களின் எழுச்சியோடும், மக்கள் ஆதரவோடும் நிகழ்வு சிறப்பாக நடைபெற்று வெற்றிகரமாக நிறைவடைந்தது!",
    details: "திருச்சி மாநகர் மாவட்ட கழக செயலாளர், முன்னாள் ஆவின் சேர்மன் எங்கள் அண்ணன் C. கார்த்திகேயன் B.E. அவர்களின் தலைமையில், கழகத் தொண்டர்களின் எழுச்சியோடும், மக்கள் பேராதரவோடும் நடைபெற்ற எழுச்சிமிகு நிகழ்வு மிகச் சிறப்பாக நடைபெற்று வெற்றிகரமாக நிறைவடைந்தது!\n\nநிகழ்வில் கழக தொண்டர்கள் மற்றும் நிர்வாகிகளிடையே கம்பீர எழுச்சியுரையாற்றிய மாவட்ட கழக செயலாளர் C. கார்த்திகேயன் B.E. அவர்கள்:\n\n“தலைமை ஒன்று… இலக்கு ஒன்று… கழக வெற்றியே நம் இலக்கு!\n\nகழகத் தொண்டர்களின் தன்னலமற்ற உழைப்பும், மக்களின் பேராதரவுமே நமது மாபெரும் பலம். புரட்சித்தலைவர் எம்.ஜி.ஆர், புரட்சித்தலைவி அம்மா ஆகியோரின் வழியில், கழகப் பொதுச்செயலாளர் அவர்களின் ஆணைக்கிணங்க மக்கள் நலப் பணிகளை தடையின்றி முன்னெடுத்துச் சென்று கழகத்தை வெற்றிப்பாதைக்கு அழைத்துச் செல்வோம்!” என்று முழங்கினார்.",
    date: "16 செப் 2025",
    tag: "எழுச்சியுரை",
    image: "/assets/karthikeyan_speech.png",
    lang: "ta",
    isFeatured: true,
    order: 1
  },
  {
    title: "பேரறிஞர் அண்ணாவின் 117-வது பிறந்தநாள்! திருவுருவச் சிலைக்கு மாலை அணிவித்து மரியாதை செலுத்திய C. கார்த்திகேயன் B.E.",
    summary: "பேரறிஞர் அண்ணாவின் 117-வது பிறந்தநாளை முன்னிட்டு, திருச்சி மாநகர் மாவட்டம் சார்பில் பிரம்மாண்ட பேரணி மற்றும் அண்ணா சிலைக்கு மாலை அணிவித்து, பொதுமக்களுக்கு நலத்திட்ட உதவிகள் வழங்கப்பட்டன.",
    details: "பேரறிஞர் அண்ணாவின் 117-வது பிறந்தநாளை முன்னிட்டு, திருச்சி மாநகர் மாவட்ட கழக செயலாளர் C. கார்த்திகேயன் B.E. அவர்கள் தலைமையில் கழக நிர்வாகிகள், தொண்டர்கள் மற்றும் பொதுமக்கள் ஆயிரக்கணக்கில் திரண்டு எழுச்சிமிகு பேரணி நடத்தினர். திருச்சி சிந்தாமணி பகுதியில் உள்ள பேரறிஞர் அண்ணாவின் முழு திருவுருவச் சிலைக்கு மாலை அணிவித்து மலரஞ்சலி செலுத்தி வீரவணக்கம் செய்யப்பட்டது. அதனைத் தொடர்ந்து கழகக் கொடியேற்றி வைத்து, பொதுமக்களுக்கு அன்னதானம், இனிப்புகள் மற்றும் நலத்திட்ட உதவிகள் வழங்கப்பட்டன.",
    date: "15 செப் 2025",
    tag: "அண்ணா பிறந்தநாள்",
    image: "/assets/anna_statue_homage.png",
    lang: "ta",
    isFeatured: true,
    order: 2
  },
  {
    title: "மழை வெள்ளத்தால் பாதிக்கப்பட்ட மக்களுக்கு அத்தியாவசிய பொருட்கள் வழங்கல்",
    summary: "திருச்சி மாநகர் பகுதிகளில் மழை வெள்ளத்தால் பாதிக்கப்பட்ட குடும்பங்களுக்கு நிவாரண உதவிகள் மற்றும் உணவுப் பொருட்கள் நேரடியாக வழங்கப்பட்டன.",
    details: "மாவட்ட கழக செயலாளர் C. கார்த்திகேயன் B.E. அவர்கள் நேரில் சென்று மக்களுக்கு அரிசி, மளிகைப் பொருட்கள், வேட்டி சேலைகள் மற்றும் அத்தியாவசிய மருந்துப் பொருட்களை வழங்கினார். நீர் வடிந்த பின் துப்புரவு பணிகளை போர்க்கால அடிப்படையில் மேற்கொள்ள அதிகாரிகளுடன் ஆலோசனை நடத்தப்பட்டது.",
    date: "12 செப் 2025",
    tag: "நிவாரணம்",
    image: "/assets/aid_distribution.jpg",
    lang: "ta",
    isFeatured: false,
    order: 3
  },
  {
    title: "திருச்சி மாநகரில் புதிய சாலை பணிகளுக்கான அடிக்கல் நாட்டப்பட்டது",
    summary: "ரூபாய் 4.8 கோடி மதிப்பீட்டில் முக்கிய இணைப்பு சாலைகளை நவீன தார்ச் சாலையாக அமைப்பதற்கான பூமி பூஜை நடைபெற்றது.",
    details: "மாநகர மக்களின் நீண்ட நாள் கோரிக்கையான தார்ச் சாலை அமைக்கும் பணிகளுக்கு பூமி பூஜை போடப்பட்டு, மிக விரைவாக பணிகளை முடிக்க உத்தரவிடப்பட்டது. இதன்மூலம் பள்ளி, கல்லூரி வாகனங்கள் மற்றும் பொதுமக்கள் போக்குவரத்து சிரமமின்றி செல்ல முடியும்.",
    date: "10 செப் 2025",
    tag: "உள்கட்டமைப்பு",
    image: "/assets/new_road.jpg",
    lang: "ta",
    isFeatured: false,
    order: 4
  }
];

const initialEvents = [
  {
    title: "மக்கள் சந்திப்பு முகாம்",
    day: "18",
    month: "செப்",
    location: "கழக அலுவலகம், தில்லை நகர், திருச்சி",
    time: "10:00 AM - 12:00 PM",
    description: "பொதுமக்கள் தங்கள் குறைகளை நேரில் தெரிவித்து மனுக்கள் அளிக்கலாம். உடனடி தீர்வுக்கான ஏற்பாடுகள் செய்யப்பட்டுள்ளன.",
    lang: "ta",
    order: 1
  },
  {
    title: "இலவச மாபெரும் மருத்துவ முகாம்",
    day: "21",
    month: "செப்",
    location: "அரசு மேல்நிலைப் பள்ளி வளாகம், திருச்சி",
    time: "09:00 AM - 01:00 PM",
    description: "இலவச கண் பரிசோதனை, பொது மருத்துவ ஆலோசனை மற்றும் இலவச மருந்து மாத்திரைகள் வழங்கும் சிறப்பு முகாம்.",
    lang: "ta",
    order: 2
  },
  {
    title: "தொழில் முனைவோர் & மகளிர் சுயஉதவிக் குழுக்கள் சந்திப்பு",
    day: "25",
    month: "செப்",
    location: "மாவட்ட கழக திருமண மண்டபம், திருச்சி",
    time: "04:00 PM - 06:00 PM",
    description: "இளைஞர்களுக்கான வேலைவாய்ப்பு வழிகாட்டுதல் மற்றும் மகளிர் சுயஉதவிக் குழுக்களுக்கான வங்கி கடன் மானிய ஆலோசனைக் கூட்டம்.",
    lang: "ta",
    order: 3
  }
];

const initialActivities = [
  {
    title: "“தலைமை ஒன்று… இலக்கு ஒன்று… கழக வெற்றியே நம் இலக்கு!” - C. கார்த்திகேயன் B.E. எழுச்சியுரை",
    tag: "எழுச்சியுரை",
    date: "16 செப் 2025",
    image: "/assets/karthikeyan_speech.png",
    lang: "ta",
    order: 1
  },
  {
    title: "பேரறிஞர் அண்ணாவின் 117-வது பிறந்தநாள் விழா பேரணி மற்றும் மலரஞ்சலி",
    tag: "அண்ணா விழா",
    date: "15 செப் 2025",
    image: "/assets/anna_rally.png",
    lang: "ta",
    order: 2
  },
  {
    title: "சிந்தாமணி அண்ணா திருவுருவச் சிலைக்கு மாலை அணிவித்து வீரவணக்கம்",
    tag: "வீரவணக்கம்",
    date: "15 செப் 2025",
    image: "/assets/anna_statue_homage.png",
    lang: "ta",
    order: 3
  },
  {
    title: "பொதுமக்களுக்கு நலத்திட்ட உதவிகள் மற்றும் நிவாரணம் வழங்கல்",
    tag: "மக்கள் நலன்",
    date: "12 செப் 2025",
    image: "/assets/aid_distribution.jpg",
    lang: "ta",
    order: 4
  }
];

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/admk_portal';
    console.log('Connecting to MongoDB for seeding:', mongoUri);
    
    // Connect with 5s timeout
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected successfully!');

    // 1. Admin
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
    
    let admin = await Admin.findOne({ username: adminUser });
    if (!admin) {
      await Admin.create({
        username: adminUser,
        password: adminPass,
        name: 'District Secretary Office Admin',
        role: 'superadmin'
      });
      console.log(`Default Admin created: ${adminUser} / ${adminPass}`);
    } else {
      console.log(`Admin account '${adminUser}' already exists.`);
    }

    // 2. News
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      await News.insertMany(initialNews);
      console.log(`Seeded ${initialNews.length} news articles.`);
    } else {
      console.log(`News collection already contains ${newsCount} documents.`);
    }

    // 3. Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(initialEvents);
      console.log(`Seeded ${initialEvents.length} events.`);
    } else {
      console.log(`Events collection already contains ${eventCount} documents.`);
    }

    // 4. Activities
    const activityCount = await Activity.countDocuments();
    if (activityCount === 0) {
      await Activity.insertMany(initialActivities);
      console.log(`Seeded ${initialActivities.length} activities.`);
    } else {
      console.log(`Activities collection already contains ${activityCount} documents.`);
    }

    console.log('Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding warning/error:', error.message);
    process.exit(1);
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase();
}
