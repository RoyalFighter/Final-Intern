import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurdDemo = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ name: '', image: '', features: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/animals');
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
  };

  const handleAddAnimal = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/animals/create', newAnimal);
      setAnimals([...animals, response.data]);
      setNewAnimal({ name: '', image: '', features: '' });
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-4">CRUD Demo</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Add Animal</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newAnimal.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={newAnimal.image}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Features"
            name="features"
            value={newAnimal.features}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddAnimal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Animal
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Animals</h3>
        <ul>
          {animals.map((animal) => (
            <li key={animal._id} className="mb-4">
              <div className="flex items-center">
                {animal.image && <img src={animal.image} alt={animal.name} className="w-10 h-10 mr-4 rounded-full" />}
                <div>
                  <p className="text-lg font-semibold">{animal.name}</p>
                  <p>{animal.features}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurdDemo;
