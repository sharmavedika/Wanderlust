import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import "./Signup.css";

export default function Signup() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // HANDLE SIGNUP
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axiosInstance.post(
                "/auth/signup",
                form
            );

            login(res.data.user);

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.error || "Signup failed!"
            );
        }
    };

    return (
        <div className="signup-page">

            <div className="signup-container">

                {/* SIGNUP CARD */}
                <div className="signup-card">

                    {/* TITLE */}
                    <h1 className="signup-title">
                        Sign Up
                    </h1>

                    {/* ERROR */}
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>

                        {/* USERNAME */}
                        <div className="mb-3">

                            <label className="form-label signup-label">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                className="form-control signup-input"
                                placeholder="Enter username"
                                required
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="mb-3">

                            <label className="form-label signup-label">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control signup-input"
                                placeholder="Enter email"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-4">

                            <label className="form-label signup-label">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                className="form-control signup-input"
                                placeholder="Enter password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="btn btn-success signup-btn"
                        >
                            Sign Up
                        </button>

                        {/* LOGIN LINK */}
                        <div className="login-section">

                            <p className="login-text">
                                Already have an account?
                            </p>

                            <Link
                                to="/login"
                                className="login-link"
                            >
                                Log in
                            </Link>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}