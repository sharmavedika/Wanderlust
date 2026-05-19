import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

// ⚠️ ADD THIS (you forgot import)
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

export default function ListingShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currUser } = useAuth();

    const [listing, setListing] = useState(null);
    const [review, setReview] = useState({ rating: 1, comment: "" });
    const [hover, setHover] = useState(0);
    const [error, setError] = useState("");

    const mapRef = useRef(null);

    // ✅ FETCH LISTING (FIXED ERROR HANDLING)
    useEffect(() => {
        if (!id) {
            console.log("❌ ID missing");
            return;
        }

        console.log("✅ ID 👉", id);

        axiosInstance.get(`/listings/${id}`)
            .then((res) => {
                console.log("DATA 👉", res.data);
                setListing(res.data.listing);
            })
            .catch((err) => {
                console.log("ERROR 👉", err.response?.data || err.message);
            });
    }, [id]);

    // ✅ MAP (SAFE INIT)
   useEffect(() => {
    if (!listing?.geometry?.coordinates || !mapRef.current) return;

    const map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [
            listing.geometry.coordinates[0],
            listing.geometry.coordinates[1],
        ],
        zoom: 9,
    });

        new mapboxgl.Marker()
            .setLngLat([
                listing.geometry.coordinates[0],
                listing.geometry.coordinates[1]
            ])
            .addTo(map);

        return () => map.remove();
    }, [listing]);

    // ✅ DELETE LISTING
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/listings/${id}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ ADD REVIEW
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        // ✅ FIXED VALIDATION
        if (!review.comment.trim() || review.rating === 0) {
            setError("Please select rating and write review!");
            return;
        }

        try {
            await axiosInstance.post(`/listings/${id}/reviews`, {
                review: {
                    rating: review.rating,
                    comment: review.comment,
                },
            });

            const res = await axiosInstance.get(`/listings/${id}`);
            setListing(res.data.listing);

            setReview({ rating: 0, comment: "" }); // also reset properly
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to submit review!");
        }
    };

    // ✅ DELETE REVIEW
    const handleReviewDelete = async (reviewId) => {
        try {
            await axiosInstance.delete(`/listings/${id}/reviews/${reviewId}`);

            const res = await axiosInstance.get(`/listings/${id}`);
            setListing(res.data.listing);
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ LOADING FIX
    if (!id) {
        return <h3 className="text-center mt-5 text-danger">Invalid Listing ID</h3>;
    }

    if (!listing) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    const isOwner = currUser && listing.owner?._id === currUser._id;

    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">

                    {/* TITLE */}
                    <h2 className="fw-semibold mb-3">{listing.title}</h2>

                    {/* IMAGE */}
                    <img
                        src={listing.image?.url}
                        alt="listing"
                        className="img-fluid rounded mb-3"
                        style={{ height: "400px", width: "100%", objectFit: "cover" }}
                    />

                    {/* DETAILS */}
                    <p className="text-muted">
                        Owned by{" "}
                        <span className="fw-semibold">
                            @{listing.owner?.username || "Anonymous"}
                        </span>
                    </p>

                    <p>{listing.description}</p>

                    <p className="fw-bold">₹{listing.price}</p>

                    <p className="text-muted">
                        {listing.location}
                        {!listing.location?.includes(listing.country) && `, ${listing.country}`}
                    </p>

                    {/* OWNER ACTIONS */}
                    {isOwner && (
                        <div className="mb-3">
                            <Link to={`/listings/${id}/edit`} className="btn btn-dark me-2">Edit</Link>
                            <button className="btn btn-dark" onClick={handleDelete}>Delete</button>
                        </div>
                    )}

                    {/* ================= REVIEW ================= */}

                    {/* ✅ SHOW FORM ONLY IF LOGGED IN */}
                    {currUser && (
                        <>
                            <h4>Leave a Review</h4>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleReviewSubmit}>

                                {/* ⭐ STARS */}
                                <div className="mb-3">
                                    <div className="starability-heartbeat">

                                        <input type="radio" id="rate1" name="rating" value="1" defaultChecked
                                            onChange={() => setReview({ ...review, rating: 1 })} />
                                        <label htmlFor="rate1" title="Terrible">1 star</label>

                                        <input type="radio" id="rate2" name="rating" value="2"
                                            onChange={() => setReview({ ...review, rating: 2 })} />
                                        <label htmlFor="rate2" title="Bad">2 stars</label>

                                        <input type="radio" id="rate3" name="rating" value="3"
                                            onChange={() => setReview({ ...review, rating: 3 })} />
                                        <label htmlFor="rate3" title="Okay">3 stars</label>

                                        <input type="radio" id="rate4" name="rating" value="4"
                                            onChange={() => setReview({ ...review, rating: 4 })} />
                                        <label htmlFor="rate4" title="Good">4 stars</label>

                                        <input type="radio" id="rate5" name="rating" value="5"
                                            onChange={() => setReview({ ...review, rating: 5 })} />
                                        <label htmlFor="rate5" title="Excellent">5 stars</label>

                                    </div>
                                </div>

                                <textarea
                                    className="form-control mb-3"
                                    placeholder="Write your review..."
                                    value={review.comment}
                                    onChange={(e) =>
                                        setReview({ ...review, comment: e.target.value })
                                    }
                                />

                                <button className="btn btn-danger">Submit Review</button>
                            </form>
                        </>
                    )}

                    {/* ✅ ALWAYS SHOW REVIEWS */}
                    <hr />
                    <h5>All Reviews</h5>

                    {listing.reviews?.length === 0 && (
                        <p>No reviews yet</p>
                    )}

                    <div className="row">
                        {listing.reviews?.map((rev) => (
                            <div key={rev._id} className="col-md-6 mb-3">
                                <div className="card p-3">

                                    <h6>@{rev.author?.username || "Anonymous"}</h6>

                                    {/* ⭐ DISPLAY STARS */}
                                    <div>
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    color: i < rev.rating ? "#fe424d" : "#ccc",
                                                    fontSize: "1.2rem"
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <p>{rev.comment}</p>

                                    {currUser && rev.author?._id === currUser._id && (
                                        <button
                                            className="btn btn-sm btn-dark"
                                            onClick={() => handleReviewDelete(rev._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MAP */}
                    <h4 className="mt-4">Where you'll be</h4>
                    <div
                        ref={mapRef}
                        style={{
                            height: "300px",
                            borderRadius: "15px",
                            overflow: "hidden"
                        }}
                    ></div>

                </div>
            </div>
        </div>
    );
}