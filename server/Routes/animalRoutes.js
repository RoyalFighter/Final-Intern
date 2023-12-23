const express = require('express');
const router = express.Router();
const animalController = require('../Controllers/animalController');

// Define routes
router.get('/', animalController.getAllAnimals);
router.get('/:name', animalController.getAnimalByName);
router.post('/create', animalController.createAnimal);
router.put('/update/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;
