const Recipe = require('../models/recipeModel');

// @desc    Create a new recipe
// @route   POST /api/recipes
const createRecipe = async (req, res) => {
  try {
    if (!req.body.title || !req.body.ingredients || !req.body.instructions) {
      return res.status(400).json({ message: 'Please include all required fields' });
    }

    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Retrieve all recipes
// @route   GET /api/recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Retrieve a single recipe by ID
// @route   GET /api/recipes/:id
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};