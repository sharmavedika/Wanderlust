const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudConfig.js"); // make sure this exists
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");


// 🔍 SEARCH ROUTE
router.get("/search", wrapAsync(listingController.searchListings));

// 🌍 EXPLORE ROUTE (must be above /:id)
router.get("/explore", wrapAsync(listingController.explore));

// 🧪 TEST ROUTE
router.get("/test", (req, res) => {
    res.send("Listing route working ✅");
});


// ✅ MAIN LISTINGS ROUTE
router
.route("/")
.get(wrapAsync(listingController.index)) // public
.post(
    isLoggedIn,
    upload.single("image"), // ✅ FIXED HERE
    validateListing,
    wrapAsync(listingController.createListing)
);


// 🆕 NEW LISTING FORM
router.get("/new", isLoggedIn, listingController.renderNewForm);


// 📄 SHOW / UPDATE / DELETE
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("image"), // ✅ FIXED HERE
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
);


// ✏️ EDIT FORM
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;