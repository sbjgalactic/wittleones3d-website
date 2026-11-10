require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const createCheckoutSession = require('./api/create-checkout-session');
const checkCode = require('./api/check-code');

// ...
app.post('/create-checkout-session', createCheckoutSession);
app.post('/api/create-checkout-session', createCheckoutSession);
app.post('/api/check-code', checkCode);
app.post('/check-code', checkCode);

// static files and the 404 handler stay below these

app.use(express.static(__dirname, { extensions: ['html'] }));

// anything that didn't match above gets the 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Site and API running on port ${PORT}`));