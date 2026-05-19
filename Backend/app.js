if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
require("./models/review");   // ✅ FORCE LOAD
require("./models/listing");  // (optional but good)
const mongoose = require("mongoose");
const cors = require("cors");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ================= DB CONNECTION =================
const dbUrl = process.env.MONGO_URI;

mongoose.connect(dbUrl)
    .then(() => console.log("Connected to DB ✅"))
    .catch((err) => console.log("Mongo Error ❌", err));

// ================= MIDDLEWARE =================
app.use(
    cors({
        origin: "https://wanderlust-red-six.vercel.app",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= SESSION =================
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Session Store Error ❌", err);
});

app.set("trust proxy", 1);

app.use(session({
    store,
    secret: process.env.SECRET || "secret123",
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,

        secure: true,
        sameSite: "none",
    },
}));

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= ROUTES =================

// 🔥 IMPORTANT: order matters
app.use("/api/listings", listingRouter);
app.use("/api/auth", userRouter);

// ✅ NESTED ROUTE (must come AFTER listingRouter)
app.use("/api/listings/:id/reviews", reviewRouter);

// ================= ROOT =================
app.get("/", (req, res) => {
    res.json({ message: "WanderLust API is running!" });
});

// ================= ERROR HANDLING =================
app.use((req, res, next) => {
    next(new ExpressError(404, "Route Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).json({ error: message });
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server running on port 8080 🚀");
});