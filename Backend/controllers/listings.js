const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const getGeocodingClient = () => {
    return mbxGeocoding({ accessToken: process.env.MAP_TOKEN });
};
const ExpressError = require("../utils/ExpressError.js");

module.exports.searchListings = async (req, res) => {
    let { q } = req.query;

    if (!q || q.trim() === "") {
        return res.status(400).json({ error: "Please enter something to search!" });
    }

    const regex = new RegExp(q.trim(), "i");

    const allListings = await Listing.find({
        $or: [
            { title: regex },
            { location: regex },
            { country: regex }
        ]
    });

    res.status(200).json({ allListings });
};

module.exports.index = async (req, res) => {
    let { category, search } = req.query;
    let filter = {};

    if (search) {
        filter.$or = [
            { title: new RegExp(search, "i") },
            { location: new RegExp(search, "i") },
            { country: new RegExp(search, "i") }
        ];
    }

    if (category && category !== "trending") {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);
    res.status(200).json({ allListings });
};

module.exports.explore = async (req, res) => {
    const allListings = await Listing.find({});
    res.status(200).json({ allListings });
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");

    if (!listing) {
        return res.status(404).json({ error: "Listing not found!" });
    }

    res.status(200).json({ listing });
};

module.exports.createListing = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing!");
    }

    if (!req.file) {
        throw new ExpressError(400, "Image upload failed!");
    }

    let response = await getGeocodingClient().forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    if (!response.body.features.length) {
        return res.status(400).json({ error: "Invalid location!" });
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, filename: req.file.filename };
    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();

    res.status(201).json({ message: "New Listing Created!", listing: newListing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).json({ error: "Listing not found!" });
    }

    res.status(200).json({ listing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing
    }, { new: true });

    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
        await listing.save();
    }

    res.status(200).json({ message: "Listing Updated!", listing });
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.status(200).json({ message: "Listing Deleted!" });
};

module.exports.renderNewForm = (req, res) => {
    res.status(200).json({ message: "Render new listing form" });
};