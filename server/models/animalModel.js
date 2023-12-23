const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    unique: true,
  },
  image: {
    type: String, // Assuming the image is stored as a URL
  },
  features: {
    type: String,
  },
  tags: {
    type: [String],
  },
  location: {
    type: String,
  },
  lifespan: {
    type: String,
  },
  diet: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  behavioralTraits: {
    type: String,
  },
  conservationStatus: {
    type: String,
  },
  relatedSpecies: {
    type: [String],
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
  },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
