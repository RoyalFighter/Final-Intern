const Animal = require('../models/animalModel');

const animalController = {
  getAllAnimals: async (req, res) => {
    try {
      const animals = await Animal.find();
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAnimalByName: async (req, res) => {
    try {
      const animal = await Animal.findOne({ name: req.params.name });
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAnimal: async (req, res) => {
    try {
      // Using Mongoose's create method to insert a new animal into the collection
      const newAnimal = await Animal.create(req.body);
      
      // Sending the newly created animal as the response
      res.json(newAnimal);
    } catch (error) {
      // Handling errors by sending a 500 Internal Server Error response
      res.status(500).json({ error: error.message });
    }
  },

  updateAnimal: async (req, res) => {
    try {
      const updatedAnimal = await Animal.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.json(updatedAnimal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteAnimal: async (req, res) => {
    try {
      await Animal.findByIdAndDelete(req.params.id);
      res.json({ message: 'Animal deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = animalController;
