const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Welcome to <bakery-ecommerce-webapp name');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});