import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const categories = [
    { name: "Trending", value: "trending", icon: "fa-solid fa-fire" },
    { name: "Rooms", value: "rooms", icon: "fa-solid fa-bed" },
    { name: "Iconic Cities", value: "iconic-cities", icon: "fa-solid fa-city" },
    { name: "Mountains", value: "mountains", icon: "fa-solid fa-mountain" },
    { name: "Castles", value: "castles", icon: "fa-brands fa-fort-awesome" },
    { name: "Amazing Pools", value: "pools", icon: "fa-solid fa-person-swimming" },
    { name: "Camping", value: "camping", icon: "fa-solid fa-campground" },
    { name: "Farms", value: "farms", icon: "fa-solid fa-cow" },
    { name: "Arctic", value: "arctic", icon: "fa-solid fa-snowman" },
    { name: "Domes", value: "domes", icon: "fa-solid fa-landmark-dome" },
];

export default function Home() {
    const [listings, setListings] = useState([]);
    const [showTax, setShowTax] = useState(false);
    const [activeCategory, setActiveCategory] = useState("trending");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get("category") || "trending";
        const search = params.get("search") || "";

        setActiveCategory(category);

        const query = search
            ? `/listings?search=${search}`
            : `/listings?category=${category}`;

        axiosInstance.get(query)
            .then((res) => setListings(res.data.allListings))
            .catch((err) => console.log(err));
    }, [location.search]);

    return (
        <>
            {/* Filters */}
            <div id="filters" className="mt-3 d-flex align-items-center">

                {/* Filters row */}
                <div className="filters-row d-flex justify-content-between flex-grow-1">

                    {categories.map((cat) => (
                        <Link
                            to={`/?category=${cat.value}`}
                            key={cat.value}
                            className={`filter text-center text-decoration-none ${activeCategory === cat.value ? "active-filter" : ""}`}
                        >
                            <div><i className={cat.icon}></i></div>
                            <p>{cat.name}</p>
                        </Link>
                    ))}

                </div>

                {/* Tax toggle */}
                <div className={`tax-toggle ms-3 ${showTax ? "active" : ""}`}>
                    <div className="form-check form-switch mb-0 d-flex align-items-center">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            role="switch"
                            id="taxSwitch"
                            checked={showTax}
                            onChange={() => setShowTax(!showTax)}
                        />
                        <label className="form-check-label mb-0 fw-medium" htmlFor="taxSwitch">
                            Display total after taxes
                        </label>
                    </div>
                </div>

            </div>

            {/* Listings Grid */}
            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4 mt-3 mb-5">
                {listings.length === 0 && (
                    <p className="text-muted mt-3">No listings found.</p>
                )}
                {listings.map((listing) => (
                    <Link
                        to={`/listings/${listing._id}`}
                        key={listing._id}
                        className="col text-decoration-none text-dark"
                    >
                        <div className="card listing-card h-100">
                            <img
                                src={listing.image?.url}
                                className="card-img-top"
                                alt="listing"
                                style={{ height: "20rem", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <p className="card-text">
                                    <b>{listing.title}</b><br />
                                    &#8377;{listing.price?.toLocaleString("en-IN")} / night
                                    {showTax && (
                                        <i>&nbsp;&nbsp;+18% GST</i>
                                    )}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}