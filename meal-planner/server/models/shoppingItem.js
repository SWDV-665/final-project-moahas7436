const mongoose = require('mongoose');

const shoppingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  checked: { type: Boolean, default: false }  // To check off items you've gotten
});

module.exports = mongoose.model('ShoppingItem', shoppingItemSchema);
