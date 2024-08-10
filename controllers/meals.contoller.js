// controllers/meals.controller.js
const { Meal } = require("../model/meal.model");

async function createMeal(req, res) {
    const meals = req.body;

    try {
        if (Array.isArray(meals)) {
            for (const meal of meals) {
                const { idMeal, strMeal, strCategory, strArea, strInstructions, strMealThumb, strIngredients } = meal;
                if (!idMeal || !strMeal || !strCategory || !strArea || !strInstructions || !strMealThumb || !strIngredients) {
                    return res.status(400).json({ error: 'All fields are required for each meal' });
                }
            }

            const createdMeals = await Meal.insertMany(meals);
            return res.status(201).json(createdMeals);
        } else {
            const { idMeal, strMeal, strCategory, strArea, strInstructions, strMealThumb, strIngredients } = meals;

            if (!idMeal || !strMeal || !strCategory || !strArea || !strInstructions || !strMealThumb || !strIngredients) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const meal = await Meal.create(meals);
            return res.status(201).json(meal);
        }
    } catch (error) {
        console.error(`Error creating meals: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getAllMeals(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const startIndex = (page - 1) * limit;
        const allMeals = await Meal.find({}).skip(startIndex).limit(limit);

        if (allMeals.length === 0)
            return res.status(200).json("No Data Found");

        return res.status(200).json({ meals: allMeals });
    } catch (error) {
        console.log(`Internal server error ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function searchMeals(req, res) {
    const { searchTerm } = req.query;

    if (!searchTerm) {
        return res.status(400).json({ error: "Search term is required" });
    }

    try {
        const results = await Meal.find({ 
            strMeal: { $regex: searchTerm, $options: 'i' }
        });

        if (results.length === 0) {
            return res.status(200).json("No meals found matching the search term");
        }

        return res.status(200).json({ meals: results });
    } catch (error) {
        console.error(`Internal server error: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getCategoryByName(req, res) {
    const { strCategory } = req.params;

    try {
        const results = await Meal.find({
            strCategory: { $regex: strCategory, $options: 'i' }
        });

        if (results.length === 0) {
            return res.status(200).json("No categories found matching the search term");
        }

        return res.status(200).json({ categories: results });
    } catch (error) {
        console.error(`Internal server error: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { getAllMeals, createMeal, searchMeals, getCategoryByName };
