import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { currUser, logout } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) navigate(`/?search=${search.trim()}`);
    };

    return (
        <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top py-2 px-1 px-md-4">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                
                {/* 1. BRAND/LOGO */}
                <Link className="navbar-brand d-flex align-items-center gap-2 text-danger" to="/">
                    <i className="fa-regular fa-compass fs-3"></i>
                    <span className="fw-bold d-none d-lg-inline tracking-tighter">wanderlust</span>
                </Link>

                {/* 2. SEARCH PILL (Centered) */}
                <div className="search-container flex-grow-1 d-flex justify-content-center px-3">
                    <form 
                        className="d-flex align-items-center border rounded-pill px-3 py-1 shadow-sm hover-shadow transition-all w-100" 
                        style={{ maxWidth: '400px' }}
                        onSubmit={handleSearch}
                    >
                        <input
                            className="form-control border-0 shadow-none bg-transparent py-1"
                            type="search"
                            placeholder="Search destinations"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-danger rounded-circle p-2 d-flex align-items-center justify-content-center" type="submit" style={{ width: '32px', height: '32px' }}>
                            <i className="fa-solid fa-magnifying-glass fs-xs" style={{ fontSize: '0.75rem' }}></i>
                        </button>
                    </form>
                </div>

                {/* 3. USER NAVIGATION */}
                <div className="d-flex align-items-center gap-3">
                    <Link className="nav-link fw-semibold d-none d-md-block small" to="/listings/new">
                        Wanderlust your home
                    </Link>

                    {/* Profile Dropdown Simulation */}
                    <div className="d-flex align-items-center gap-2 border rounded-pill px-2 py-1 hover-shadow transition-all pointer bg-white">
                        <i className="fa-solid fa-bars ms-1 text-secondary"></i>
                        <div className="bg-secondary rounded-circle text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                            <i className="fa-solid fa-user fs-6"></i>
                        </div>
                        
                        {/* Auth Links */}
                        <div className="ms-2 d-none d-sm-flex gap-2">
                            {!currUser ? (
                                <>
                                    <Link className="text-decoration-none text-dark small fw-bold" to="/signup">Sign up</Link>
                                    <Link className="text-decoration-none text-dark small fw-bold" to="/login">Log in</Link>
                                </>
                            ) : (
                                <button className="btn btn-link p-0 text-decoration-none text-danger small fw-bold" onClick={logout}>
                                    Log out
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}