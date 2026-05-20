import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { currUser, logout } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/?search=${search.trim()}`);
            setSearchOpen(false);
            setSearch("");
        }
    };

    return (
        <>
            <nav className="wl-navbar">
                <div className="wl-nav-inner">

                    {/* ── LOGO ── */}
                    <Link className="wl-logo" to="/">
                        <i className="fa-regular fa-compass"></i>
                        <span className="wl-logo-text">wanderlust</span>
                    </Link>

                    {/* ── SEARCH BAR (desktop) ── */}
                    <form className="wl-search-form" onSubmit={handleSearch}>
                        <input
                            className="wl-search-input"
                            type="search"
                            placeholder="Search destinations"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="wl-search-btn" type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>

                    {/* ── RIGHT SECTION ── */}
                    <div className="wl-nav-right">

                        {/* Host link */}
                        <Link className="wl-host-link" to="/listings/new">
                            Host
                        </Link>

                        {/* Search icon — mobile only */}
                        <button
                            className="wl-search-icon-btn"
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Search"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                        {/* USER PILL — no hamburger */}
                        <div className="wl-user-pill">
                            <div className="wl-avatar">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="wl-auth-links">
                                {!currUser ? (
                                    <>
                                        <Link className="wl-auth-btn" to="/signup">Sign up</Link>
                                        <Link className="wl-auth-btn" to="/login">Log in</Link>
                                    </>
                                ) : (
                                    <button className="wl-auth-btn wl-logout-btn" onClick={logout}>
                                        Log out
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            {/* MOBILE SEARCH DROPDOWN */}
            {searchOpen && (
                <div className="wl-mobile-search">
                    <form className="wl-mobile-search-form" onSubmit={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass wl-mobile-search-icon"></i>
                        <input
                            className="wl-mobile-search-input"
                            type="search"
                            placeholder="Search destinations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                        <button className="wl-search-btn" type="submit">
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}