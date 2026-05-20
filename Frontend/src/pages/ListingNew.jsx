import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const categories = [
    { value: "trending",     label: "🔥 Trending" },
    { value: "rooms",        label: "🛏️ Rooms" },
    { value: "iconic-cities",label: "🏙️ Iconic Cities" },
    { value: "mountains",    label: "⛰️ Mountains" },
    { value: "castles",      label: "🏰 Castles" },
    { value: "pools",        label: "🏊 Amazing Pools" },
    { value: "camping",      label: "⛺ Camping" },
    { value: "farms",        label: "🐄 Farms" },
    { value: "arctic",       label: "☃️ Arctic" },
    { value: "domes",        label: "🏛️ Domes" },
];

export default function ListingNew() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "", description: "", price: "",
        location: "", country: "", category: ""
    });

    const [image, setImage]       = useState(null);
    const [preview, setPreview]   = useState(null);
    const [errors, setErrors]     = useState({});
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setErrors({ ...errors, image: "" });
    };

    const validate = () => {
        let e = {};
        if (!form.title.trim())       e.title       = "Title is required";
        if (!form.description.trim()) e.description = "Description is required";
        if (!image)                   e.image       = "Image is required";
        if (!form.price || form.price <= 0) e.price = "Enter a valid price";
        if (!form.country.trim())     e.country     = "Country is required";
        if (!form.location.trim())    e.location    = "Location is required";
        if (!form.category)           e.category    = "Select a category";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach((k) => formData.append(`listing[${k}]`, form[k]));
            formData.append("image", image);
            await axiosInstance.post("/listings", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create listing!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-listing-page">

            {/* ── Left panel ── */}
            <div className="new-listing-panel">
                <div className="new-listing-panel-inner">
                    <div className="nlp-tag">Host on Wanderlust</div>
                    <h2 className="nlp-headline">
                        Share your<br />
                        <em>special place.</em>
                    </h2>
                    <p className="nlp-sub">
                        List your property and connect with travellers from around the world.
                        It only takes a few minutes.
                    </p>
                    <div className="nlp-steps">
                        {[
                            { n: "01", t: "Describe your place",  s: "Give it a great title and description." },
                            { n: "02", t: "Add a photo",          s: "A great image gets 3× more bookings." },
                            { n: "03", t: "Set your price",       s: "You're always in control of pricing." },
                        ].map(step => (
                            <div className="nlp-step" key={step.n}>
                                <span className="nlp-step-num">{step.n}</span>
                                <div>
                                    <div className="nlp-step-title">{step.t}</div>
                                    <div className="nlp-step-sub">{step.s}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right form ── */}
            <div className="new-listing-form-side">
                <div className="new-listing-card">

                    <h1 className="nl-title">Create a new listing</h1>
                    <p className="nl-subtitle">Fill in the details below to publish your stay.</p>

                    {error && (
                        <div className="auth-error mb-4">
                            <i className="fa-solid fa-circle-exclamation"></i> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="nl-form">

                        {/* IMAGE UPLOAD — top, visual first */}
                        <div className="nl-field">
                            <label className="nl-label">Listing photo</label>
                            <label className="nl-image-upload" htmlFor="nl-image-input"
                                style={preview ? { padding: 0, border: "none" } : {}}>
                                {preview ? (
                                    <img src={preview} alt="preview" className="nl-image-preview" />
                                ) : (
                                    <>
                                        <i className="fa-solid fa-cloud-arrow-up nl-upload-icon"></i>
                                        <span className="nl-upload-text">Click to upload a photo</span>
                                        <span className="nl-upload-hint">JPG, PNG, WEBP · max 5 MB</span>
                                    </>
                                )}
                            </label>
                            <input
                                id="nl-image-input"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImage}
                            />
                            {errors.image && <span className="nl-error">{errors.image}</span>}
                            {!errors.image && image && (
                                <span className="nl-success">
                                    <i className="fa-solid fa-check"></i> {image.name}
                                </span>
                            )}
                        </div>

                        {/* TITLE */}
                        <div className="nl-field">
                            <label className="nl-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                className={`nl-input ${errors.title ? "nl-input-error" : form.title ? "nl-input-ok" : ""}`}
                                placeholder="e.g. Santorini Cliffside Luxury Villa"
                                value={form.title}
                                onChange={handleChange}
                            />
                            {errors.title && <span className="nl-error">{errors.title}</span>}
                        </div>

                        {/* DESCRIPTION */}
                        <div className="nl-field">
                            <label className="nl-label">Description</label>
                            <textarea
                                name="description"
                                className={`nl-input nl-textarea ${errors.description ? "nl-input-error" : form.description ? "nl-input-ok" : ""}`}
                                placeholder="Describe what makes your place special — views, amenities, vibe…"
                                value={form.description}
                                onChange={handleChange}
                            />
                            {errors.description && <span className="nl-error">{errors.description}</span>}
                        </div>

                        {/* PRICE + COUNTRY */}
                        <div className="nl-row">
                            <div className="nl-field">
                                <label className="nl-label">Price per night (₹)</label>
                                <div className="nl-price-wrap">
                                    <span className="nl-price-symbol">₹</span>
                                    <input
                                        type="number"
                                        name="price"
                                        className={`nl-input nl-price-input ${errors.price ? "nl-input-error" : form.price ? "nl-input-ok" : ""}`}
                                        placeholder="0"
                                        value={form.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.price && <span className="nl-error">{errors.price}</span>}
                            </div>

                            <div className="nl-field">
                                <label className="nl-label">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    className={`nl-input ${errors.country ? "nl-input-error" : form.country ? "nl-input-ok" : ""}`}
                                    placeholder="e.g. India"
                                    value={form.country}
                                    onChange={handleChange}
                                />
                                {errors.country && <span className="nl-error">{errors.country}</span>}
                            </div>
                        </div>

                        {/* LOCATION */}
                        <div className="nl-field">
                            <label className="nl-label">
                                <i className="fa-solid fa-location-dot" style={{ color: "#ff385c", marginRight: 6 }}></i>
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                className={`nl-input ${errors.location ? "nl-input-error" : form.location ? "nl-input-ok" : ""}`}
                                placeholder="City, region or address"
                                value={form.location}
                                onChange={handleChange}
                            />
                            {errors.location && <span className="nl-error">{errors.location}</span>}
                        </div>

                        {/* CATEGORY */}
                        <div className="nl-field">
                            <label className="nl-label">Category</label>
                            <div className="nl-category-grid">
                                {categories.map((cat) => (
                                    <button
                                        type="button"
                                        key={cat.value}
                                        className={`nl-cat-btn ${form.category === cat.value ? "nl-cat-active" : ""}`}
                                        onClick={() => { setForm({ ...form, category: cat.value }); setErrors({ ...errors, category: "" }); }}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                            {errors.category && <span className="nl-error">{errors.category}</span>}
                        </div>

                        {/* SUBMIT */}
                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading
                                ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Publishing…</>
                                : <><i className="fa-solid fa-paper-plane"></i> Publish listing</>
                            }
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}