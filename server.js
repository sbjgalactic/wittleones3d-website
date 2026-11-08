require('dotenv').config();
const express = require('express');
const handler = require('./api/create-checkout-session');

const app = express();
app.use(express.json());
app.post('/api/create-checkout-session', handler);

app.listen(3000, '127.0.0.1', () => console.log('API running on port 3000'));