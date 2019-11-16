const express = require('express');

const server = express();

server.use(express.json());

// Middleware

function validateCarsBody(req, res, next) {
  const { vin, make, model, mileage } = req.body;
  !vin || !make || !model || !mileage
    ? res.status(400).json({ message: "vin, make, model, and mileage required" })
    : next()
}

module.exports = server;