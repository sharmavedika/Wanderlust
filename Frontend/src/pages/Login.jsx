import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/login", form);
            login(res.data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed!");
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
                        Welcome<br />
                        <em>back.</em>
                    </h2>
                    <p className="auth-panel-sub">
                        Your next adventure is just a login away. Pick up where you left off.
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

                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-subtitle">Log in to continue your journey.</p>

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
                                placeholder="Your username"
                                required
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="Your password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading
                                ? <><i className="fa-solid fa-circle-notch fa-spin"></i> Logging in…</>
                                : "Log in"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account?{" "}
                        <Link to="/signup" className="auth-switch-link">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}