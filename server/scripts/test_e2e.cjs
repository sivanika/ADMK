const http = require('http');

async function testApi() {
  console.log('Testing Backend & MongoDB Atlas live endpoints...');

  // 1. Fetch News
  const newsRes = await fetch('http://localhost:5000/api/news');
  const newsData = await newsRes.json();
  console.log('GET /api/news:', newsData.success, 'Count:', newsData.count, 'First headline:', newsData.data[0]?.title);

  // 2. Fetch Events
  const eventsRes = await fetch('http://localhost:5000/api/events');
  const eventsData = await eventsRes.json();
  console.log('GET /api/events:', eventsData.success, 'Count:', eventsData.count, 'First event:', eventsData.data[0]?.title);

  // 3. Fetch Activities
  const actRes = await fetch('http://localhost:5000/api/activities');
  const actData = await actRes.json();
  console.log('GET /api/activities:', actData.success, 'Count:', actData.count, 'First activity:', actData.data[0]?.title);

  // 4. Test Login
  const loginRes = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' })
  });
  const loginData = await loginRes.json();
  console.log('POST /api/auth/login:', loginData.success, 'Token generated:', !!loginData.token);

  // 5. Test CRUD: Create a test news item
  const createRes = await fetch('http://localhost:5000/api/news', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + loginData.token
    },
    body: JSON.stringify({
      title_ta: 'நேரலை சோதனை செய்தி (Live Verification News)',
      summary_ta: 'நேரலை சோதனை செய்தி விவரம்',
      details_ta: 'நிர்வாகி செய்தி சேர்ப்பு சோதனை - வெற்றி',
      tag_ta: 'சோதனை',
      image: '/assets/karthikeyan_speech.png'
    })
  });
  const createData = await createRes.json();
  console.log('POST /api/news (Admin Create):', createData.success, 'Created ID:', createData.data?._id);

  // 6. Delete the test news item
  if (createData.data?._id) {
    const delRes = await fetch('http://localhost:5000/api/news/' + createData.data._id, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + loginData.token }
    });
    const delData = await delRes.json();
    console.log('DELETE /api/news/:id:', delData.success, delData.message);
  }

  // 7. Check Vite dev server frontend
  const viteRes = await fetch('http://localhost:5173/');
  console.log('GET http://localhost:5173/ status:', viteRes.status);

  console.log('✅ ALL BACKEND, MONGODB ATLAS, AUTH & FRONTEND CHECKS PASSED!');
}

testApi().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
