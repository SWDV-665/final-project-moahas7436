const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  mealDescription: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  }
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
