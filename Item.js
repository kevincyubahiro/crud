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
  app.get('/items', (req, res) => {
    Item.find()
      .then(items => {
        res.json(items);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  // Fetch a single item by ID
  app.get('/items/:id', (req, res) => {
    const { id } = req.params;
  
    Item.findById(id)
      .then(item => {
        if (!item) {
          return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
  
    Item.findByIdAndUpdate(id, { name, description, price }, { new: true })
      .then(item => {
        if (!item) {
          return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
  
    Item.findByIdAndDelete(id)
      .then(item => {
        if (!item) {
          return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  