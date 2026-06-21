const propertyService = require("../services/propertyService");

const getAllProperties = async (req, res) => {
  try {
    const result = await propertyService.getAllProperties(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

const getMyListings = async (req, res) => {
  try {
    const result = await propertyService.getMyListings(req.user._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const result = await propertyService.getPropertyById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

const createProperty = async (req, res) => {
  try {
    const result = await propertyService.createProperty(req.user._id, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const result = await propertyService.updateProperty(req.params.id, req.user._id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const result = await propertyService.deleteProperty(req.params.id, req.user._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

module.exports = {
  getAllProperties,
  getMyListings,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
