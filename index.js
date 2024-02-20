const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/data', (req, res) => {
  res.json({ name: "A random name", phone: "+1552566656", email: 'example-email@poolcorp.com' });
});

app.get('/nested-data', (req, res) => {
  res.json({
    name: "A random name",
    phone: "+1552566656",
    email: 'example-email@poolcorp.com',
    more: {
      name: "nested data",
      phone: "+1552566656",
      email: 'nested-example@poolcorp.com',
    }
  });
});

app.get('/array', (req, res) => {

  const arrayData = Array.from({ length: 5 })?.map((_, idx) => {
    return { name: `A random name ${idx}`, phone: "+1552566656", email: idx + 'example-email@poolcorp.com' }
  })

  res.json(arrayData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
