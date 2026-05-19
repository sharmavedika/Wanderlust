const Listing = require("./models/listing");
const Review = require("./models/review"); // ✅ FIXED
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

// ================= LOGIN CHECK =================
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "You must be logged in!" });
    }
    next();
};

// ================= LISTING OWNER =================
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).json({ error: "Listing not found!" });
    }

    if (!listing.owner.equals(req.user._id)) {
        return res.status(403).json({ error: "You are not the owner of this listing!" });
    }

    next();
};

// ================= REVIEW AUTHOR =================
module.exports.isAuthor = async (req, res, next) => {
    let { reviewId } = req.params;

    let review = await Review.findById(reviewId);

    if (!review) {
        return res.status(404).json({ error: "Review not found!" });
    }

    if (!review.author.equals(req.user._id)) {
        return res.status(403).json({ error: "You are not the author of this review!" });
    }

    next();
};

// ================= VALIDATE LISTING =================
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};

// ================= VALIDATE REVIEW =================
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};