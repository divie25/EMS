const express = require("express");
const router = express.Router();
const controller = require("../controllers/greenInitiativeController");
const upload2 = require("../middleware/multer2");

router.post("/add",upload2.array("images", 5), controller.addInitiative);

// http://localhost:5000/api/green-initiatives/add

router.get("/all", controller.getAllInitiatives);
router.delete("/:id", controller.DeleteInitiatives);
router.put("/:id", controller.UpdateInitiatives);

module.exports = router;
