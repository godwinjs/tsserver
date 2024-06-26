/* external import */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

/* create product schema */
const productSchema = new mongoose.Schema(
  {
    // for title
    title: {
      type: String,
      required: [true, "Please, provide a product title"],
      trim: true,
      unique: [true, "Same product already exists"],
      maxLength: [100, "Product title would be at most 100 characters"],
    },

    // for Best Seller
    bestSeller: {
      type: Boolean,
      default: false,
    },

    // for Expert Choice
    expertChoice: {
      type: Boolean,
      default: false,
    },

    // for details
    details: {
      type: String,
      required: [true, "Please, provide product details"],
      trim: true,
      maxLength: [50000, "Product description would be at most 50000 characters"],
    },

    // for description
    description: {
      type: String,
      required: [true, "Please, provide product description"],
      trim: true,
      maxLength: [20000, "Product description would be at most 2000 characters"],
    },

    // for thumbnail
    thumbnail: {
      url: {
        type: String,
        validate: [validator.isURL, "Please provide a valid thumbnail URL"],
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    // for gallery
    gallery: {
      type: [
        {
          url: {
            type: String,
            default: "",
            validate: [
              validator.isURL,
              "Please, provide a valid garry photo URL",
            ],
          },
          public_id: {
            type: String,
            default: "",
          },
        },
      ],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "Won't able to add more than 5 gallery",
      },
    },

    // for price
    price: {
      type: Number,
      required: [true, "Please, provide a product price"],
      min: [5, "Price unit won't be less than 5"],
    },

    // for category
    category: {
      type: ObjectId,
      ref: "Category",
    },
    // for subcategory
    subcategory: {
      type: ObjectId,
      ref: "Subcategory",
    },

    // for brand
    brand: {
      type: ObjectId,
      ref: "Brand",
    },

    // for store
    store: {
      type: ObjectId,
      ref: "Store",
    },

    // for review
    review: [
      {
        reviewer: {
          type: ObjectId,
          ref: "User",
        },
        description: {
          type: String,
          trim: true,
          maxLength: [500, "Your review name must be at least 500 characters"],
        },
        status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // for tags
    tags: {
      type: [{ type: String, trim: true }],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "Won't be able to add more than 5 tags",
      },
    },

    
    // for status
    status: {
      type: String,
      // required: [true, "Please, provide a product status or promotion"],
      default: 'none',
      trim: true,
      maxLength: [50, "Product status or promotion text should be at most 40 characters"],
    },
    // for allOfsizes```````````````
    allOfSizes: {
      type: [{ type: String, trim: true }],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
        message: "Won't able to add more than 10 Sizes or product type",
      },
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

/* middleware for product */
productSchema.pre("save", function (next) {
  // capitalize title
  let splitStr = this.title?.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  this.title = splitStr.join(" ");

  // replace space with hyphen and lowercase
  const newTags = [];
  this.tags.forEach((tag) =>
    newTags.push(tag.replace(" ", "-")?.toLowerCase())
  );
  this.tags = newTags;

  next();
});

//for search
productSchema.index({ title: 'text', details: 'text', price: 'text', description: 'text', category: 'text' });

/* create product schema */
const Product = mongoose.model("Product", productSchema);
console.log('Product.schema.model',Product)

/* export product schema */
module.exports = Product;

/*    // for variant
    variant: {
      type: String,
      // required: [true, "Please, provide a product status or promotion"],
      trim: true,
      default: "",
      maxLength: [5, "Product variant type text should be at most 5 characters"],
    },
    // for variants`````````````
    variants: {
      type: [
        {
          name: {
            type: String,
            default: "",
          }, 
          color: {
            type: String,
            default: "",
          },
          //smaller image on product-card
          thumbnail: {
            type: {
              url: {
                type: String,
                default: "",
                validate: [
                  validator.isURL,
                  "Please, provide a valid thumbnail photo URL",
                ],
              },
              public_id: {
                type: String,
                default: "",
              },
            } 
          },
          //bigger image in /product-detail
          featuredImage: {
            type: {
                url: {
                  type: String,
                  default: "",
                  validate: [
                    validator.isURL,
                    "Please, provide a valid featured image photo URL",
                  ],
                },
                public_id: {
                  type: String,
                  default: "",
                },
              }
          }
        },
      ],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "Won't able to add more than 5 gallery",
      },
    },*/