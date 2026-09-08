import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ProgressSection from "../components/ProgressSection";
import NoteSection from "../components/NoteSection";

function QuestionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await api.get(`/questions/${id}`);
                setQuestion(response.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load question"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

    if (loading) {
        return <p>Loading</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!question) {
        return <p>Question not found.</p>;
    }

    return (
        <div>
            <button
                onClick={() => navigate("/questions")}
                className="border rounded-lg px-4 py-2 mb-6 cursor-pointer"
            >
                ← Back
            </button>

            <div className="border rounded-xl p-6">
                <h1 className="text-3xl font-bold">
                    {question.title}
                </h1>

                <div className="flex gap-4 mt-4 text-sm text-gray-500">
                    <span>{question.difficulty}</span>
                    <span>{question.platform}</span>
                    <span>{question.topic}</span>
                    <span>{question.status}</span>
                </div>

                <a
                    href={question.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-6 underline"
                >
                    Open Problem
                </a>
            </div>

            <ProgressSection questionId={id} />
            <NoteSection questionId={id}/>
        </div>
    );
}

export default QuestionDetails;