import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

function Navbar() {
    const {logout} = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogout =() => {
        logout(); 
        navigate("/login"); 
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">

            <Link 
                to="/dashboard"
                className="text-xl font-bold">
                    PrepForge
            </Link>

            <div className="flex items-center gap-6">

                <Link to="/questions">
                    Questions
                </Link>

                <button onClick={handleLogout}
                    className="border rounded-lg px-4 py-2 cursor-pointer">
                        Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar;