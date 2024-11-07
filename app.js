const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the Express app
const app = express();

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());

// Connect to MongoDB (Make sure MongoDB is running on localhost:27017)
mongoose.connect('mongodb://localhost:27017/nodejscrud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.log("Error connecting to MongoDB", err);
});

// Define the port number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
