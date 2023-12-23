const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://authz-app.vercel.app', 'http://192.168.18.10:3000'],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:qsjQ0LW9ic2IMAvF@cluster0.jcmtcpq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const animalRoutes = require('./Routes/animalRoutes');
app.use('/api/animals', animalRoutes);
app.get('/', (req, res) => {
    res.send('Home Page');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
