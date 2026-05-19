import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
    const [form, setForm] = useState({
        username: "",
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

    // HANDLE LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post("/auth/login", form);

            login(res.data.user);

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed!");
        }
    };

    return (
        <div className="login-page">

            <div className="login-container">

                {/* LOGIN CARD */}
                <div className="login-card">

                    {/* TITLE */}
                    <h1 className="login-title">
                        Login
                    </h1>

                    {/* ERROR MESSAGE */}
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>

                        {/* USERNAME */}
                        <div className="mb-3">
                            <label className="form-label login-label">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                className="form-control login-input"
                                placeholder="Enter username"
                                required
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-4">
                            <label className="form-label login-label">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                className="form-control login-input"
                                placeholder="Enter password"
                                required
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            className="btn btn-success login-btn"
                        >
                            Login
                        </button>

                        {/* SIGNUP LINK */}
                        <div className="signup-section">

                            <p className="signup-text">
                                Don't have an account?
                            </p>

                            <Link
                                to="/signup"
                                className="signup-link"
                            >
                                Sign up
                            </Link>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}