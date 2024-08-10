const { Category } = require("../model/category.model");

const createCategory = async (req, res) => {
    const { idCategory, strCategory, strCategoryThumb, strCategoryDescription } = req.body;

    try {
        const newCategory = new Category({
            idCategory,
            strCategory,
            strCategoryThumb,
            strCategoryDescription
        });
        await newCategory.save();

        return res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        console.error(`Error creating category: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).json(categories);
    } catch (error) {
        console.error(`Error fetching categories: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getCategoryById = async (req, res) => {
    const { idCategory } = req.params;

    try {
        const category = await Category.findOne({ idCategory });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.error(`Error fetching category: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getCategoryByStrCategory = async (req, res) => {
    const { strCategory } = req.params;
    
    try {
        const categories = await Category.find({ strCategory: { $regex: `^${strCategory}`, $options: 'i' } });
        
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        return res.status(200).json(categories);
    } catch (error) {
        console.error(`Error fetching categories: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const updateCategory = async (req, res) => {
    const { idCategory } = req.params;
    const updateData = req.body;

    try {
        const updatedCategory = await Category.findOneAndUpdate({ idCategory }, updateData, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        console.error(`Error updating category: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteCategory = async (req, res) => {
    const { idCategory } = req.params;

    try {
        const deletedCategory = await Category.findOneAndDelete({ idCategory });
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(`Error deleting category: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createCategory, getAllCategories, getCategoryById, getCategoryByStrCategory, updateCategory, deleteCategory };
