const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./models');

const app = express();

const authRoutes = require('./routes/auth');

app.use(bodyParser.json()); // application/json
app.use(express.urlencoded({ extended: false }))

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000');
  await sequelize.authenticate();
});
