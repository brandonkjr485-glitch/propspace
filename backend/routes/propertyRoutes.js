const express = require("express");
const router  = express.Router();
const {
  getAllProperties,
  getMyListings,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

// IMPORTANT: /my-listings must be declared before /:id to avoid conflict
router.get("/",           getAllProperties);
router.get("/my-listings", protect, getMyListings);
router.get("/:id",        getPropertyById);
router.post("/",          protect, createProperty);
router.put("/:id",        protect, updateProperty);
router.delete("/:id",     protect, deleteProperty);

module.exports = router;
