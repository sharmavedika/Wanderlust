const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const defaultImg =
  "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?...";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,

  category: {
    type: String,
    enum: [
      "trending",
      "rooms",
      "iconic-cities",
      "mountains",
      "castles",
      "pools",
      "camping",
      "farms",
      "arctic",
      "domes"
    ],
    required: true,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// ✅ FIXED LINE (VERY IMPORTANT)
const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

module.exports = Listing;