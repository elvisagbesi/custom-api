const { faker } = require('@faker-js/faker');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dealerData = require('./data.json')

function randomNumberBetweenOneAndTen() {
  return Math.floor(Math.random() * 10) + 1;
}


const createProducts = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
})

const generateProducts = () => {
  const randomNum = randomNumberBetweenOneAndTen()
  return Array.from({ length: randomNum })?.map((_, idx) => {
    return createProducts()
  })
}

const createDealer = () => ({
  name: faker.company.name(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  website: faker.internet.domainName(),
  products: generateProducts(),
  googleDirectionsLink: "https://www.google.com/maps/place/Dallas+County,+TX,+USA/@32.7676334,-96.9425853,11z/data=!3m1!4b1!4m6!3m5!1s0x864ebf4a52bd4381:0x47b199369cddd987!8m2!3d32.8024682!4d-96.8350999!16zL20vMG1zMW4?entry=ttu",
})



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




app.get('/dealers', (req, res) => {
  res.json(dealerData);
})

app.get('/dealers/:index', (req, res) => {
  const index = req.params.index;
  const dealer = dealerData?.[index - 1] || undefined
  res.json(dealer);
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

