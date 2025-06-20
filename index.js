const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://jumanji-frontend.onrender.com',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
