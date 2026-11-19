require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const createCheckoutSession = require('./api/create-checkout-session');
const checkCode = require('./api/check-code');
const orderSummary = require('./api/order-summary');

// ...
app.post('/create-checkout-session', createCheckoutSession);
app.post('/api/create-checkout-session', createCheckoutSession);
app.post('/api/check-code', checkCode);
app.post('/check-code', checkCode);
app.get('/api/order-summary', orderSummary);
app.get('/order-summary', orderSummary); // nginx strips /api before passing requests here

// static files and the 404 handler stay below these

app.use(express.static(__dirname, { extensions: ['html'] }));

// anything that didn't match above gets the 404 page
app.use((req, res) => {
    // on the live server the API runs in its own folder without 404.html, so fall back to plain text
    res.status(404).sendFile(path.join(__dirname, '404.html'), err => {
        if (err && !res.headersSent) res.type('text').send('Not found');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Site and API running on port ${PORT}`));