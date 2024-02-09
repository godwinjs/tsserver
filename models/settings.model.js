/* external import */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

/* create settings schema */
const settingsSchema = new mongoose.Schema(
  {
    sid: {
      type: String,
      trim: true,
      unique: [true, "Same page settings already exists"],
      maxLength: [100, "page settings would be at most 100 characters"],
    },
    title: {
        type: String,
        trim: true,
        maxLength: [1000, "homepage title would be at most 500 characters"],
    },
    currency: {
        type: String,
        required: [true, "Please, provide base currency"],
        trim: true,
        maxLength: [50, "Currency should be at most 50 characters"],
    },
    aboutDescription: {
      type: String,
      trim: true,
    },


    // for category  time stamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* create settings schema */
const Settings = mongoose.model("Settings", settingsSchema);
console.log('Settings.schema.model', Settings)

/* export product schema */
module.exports = Settings;

/*
homepage: {
          title: {
              type: String,
              required: [true, "Please, provide a product title"],
              trim: true,
              maxLength: [500, "homepage title would be at most 500 characters"],
              default: ""
          },
          currency: {
              type: String,
              required: [true, "Please, provide base currency"],
              trim: true,
              maxLength: [50, "Currency should be at most 50 characters"],
              default: ""
          }

        },
*/