const propertyRepo = require("../repositories/propertyRepository");

const getAllProperties = async ({ city, minPrice, maxPrice }) => {
  const filter = {};
  if (city)     filter.city  = { $regex: city, $options: "i" };
  if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
  return propertyRepo.findAll(filter);
};

const getPropertyById = async (id) => {
  const property = await propertyRepo.findById(id);
  if (!property) throw { status: 404, message: "Property not found" };
  return property;
};

const getMyListings = async (ownerId) => {
  return propertyRepo.findByOwner(ownerId);
};

const createProperty = async (ownerId, body) => {
  const { title, description, price, city, country, propertyType, images } = body;

  if (!title || !description || price === undefined || !city || !country || !propertyType) {
    throw { status: 400, message: "All fields (title, description, price, city, country, propertyType) are required" };
  }
  if (price < 0) throw { status: 400, message: "Price must be a positive number" };
  if (!images || images.length === 0) {
    throw { status: 400, message: "At least one image URL is required" };
  }

  return propertyRepo.create({ title, description, price, city, country, propertyType, images, owner: ownerId });
};

const updateProperty = async (id, userId, body) => {
  const property = await propertyRepo.findById(id);
  if (!property) throw { status: 404, message: "Property not found" };
  if (property.owner._id.toString() !== userId.toString()) {
    throw { status: 403, message: "Forbidden: you do not own this listing" };
  }

  const fields = ["title", "description", "price", "city", "country", "propertyType", "images"];
  fields.forEach((f) => { if (body[f] !== undefined) property[f] = body[f]; });

  return propertyRepo.save(property);
};

const deleteProperty = async (id, userId) => {
  const property = await propertyRepo.findById(id);
  if (!property) throw { status: 404, message: "Property not found" };
  if (property.owner._id.toString() !== userId.toString()) {
    throw { status: 403, message: "Forbidden: you do not own this listing" };
  }
  await propertyRepo.remove(property);
  return { message: "Property deleted successfully" };
};

module.exports = {
  getAllProperties,
  getPropertyById,
  getMyListings,
  createProperty,
  updateProperty,
  deleteProperty,
};
