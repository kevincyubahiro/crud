const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
app.post('/items', (req, res) => {
    const { name, description, price } = req.body;
  
    const newItem = new Item({
      name,
      description,
      price
    });
  
    newItem.save()
      .then(item => {
        res.status(201).json(item);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  