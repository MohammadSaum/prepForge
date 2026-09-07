import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

const AddQuestion = () => {

    const [formData, setFormData] = useState({
        title:"",
        difficulty:"",
        platform: "",
        topic: "",
        link: "",
        status: "UNSOLVED"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange =(e) => {
        setFormData({...formData, [e.target.name]: e.target.value}); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setError("");
        setLoading(true); 

        try {
            await api.post("/questions", formData);

            navigate("/questions"); 
        } catch (e) {
            setError(e.response?.data?.message || "Failed to add question"); 
        } finally {
            setLoading(false); 
        }
    }

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">
            Add Question
        </h1>

        {error && (
            <p className="text-red-500 mb-4">
                {error}
            </p>
        )}

        <form
            onSubmit={handleSubmit}
            className="max-w-xl space-y-4"
        >
            
            <input 
                type="text"
                name="title"
                placeholder="Question title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border rounded-lg p-3 w-full"
            /> 

            <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
            </select>

            <input
                    type="text"
                    name="platform"
                    placeholder="Platform"
                    value={formData.platform}
                    onChange={handleChange}
                    required
                    className="border rounded-lg p-3 w-full"
            />

            <input
                    type="text"
                    name="topic"
                    placeholder="Topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className="border rounded-lg p-3 w-full"
            />

            <input
                    type="url"
                    name="link"
                    placeholder="Question link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                    className="border rounded-lg p-3 w-full"
            />

            <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
            >
                    <option value="UNSOLVED">Unsolved</option>
                    <option value="SOLVED">Solved</option>
            </select>

            <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="border rounded-lg px-5 py-2 disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add Question"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/questions")}
                        className="border rounded-lg px-5 py-2"
                    >
                        Cancel
                    </button>
            </div>

        </form>
    </div>
)
}

export default AddQuestion;