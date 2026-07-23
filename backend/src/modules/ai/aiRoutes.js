const express = require("express");
const router = express.Router();
const controller = require("./aiController");

router.post("/predict-eta", controller.predictEta);
router.get("/occupancy-demand", controller.forecastOccupancy);
router.post("/chatbot", controller.assistantChat);

module.exports = router;
