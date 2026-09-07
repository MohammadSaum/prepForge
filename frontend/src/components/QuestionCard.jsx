import { useNavigate } from "react-router-dom";
import api from "../services/api";

function QuestionCard({ question, onDelete }) {

    const navigate = useNavigate(); 

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/questions/${question.id}`);
            onDelete(question.id);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete question"
            );
        }
    };

    return (
        <div className="border rounded-xl p-5">

            <h2 className="text-xl font-semibold">
                {question.title}
            </h2>

            <div className="flex gap-4 mt-3 text-sm text-gray-500">

                <span>
                    {question.difficulty}
                </span>

                <span>
                    {question.platform}
                </span>

                <span>
                    {question.topic}
                </span>

                <span>
                    {question.status}
                </span>

            </div>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={() =>
                        navigate(`/questions/edit/${question.id}`)
                    }
                    className="border rounded-lg px-4 py-2 cursor-pointer"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="border rounded-lg px-4 py-2 cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuestionCard;