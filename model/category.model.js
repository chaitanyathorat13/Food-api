const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    idCategory: {
        type: String,
        required: true,
        unique: true
    },
    strCategory: {
        type: String,
        required: true
    },
    strCategoryThumb: {
        type: String,
        required: true
    },
    strCategoryDescription: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };
