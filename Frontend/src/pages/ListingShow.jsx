import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

export default function ListingShow() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { currUser } = useAuth();

    const [listing, setListing] = useState(null);

    const [review, setReview] = useState({
        rating: 1,
        comment: "",
    });

    const [error, setError] = useState("");

    const mapRef = useRef(null);

    /* ================= FETCH LISTING ================= */

    useEffect(() => {

        if (!id) return;

        axiosInstance
            .get(`/listings/${id}`)
            .then((res) => {
                setListing(res.data.listing);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [id]);

    /* ================= MAP ================= */

    useEffect(() => {

        if (
            !listing?.geometry?.coordinates ||
            !mapRef.current
        ) return;

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
                listing.geometry.coordinates[1],
            ])
            .addTo(map);

        return () => map.remove();

    }, [listing]);

    /* ================= DELETE LISTING ================= */

    const handleDelete = async () => {

        try {

            await axiosInstance.delete(`/listings/${id}`);

            navigate("/");

        } catch (err) {
            console.log(err);
        }
    };

    /* ================= SUBMIT REVIEW ================= */

    const handleReviewSubmit = async (e) => {

        e.preventDefault();

        if (!review.comment.trim()) {
            setError("Please write a review!");
            return;
        }

        try {

            await axiosInstance.post(
                `/listings/${id}/reviews`,
                {
                    review: {
                        rating: review.rating,
                        comment: review.comment,
                    },
                }
            );

            const res = await axiosInstance.get(`/listings/${id}`);

            setListing(res.data.listing);

            setReview({
                rating: 1,
                comment: "",
            });

            setError("");

        } catch (err) {

            setError(
                err.response?.data?.error ||
                "Failed to submit review!"
            );
        }
    };

    /* ================= DELETE REVIEW ================= */

    const handleReviewDelete = async (reviewId) => {

        try {

            await axiosInstance.delete(
                `/listings/${id}/reviews/${reviewId}`
            );

            const res = await axiosInstance.get(`/listings/${id}`);

            setListing(res.data.listing);

        } catch (err) {
            console.log(err);
        }
    };

    /* ================= LOADING ================= */

    if (!listing) {
        return (
            <h3 className="text-center mt-5">
                Loading...
            </h3>
        );
    }

    const isOwner =
        currUser &&
        listing.owner?._id === currUser._id;

    return (

        <div className="container mt-4 mb-5">

            <div className="row justify-content-center">

                <div className="col-lg-8 col-md-10">

                    {/* TITLE */}

                    <h2 className="fw-bold mb-3">
                        {listing.title}
                    </h2>

                    {/* IMAGE */}

                    <img
                        src={listing.image?.url}
                        alt="listing"
                        className="img-fluid rounded-4 mb-4"
                        style={{
                            height: "450px",
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />

                    {/* DETAILS */}

                    <p className="text-muted">
                        Hosted by{" "}
                        <span className="fw-semibold">
                            @{listing.owner?.username || "Anonymous"}
                        </span>
                    </p>

                    <p>{listing.description}</p>

                    <h5 className="fw-bold">
                        ₹{listing.price?.toLocaleString("en-IN")} / night
                    </h5>

                    <p className="text-muted">
                        {listing.location}, {listing.country}
                    </p>

                    {/* OWNER BUTTONS */}

                    {isOwner && (

                        <div className="mb-4">

                            <Link
                                to={`/listings/${id}/edit`}
                                className="btn btn-dark me-2"
                            >
                                Edit
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>

                        </div>
                    )}

                    {/* REVIEW FORM */}

                    {currUser && (

                        <>

                            <hr />

                            <h4 className="mb-3">
                                Leave a Review
                            </h4>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleReviewSubmit}>

                                {/* STARS */}

                                <div className="mb-3">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <button
                                            type="button"
                                            key={star}
                                            className="btn p-0 me-1"
                                            onClick={() =>
                                                setReview({
                                                    ...review,
                                                    rating: star,
                                                })
                                            }
                                        >
                                            <span
                                                style={{
                                                    fontSize: "2rem",
                                                    color:
                                                        star <= review.rating
                                                            ? "#fe424d"
                                                            : "#ccc",
                                                }}
                                            >
                                                ★
                                            </span>
                                        </button>

                                    ))}

                                </div>

                                <textarea
                                    className="form-control mb-3"
                                    rows="4"
                                    placeholder="Write your review..."
                                    value={review.comment}
                                    onChange={(e) =>
                                        setReview({
                                            ...review,
                                            comment: e.target.value,
                                        })
                                    }
                                />

                                <button className="btn btn-danger">
                                    Submit Review
                                </button>

                            </form>

                        </>
                    )}

                    {/* REVIEWS */}

                    <hr className="my-4" />

                    <h4 className="mb-4">
                        All Reviews
                    </h4>

                    {listing.reviews?.length === 0 && (
                        <p>No reviews yet.</p>
                    )}

                    <div className="row">

                        {listing.reviews?.map((rev) => (

                            <div
                                key={rev._id}
                                className="col-md-6 mb-4"
                            >

                                <div className="card border-0 shadow-sm rounded-4 h-100 p-3">

                                    <h6 className="fw-bold">
                                        @{rev.author?.username || "Anonymous"}
                                    </h6>

                                    <div className="mb-2">

                                        {[...Array(5)].map((_, i) => (

                                            <span
                                                key={i}
                                                style={{
                                                    color:
                                                        i < rev.rating
                                                            ? "#fe424d"
                                                            : "#ccc",
                                                    fontSize: "1.2rem",
                                                }}
                                            >
                                                ★
                                            </span>

                                        ))}

                                    </div>

                                    <p>{rev.comment}</p>

                                    {currUser &&
                                        rev.author?._id === currUser._id && (

                                            <button
                                                className="btn btn-sm btn-dark"
                                                onClick={() =>
                                                    handleReviewDelete(rev._id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        )}

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* MAP */}

                    <hr className="my-4" />

                    <h4 className="mb-3">
                        Where you'll be
                    </h4>

                    <div
                        ref={mapRef}
                        style={{
                            height: "350px",
                            width: "100%",
                            borderRadius: "20px",
                            overflow: "hidden",
                        }}
                    ></div>

                </div>

            </div>

        </div>
    );
}