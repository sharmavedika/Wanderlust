import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { currUser, logout } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        if (search.trim()) {
            navigate(`/?search=${search.trim()}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top py-2 px-2 px-md-4">
            <div className="container-fluid">

                {/* MAIN NAVBAR WRAPPER */}
                <div className="d-flex align-items-center justify-content-between w-100 gap-2">

                    {/* LOGO */}
                    <Link
                        className="navbar-brand d-flex align-items-center gap-2 text-danger m-0"
                        to="/"
                    >
                        <i className="fa-regular fa-compass fs-3"></i>

                        {/* Hide text on small mobile */}
                        <span className="fw-bold d-none d-lg-inline">
                            wanderlust
                        </span>
                    </Link>

                    {/* SEARCH BAR */}
                    <div className="search-container flex-grow-1 d-flex justify-content-center">
                        <form
                            className="d-flex align-items-center border rounded-pill px-2 py-1 shadow-sm bg-white w-100"
                            style={{ maxWidth: "400px" }}
                            onSubmit={handleSearch}
                        >
                            <input
                                className="form-control border-0 shadow-none bg-transparent py-1 small"
                                type="search"
                                placeholder="Search destinations"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button
                                className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center p-0"
                                type="submit"
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    minWidth: "32px",
                                }}
                            >
                                <i
                                    className="fa-solid fa-magnifying-glass"
                                    style={{ fontSize: "0.75rem" }}
                                ></i>
                            </button>
                        </form>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="d-flex align-items-center gap-2">

                        {/* Hide on mobile */}
                        <Link
                            className="nav-link fw-semibold small d-none d-md-block"
                            to="/listings/new"
                        >
                            Wanderlust your home
                        </Link>

                        {/* PROFILE BOX */}
                        <div className="d-flex align-items-center gap-2 border rounded-pill px-2 py-1 bg-white shadow-sm">

                            {/* HAMBURGER */}
                            <i className="fa-solid fa-bars text-secondary"></i>

                            {/* USER ICON */}
                            <div
                                className="bg-secondary rounded-circle text-white d-flex align-items-center justify-content-center"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    minWidth: "30px",
                                }}
                            >
                                <i className="fa-solid fa-user fs-6"></i>
                            </div>

                            {/* AUTH LINKS */}
                            <div className="d-flex align-items-center gap-2 auth-links">

                                {!currUser ? (
                                    <>
                                        <Link
                                            className="text-decoration-none text-dark small fw-bold"
                                            to="/signup"
                                        >
                                            Sign up
                                        </Link>

                                        <Link
                                            className="text-decoration-none text-dark small fw-bold"
                                            to="/login"
                                        >
                                            Log in
                                        </Link>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-link p-0 text-decoration-none text-danger small fw-bold"
                                        onClick={logout}
                                    >
                                        Log out
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}