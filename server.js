const express = require("express");
const carsTable = require("./data/dbConfig");

const server = express();

server.use(express.json());

// GET ALL CARS
server.get("/api/cars", async (req, res) => {
  try {
    const cars = await carsTable("cars");
    if (!cars.length) return res.status(200).json({ message: "No entries" });
    return res.status(200).json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Unable to retrieve cars data.", error });
  }
});

// ADD A CAR RECORD
server.post("/api/cars", async (req, res) => {
  try {
    const id = await carsTable("cars").insert(req.body);
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ errorMessage: "Error adding car", error});
  }
});

// Middleware

function validateCarsBody(req, res, next) {
  const { vin, make, model, mileage } = req.body;
  !vin || !make || !model || !mileage
    ? res.status(400).json({ message: "vin, make, model, and mileage required" })
    : next()
}

module.exports = server;