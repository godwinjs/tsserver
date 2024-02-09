
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Settings = require("../models/settings.model");
const remove = require("../utils/remove.util");

// remove settings
async function settingsRemove(gallery) {
  Settings.forEach(async (setting) => await remove(setting));
}


// settings update
// exports.settingsUpdate = async ({ sid }) => {
//     const product = await Settings.findById(sid);
//     if (product.gallery.length) settingsRemove(product.gallery);
//   };
/* create new settings */
exports.createSettings = async (data) => {
  console.log("settings.service.js data:", data)
  const result = await Settings.create(data);
  console.log("settings.service.js", result)
  return result;
}

/* display all settings */
exports.displaySettings = async ({ page, limit }) => {
  const result = await Settings.find({})
    .skip((Number(page) - 1) * limit)
    .limit(limit)
    .sort("-updatedAt");

  const count = await Settings.estimatedDocumentCount();
  // console.log(result)
  return { settings: result, count };
};

/* display specific settings */
exports.displaySetting = async ({ id }) => {
  return await Settings.findById(id);
};