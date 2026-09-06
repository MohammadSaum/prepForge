import { useState } from "react"
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "", email: "", password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setError("");
        setLoading(true); 

        try {
            await api.post("/users/register", formData); 

            navigate("/login"); 
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed"); 
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-amber-400'>
        <div className='w-full max-w-md'>

            <h1 className='text-3xl font-bold text-center mb-8'>
                Create your Prepforge account
            </h1>

            <form onSubmit={handleSubmit} className='space-y-4'>

                    <input 
                        type="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    /> 

                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    /> 

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    {error && (
                        <p className="text-red-500 text-sms">{error}</p>
                    )}

                    <button type="submit" disable={loading} className="w-full bg-black text-white rounded-lg p-3 cursor-pointer">{loading ? "Creting account" : "Register"}</button>
            </form>

            <p
                className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to ="/login"
                        className="underline">
                        Login
                    </Link>
                </p>
            
        </div>
    </div>
  )
}

export default Register
