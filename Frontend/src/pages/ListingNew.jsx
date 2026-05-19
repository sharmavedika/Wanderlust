import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const categories = [
    "trending", "rooms", "iconic-cities", "mountains",
    "castles", "pools", "camping", "farms", "arctic", "domes"
];

export default function ListingNew() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",
        category: ""
    });

    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");

    // ✅ CUSTOM VALIDATION
    const validate = () => {
        let newErrors = {};

        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (!image) newErrors.image = "Image is required";
        if (!form.price || form.price <= 0) newErrors.price = "Enter valid price";
        if (!form.country.trim()) newErrors.country = "Country is required";
        if (!form.location.trim()) newErrors.location = "Location is required";
        if (!form.category) newErrors.category = "Select category";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                formData.append(`listing[${key}]`, form[key]);
            });

            formData.append("image", image);

            await axiosInstance.post("/listings", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create listing!");
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">

                    <div className="p-4 shadow-sm border rounded-4 bg-white">
                        <h3 className="mb-4 text-center">
                            Create a New Listing
                        </h3>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit} noValidate>

                            {/* TITLE */}
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? "is-invalid" : form.title ? "is-valid" : ""}`}
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                {!errors.title && form.title && <div className="valid-feedback">Title looks good!</div>}
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className={`form-control ${errors.description ? "is-invalid" : form.description ? "is-valid" : ""}`}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                {!errors.description && form.description && <div className="valid-feedback">Looks good!</div>}
                            </div>

                            {/* IMAGE */}
                            <div className="mb-3">
                                <label className="form-label">Upload Listing Image</label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.image ? "is-invalid" : image ? "is-valid" : ""}`}
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                {!errors.image && image && <div className="valid-feedback">Image looks good!</div>}
                            </div>

                            <div className="row">
                                {/* PRICE */}
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.price ? "is-invalid" : form.price ? "is-valid" : ""}`}
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    />
                                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                    {!errors.price && form.price && <div className="valid-feedback">Looks good!</div>}
                                </div>

                                {/* COUNTRY */}
                                <div className="col-md-8 mb-3">
                                    <label className="form-label">Country</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.country ? "is-invalid" : form.country ? "is-valid" : ""}`}
                                        value={form.country}
                                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                    {!errors.country && form.country && <div className="valid-feedback">Looks good!</div>}
                                </div>
                            </div>

                            {/* LOCATION */}
                            <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.location ? "is-invalid" : form.location ? "is-valid" : ""}`}
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                />
                                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                                {!errors.location && form.location && <div className="valid-feedback">Looks good!</div>}
                            </div>

                            {/* CATEGORY */}
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select
                                    className={`form-control ${errors.category ? "is-invalid" : form.category ? "is-valid" : ""}`}
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                {!errors.category && form.category && <div className="valid-feedback">Looks good!</div>}
                            </div>

                            <button className="btn btn-danger w-100 mt-3">
                                Add Listing
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}