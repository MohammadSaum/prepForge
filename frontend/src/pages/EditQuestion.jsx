import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        difficulty: "EASY",
        platform: "",
        topic: "",
        link: "",
        status: "UNSOLVED"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await api.get(`/questions/${id}`);
                setFormData(response.data);
            } catch (error) {
                setError("Failed to load question");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSaving(true);

        try {
            await api.put(`/questions/${id}`, formData);

            navigate("/questions");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update question"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p>Loading</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Edit Question
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
                        disabled={saving}
                        className="border rounded-lg px-5 py-2 disabled:opacity-50"
                    >
                        {saving ? "Saving" : "Save Changes"}
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
    );
}

export default EditQuestion;