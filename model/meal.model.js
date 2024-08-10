// models/meal.model.js
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    idMeal: {
        type: Number,
        unique: true
    },
    strMeal: {
        type: String
    },
    strCategory: {
        type: String
    },
    strArea: {
        type: String,
    },
    strInstructions: {
        type: String,
    },
    strMealThumb: {
        type: String,
    },
    strIngredients: [{
        type: String
    }]
}, { timestamps: true });

const Meal = mongoose.model('Meal', mealSchema);

module.exports = { Meal };
