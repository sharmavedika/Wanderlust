const Listing = require("../models/listing");
const Review = require("../models/review"); // ✅ FIXED

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return res.status(404).json({ error: "Listing not found!" });
    }

    const newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.status(201).json({
        message: "Review Created!",
        review: newReview
    });
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
        message: "Review Deleted!"
    });
};