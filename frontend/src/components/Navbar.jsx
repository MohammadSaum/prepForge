import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="
            border-b
            border-[#24272B]
            bg-[#0B0C0E]
        ">
            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-4
                flex
                items-center
                justify-between
            ">

                {/* Logo */}
                <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-[#F2F2F2]
                    "
                >
                    PrepForge
                </Link>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-1">

                    <Link
                        to="/dashboard"
                        className={`
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            transition-colors
                            duration-200
                            ${
                                isActive("/dashboard")
                                    ? "bg-[#16181B] text-[#F2F2F2]"
                                    : "text-[#A1A1AA] hover:text-[#F2F2F2]"
                            }
                        `}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/questions"
                        className={`
                            px-4
                            py-2
                            rounded-lg
                            text-sm
                            transition-colors
                            duration-200
                            ${
                                isActive("/questions")
                                    ? "bg-[#16181B] text-[#F2F2F2]"
                                    : "text-[#A1A1AA] hover:text-[#F2F2F2]"
                            }
                        `}
                    >
                        Questions
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="
                            ml-3
                            border
                            border-[#24272B]
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            text-[#A1A1AA]
                            transition-colors
                            duration-200
                            hover:text-[#F2F2F2]
                            hover:border-[#34373C]
                        "
                    >
                        Logout
                    </button>

                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="
                        md:hidden
                        border
                        border-[#24272B]
                        rounded-lg
                        p-2
                        text-[#A1A1AA]
                        hover:text-[#F2F2F2]
                    "
                    aria-label="Toggle navigation menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </div>

            {/* Mobile navigation */}
            {menuOpen && (
                <div className="
                    md:hidden
                    border-t
                    border-[#24272B]
                    px-6
                    py-4
                    space-y-2
                ">

                    <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className={`
                            block
                            px-4
                            py-3
                            rounded-lg
                            text-sm
                            ${
                                isActive("/dashboard")
                                    ? "bg-[#16181B] text-[#F2F2F2]"
                                    : "text-[#A1A1AA]"
                            }
                        `}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/questions"
                        onClick={closeMenu}
                        className={`
                            block
                            px-4
                            py-3
                            rounded-lg
                            text-sm
                            ${
                                isActive("/questions")
                                    ? "bg-[#16181B] text-[#F2F2F2]"
                                    : "text-[#A1A1AA]"
                            }
                        `}
                    >
                        Questions
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="
                            w-full
                            text-left
                            px-4
                            py-3
                            rounded-lg
                            text-sm
                            text-[#A1A1AA]
                            hover:text-[#F2F2F2]
                        "
                    >
                        Logout
                    </button>

                </div>
            )}
        </nav>
    );
}

export default Navbar;