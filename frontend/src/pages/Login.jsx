import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/PageTransition";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/users/login", formData);

            login(response.data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <PageTransition>
        
        <div className="min-h-screen bg-[#08090A] flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {/* Brand */}
                <div className="text-center mb-10">
                    <Link
                        to="/login"
                        className="text-2xl font-semibold tracking-tight text-[#F2F2F2]"
                    >
                        PrepForge
                    </Link>

                    <p className="text-sm text-[#686A70] mt-3">
                        Your interview preparation workspace.
                    </p>
                </div>

                {/* Form */}
                <div className="
                    border
                    border-[#24272B]
                    bg-gradient-to-br
                    from-[#151719]
                    to-[#101214]
                    rounded-xl
                    p-6
                    md:p-8
                ">

                    <div className="mb-7">
                        <h1 className="
                            text-xl
                            font-semibold
                            text-[#F2F2F2]
                        ">
                            Welcome back
                        </h1>

                        <p className="
                            text-sm
                            text-[#686A70]
                            mt-2
                        ">
                            Sign in to continue your preparation.
                        </p>
                    </div>

                    {error && (
                        <div className="
                            border
                            border-[#A8493E]/30
                            bg-[#A8493E]/5
                            rounded-lg
                            px-4
                            py-3
                            mb-5
                        ">
                            <div className="
                                    border
                                    border-[#A8493E]/30
                                    bg-[#A8493E]/5
                                    rounded-lg
                                    px-4
                                    py-3
                                ">
                                    <p className="text-sm text-[#C97870]">
                                        {error}
                                    </p>
                                </div>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <FormField label="Email">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="input"
                            />
                        </FormField>

                        <FormField label="Password">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="input"
                            />
                        </FormField>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                bg-[#F2F2F2]
                                text-[#08090A]
                                rounded-lg
                                px-5
                                py-3
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                hover:bg-white
                                disabled:opacity-50
                            "
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>

                    <div className="
                        border-t
                        border-[#24272B]
                        mt-6
                        pt-6
                        text-center
                    ">
                        <p className="text-sm text-[#686A70]">
                            Don't have an account?
                        </p>

                        <Link
                            to="/register"
                            className="
                                inline-block
                                text-sm
                                text-[#D4D4D8]
                                mt-2
                                hover:text-white
                                transition-colors
                            "
                        >
                            Create an account →
                        </Link>
                    </div>

                </div>

            </div>
        </div>

        </PageTransition>
    );
}

function FormField({ label, children }) {
    return (
        <div>
            <label className="
                block
                text-sm
                font-medium
                text-[#D4D4D8]
                mb-2
            ">
                {label}
            </label>

            {children}
        </div>
    );
}

export default Login;