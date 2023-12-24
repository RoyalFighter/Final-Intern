import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CurdDemo = () => {
  const [animals, setAnimals] = useState([]);
  const [animalForm, setAnimalForm] = useState({ name: '', image: '', features: '' });
  const [updateAnimal, setUpdateAnimal] = useState(null);

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
    setAnimalForm({ ...animalForm, [e.target.name]: e.target.value });
  };

  const handleAnimalAction = async () => {
    try {
      if (updateAnimal) {
        // If updateAnimal is present, update the existing animal
        await axios.put(`http://localhost:3001/api/animals/update/${updateAnimal._id}`, animalForm);
        setAnimals((prevAnimals) =>
          prevAnimals.map((animal) => (animal._id === updateAnimal._id ? { ...animal, ...animalForm } : animal))
        );
        setUpdateAnimal(null);
        toast.success('Animal updated successfully');
      } else {
        // If updateAnimal is not present, add a new animal
        const response = await axios.post('http://localhost:3001/api/animals/create', animalForm);
        setAnimals([...animals, response.data]);
        toast.success('Animal added successfully');
      }

      // Reset the form
      setAnimalForm({ name: '', image: '', features: '' });
    } catch (error) {
      console.error('Error handling animal action:', error);
      toast.error('Error handling animal action');
    }
  };

  const handleDeleteAnimal = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/animals/${id}`);
      setAnimals(animals.filter((animal) => animal._id !== id));
      toast.success('Animal deleted successfully');
    } catch (error) {
      console.error('Error deleting animal:', error);
      toast.error('Error deleting animal');
    }
  };

  const openUpdateForm = (animal) => {
    setUpdateAnimal(animal);
    setAnimalForm({
      name: animal.name || '',
      image: animal.image || '',
      features: animal.features || '',
    });
  };
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={animalForm.name}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          value={animalForm.image}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Features"
          name="features"
          value={animalForm.features}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAnimalAction}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {updateAnimal ? 'Update Animal' : 'Add Animal'}
        </button>
      </div>
      <div className="flex flex-wrap">
        <h3 className="text-xl font-semibold mb-2 w-full">Animals</h3>
        {animals.slice(0).reverse().map((animal) => (
          <div key={animal._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 p-4 relative group">
            <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col justify-between">
              {animal.image && (
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
              )}
              <div>
                {/* Display name only if there is no image */}
                {!animal.image && <p className="text-lg font-semibold mb-2">{animal.name}</p>}
                <p>{animal.features}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => openUpdateForm(animal)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteAnimal(animal._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CurdDemo;
