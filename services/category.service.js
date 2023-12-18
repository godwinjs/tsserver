/* internal import */
const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.model");
const Product = require("../models/product.model");
const remove = require("../utils/remove.util");

/* insert new category */
exports.createCategory = async (data) => {
  return await Category.create(data);
};

/* display all category */
exports.displayCategories = async ({ page, limit }) => {
  const result = await Category.find({})
    .skip((Number(page) - 1) * limit)
    .limit(limit)
    .sort("-updatedAt")
    .populate({
      path: "subcategories",
      select: "title",
    });

  const count = await Category.estimatedDocumentCount();
  return { categories: result, count };
};

/* display specific category */
exports.displayCategory = async ({ id }) => {
  return await Category.findById(id);
};

/* update specific category */
exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, {
    runValidators: true,
    returnOriginal: false,
  });
};

/* remove specific category */
exports.removeCategory = async ({ id }) => {
  const result = await Category.findByIdAndDelete(id);
  await remove(result.thumbnail.public_id);

  // remove from subcategory
  result.subcategories.forEach(async (subcategory) => {
    await Subcategory.findByIdAndUpdate(subcategory, {
      $unset: { category: result._id },
    });
  });
    // remove from product
    result.products.forEach(async (product) => {
      await Product.findByIdAndUpdate(product, {
        $unset: { category: result._id },
      });
    });

  return result;
};
