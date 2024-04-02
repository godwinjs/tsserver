/* external import */
const express = require("express");

/* router level import */
const router = express.Router();

/* internal import */
const settingsController = require("../controllers/settings.controller");

// insert new product
router.post("/create", settingsController.createSettings);


// display all product
router.get("/all", settingsController.displaySettings);

// display, update and remove specific product
router
  .route("/:id")
  .delete(settingsController.removeSettings)
  .get(settingsController.displaySetting);
  // .patch(settingsController.updateSettings)

/* export product router */
module.exports = router;