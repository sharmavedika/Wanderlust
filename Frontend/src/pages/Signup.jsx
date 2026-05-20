import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/signup", form);
            login(res.data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* Left panel — decorative */}
            <div className="auth-panel">
                <div className="auth-panel-inner">
                    <Link to="/" className="auth-panel-logo">
                        <i className="fa-regular fa-compass"></i>
                        wanderlust
                    </Link>
                    <h2 className="auth-panel-headline">
                        Discover your next<br />
                        <em>great escape.</em>
                    </h2>
                    <p className="auth-panel-sub">
                        Join thousands of travellers exploring the world's most beautiful stays.
                    </p>
                    <div className="auth-panel-badges">
                        {["🏔️ Mountains", "🏰 Castles", "🌊 Beachside", "🔥 Trending"].map(b => (
                            <span key={b} className="auth-badge">{b}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="auth-form-side">
                <div className="auth-card">

                    {/* Mobile logo */}
                    <Link to="/" className="auth-mobile-logo">
                        <i className="fa-regular fa-compass"></i>
                        wanderlust
                    </Link>

                    <h1 className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Start exploring in seconds.</p>

                    {error && (
                        <div className="auth-error">
                            <i className="fa-solid fa-circle-exclamation"></i> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-field">
                            <label className="auth-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="auth-input"
                                placeholder="e.g. traveller_vedika"
                                required
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="you@example.com"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="Create a strong password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading
                                ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Creating account…</>
                                : "Create account"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/login" className="auth-switch-link">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}