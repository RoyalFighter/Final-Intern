import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home= () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', image: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/items');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewItem({ ...newItem, image: e.target.files[0] });
  };

  const handleAddItem = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('description', newItem.description);
      formData.append('image', newItem.image);

      const response = await axios.post('http://localhost:3001/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setData([...data, response.data]);
      setNewItem({ name: '', description: '', image: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (id, updatedItem) => {
    try {
      const formData = new FormData();
      formData.append('name', updatedItem.name);
      formData.append('description', updatedItem.description);
      formData.append('image', updatedItem.image);

      await axios.put(`http://localhost:3001/api/items/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedData = data.map((item) => (item.id === id ? updatedItem : item));
      setData(updatedData);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/items/${id}`);
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div  className="bg-gray-100 min-h-screen">
      <h2>CRUD Demo with Images</h2>
      <div  >
        <h3>Add Item</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div>
        <h3>Items</h3>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.name} - {item.description}
              {item.image && <img src={item.image} alt={item.name} />}
              <button onClick={() => handleUpdateItem(item.id, { ...item, name: 'Updated' })}>
                Update
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
