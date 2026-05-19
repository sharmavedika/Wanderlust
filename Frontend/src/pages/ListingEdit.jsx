import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const categories = [
  "trending", "rooms", "iconic-cities", "mountains",
  "castles", "pools", "camping", "farms", "arctic", "domes"
];

export default function ListingEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", description: "", price: "",
    location: "", country: "", category: ""
  });

  const [errors, setErrors] = useState({});
  const [originalImage, setOriginalImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  // ✅ FETCH DATA
  useEffect(() => {
    axiosInstance.get(`/listings/${id}/edit`)
      .then((res) => {
        const l = res.data.listing;

        setForm({
          title: l.title,
          description: l.description,
          price: l.price,
          location: l.location,
          country: l.country,
          category: l.category
        });

        if (l.image?.url) {
          setOriginalImage(l.image.url);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.price || form.price <= 0) newErrors.price = "Valid price required";
    if (!form.location.trim()) newErrors.location = "Location required";
    if (!form.country.trim()) newErrors.country = "Country required";
    if (!form.category) newErrors.category = "Category required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(`listing[${key}]`, form[key]);
      });

      if (newImage) formData.append("image", newImage);

      await axiosInstance.put(`/listings/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate(`/listings/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update listing!");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">

          <div className="p-4 shadow-sm border rounded-4 bg-white">

            <h3 className="mb-4 text-center">Edit Your Listing</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* ✅ DISABLE CHROME VALIDATION */}
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
              </div>

              {/* CURRENT IMAGE */}
              <div className="mb-3">
                <label className="form-label d-block">Current Image</label>
                <img
                  src={originalImage}
                  alt="current"
                  className="img-fluid rounded mt-2"
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              </div>

              {/* NEW IMAGE */}
              <div className="mb-3">
                <label className="form-label">Upload New Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setNewImage(file);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </div>

              {/* PREVIEW */}
              {preview && (
                <img
                  src={preview}
                  className="img-fluid rounded mb-3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              {/* PRICE + COUNTRY */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    min="1"
                    className={`form-control ${errors.price ? "is-invalid" : form.price ? "is-valid" : ""}`}
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>

                <div className="col-md-8 mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className={`form-control ${errors.country ? "is-invalid" : form.country ? "is-valid" : ""}`}
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                  />
                  {errors.country && <div className="invalid-feedback">{errors.country}</div>}
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
              </div>

              {/* BUTTON */}
              <button className="btn btn-danger w-100 mt-3">
                Update Listing
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}