const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a recipe title'],
    trim: true
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add ingredients'],
  },
  instructions: {
    type: [String],
    required: [true, 'Please add cooking instructions'],
  },
  cookingTime: {
    type: Number, // in minutes
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Recipe', recipeSchema);