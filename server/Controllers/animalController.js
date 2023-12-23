const Animal = require('../models/animalModel');
const dummyData = {
  tags: ['wild', 'carnivore', 'herbivore', 'domestic'],
  locations: ['Africa', 'Asia', 'North America', 'South America', 'Australia'],
  lifespans: ['5-10 years', '10-15 years', '15-20 years', '20+ years'],
  diets: ['Carnivorous', 'Herbivorous', 'Omnivorous'],
  colors: ['Brown', 'Black', 'White', 'Gray', 'Spotted'],
  sizes: ['Small', 'Medium', 'Large'],
  behavioralTraits: ['Territorial', 'Social', 'Solitary', 'Nocturnal', 'Diurnal'],
  conservationStatus: ['Endangered', 'Vulnerable', 'Least Concern', 'Critically Endangered'],
  relatedSpecies: ['Tiger', 'Lion', 'Leopard', 'Cheetah', 'Jaguar'],
};

const getRandomValue = (field) => {
  const values = dummyData[field];
  return values[Math.floor(Math.random() * values.length)];
};

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
      // Extracting user-provided data
      const { name, image, features } = req.body;

      // Generating random values for other fields
      const randomAnimal = {
        name,
        image,
        features,
        tags: getRandomValue('tags'),
        location: getRandomValue('locations'),
        lifespan: getRandomValue('lifespans'),
        diet: getRandomValue('diets'),
        color: getRandomValue('colors'),
        size: getRandomValue('sizes'),
        behavioralTraits: getRandomValue('behavioralTraits'),
        conservationStatus: getRandomValue('conservationStatus'),
        relatedSpecies: getRandomValue('relatedSpecies'),
      };

      //adding animal to database
      const newAnimal = await Animal.create(randomAnimal);

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
