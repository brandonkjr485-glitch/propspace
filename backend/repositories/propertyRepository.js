const Property = require("../models/Property");

const findAll = (filter) =>
  Property.find(filter)
    .populate("owner", "username email avatar")
    .sort({ createdAt: -1 });

const findById = (id) =>
  Property.findById(id).populate("owner", "username email avatar");

const findByOwner = (ownerId) =>
  Property.find({ owner: ownerId }).sort({ createdAt: -1 });

const create = (data) => Property.create(data);

const save = (property) => property.save();

const remove = (property) => property.deleteOne();

module.exports = { findAll, findById, findByOwner, create, save, remove };
