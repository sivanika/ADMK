const http = require('http');

async function runTest() {
  console.log('Testing Grievance API endpoints...');

  // 1. Submit a test grievance
  const postData = JSON.stringify({
    name: 'திரு. செல்வம் (Selvam)',
    phone: '9840112233',
    address: 'தெப்பக்குளம் அருகில், திருச்சி',
    category: 'குடிநீர் வசதி',
    subCategory: 'புதிய குடிநீர் குழாய் இணைப்பு',
    message: 'எங்கள் தெருவிற்கு புதிய குடிநீர் குழாய் இணைப்பு விரைவாக வழங்க வேண்டுகிறோம்.'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/grievances',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('POST /api/grievances status:', res.statusCode);
      try {
        const json = JSON.parse(data);
        console.log('Created Tracking ID:', json.data && json.data.trackingId);

        if (json.data && json.data.trackingId) {
          // 2. Test tracking endpoint
          http.get(`http://localhost:5000/api/grievances/track/${json.data.trackingId}`, (tRes) => {
            let tData = '';
            tRes.on('data', c => tData += c);
            tRes.on('end', () => {
              console.log('GET /api/grievances/track status:', tRes.statusCode);
              const tJson = JSON.parse(tData);
              console.log('Tracked Citizen Name:', tJson.data && tJson.data.name);
              console.log('Tracked Status:', tJson.data && tJson.data.status);
              console.log('All tests passed successfully!');
              process.exit(0);
            });
          });
        }
      } catch (e) {
        console.error('Parse error:', e, data);
        process.exit(1);
      }
    });
  });

  req.on('error', (e) => {
    console.error('Request error:', e.message);
    process.exit(1);
  });

  req.write(postData);
  req.end();
}

runTest();
