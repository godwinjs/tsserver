/* external imports */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

/* create user schema */
const userSchema = new mongoose.Schema(
  {
    // next auth providers as needed
    authProvider: {
      type: String,
      enum: ['local', 'google'], 
      required: true
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    // for user full name
    name: {
      type: String,
      required: [true, "Please, provide your full name"],
      trim: true,
      maxLength: [100, "Your name would be at most 100 characters"],
    },

    // for user email
    email: {
      type: String,
      required: [true, "Please, provide your email address"],
      validate: [validator.isEmail, "Provide a valid email address"],
      unique: [true, "Email already exist. Please, provide new"],
    },

    // for user initial password
    password: {
      type: String,
      required: false,
      validate: {
        validator: function(value) {
          // Only validate if a password is provided
          if (value) {
            return validator.isStrongPassword(value, {
              minUppercase: 1,
              minLowercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            });
          }
          return true; // If no password, validation passes
        },
        message:
          "Password should contain minimum 1 => uppercase, lowercase, number and symbol",
      },
      minLength: [8, "Password should be at least 8 characters"],
      maxLength: [80, "Password should be at most 20 characters"],
    },

    // for user confirm password
    confirmPassword: {
      type: String,
      required: [false, "Please, retype your password to confirm"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password don't match. Please, try again",
      },
    },

    // for user avatar
    avatar: {
      url: {
        type: String,
        // validate: [validator.isURL, "Please provide a valid avatar URL"],
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    // for user gender
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "binary", "rather not say"],
        message: "Gender would be male/female/binary",
      },
        default: "rather not say",
    },

    // for user contact number
    phone: {
      type: String,
      // required: [
      //   false,
      //   "Please, provide your phone number, i.e.: +234xxxxxxxxx",
      // ],
      // validate: {
      //   validator: (value) =>
      //     validator.isMobilePhone(value, "bn-BD", { strictMode: true }),
      //   message:
      //     "Phone number {VALUE} is not valid. Please, retry like +234xxxxxxxxx",
      // },
      default: ""
    },

    // for user role to be played
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },

    // for user account status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // for user address
    address: {
      type: String,
      required: false,
      trim: true,
      maxLength: [500, "Your address would be at most 500 characters"],
    },

    // for user date of birth
    dob: {
      type: Date,
      required: false,
    },

    // for carting products
    cart: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          min: [1, "Quantity won't be less than 1"],
        },
        cartedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    
    // for orders
    orders: [
      {
        orderID: {
          type: String,
          required: [true, "Please, provide order ID"],
          trim: true,
        },
        products: [
          {
            description: {
              type: String,
              required: [true, "Please, provide product description"],
              trim: true,
            },
            image: {
              type: String,
              required: [true, "Please, provide product image"],
              trim: true,
            },
            status: {
              type: String,
              required: [true, "Please, provide product status"],
              trim: true,
            },
            price: {
              type: Number,
              required: [true, "Please, provide product price"],
              trim: true,
            },
            title: {
              type: String,
              required: [true, "Please, provide product title"],
              trim: true,
            },
            _id: {
              type: String,
              required: [true, "Please, provide product ID"],
              trim: true,
            },
            quantity: {
              type: Number,
              min: [1, "Quantity won't be less than 1"],
            }
          },
        ],
        status: {
          type: String,
          required: [true, "Please, provide order status"],
          trim: true,
        },
        orderDate: {
          type: String,
          required: [true, "Please, provide order date"],
          trim: true,
        }
      },
    ],

    // for store creation
    store: {
      type: ObjectId,
      ref: "Store",
    },

    // for user account time stamps
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

/* encrypted user account password */
userSchema.methods.encryptedPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

/* middleware to encrypt password */
// userSchema.pre("save", async function (next) {
//   try {
//     // initialize encrypted password
//     if (!this.isModified("password")) {
//       return next();
//     }

//     // encrypt password
//     this.password = this.encryptedPassword(this.password);

//     // after encryption remove confirm password field
//     this.confirmPassword = undefined;
//   } catch (error) {
//     next(error);
//   }
// });
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = this.encryptedPassword(this.password);
  }
  this.confirmPassword = undefined;
  next();
});

/* compare passwords as sign in proportion */
userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

/* create user model schema */
const User = mongoose.model("User", userSchema);

/* export user schema */
module.exports = User;