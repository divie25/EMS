const express = require("express");
const router = express.Router();
const controller = require("../controllers/pollutionComplianceController");
const upload2 = require("../middleware/multer2");

router.post("/add",upload2.array("documents", 5), controller.addCompliance);
router.get("/all", controller.getAllCompliances);
router.put("/update/:id", controller.updateCompliance);
http://localhost:5000/api/green-initiatives/update/:id"
module.exports = router;
