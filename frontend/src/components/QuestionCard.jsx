import { useNavigate } from "react-router-dom";
import api from "../services/api";

function QuestionCard({ question, onDelete }) {
    const navigate = useNavigate();

    const difficultyStyles = {
        EASY: "text-[#7A9471] bg-[#7A9471]/10 border-[#7A9471]/20",
        MEDIUM: "text-[#C9A15A] bg-[#C9A15A]/10 border-[#C9A15A]/20",
        HARD: "text-[#A8493E] bg-[#A8493E]/10 border-[#A8493E]/20"
    };

    const statusStyles = {
        SOLVED: "text-[#7A9471]",
        UNSOLVED: "text-[#8A8D93]"
    };

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
        <div className="
            group
            border border-[#24272B]
            bg-gradient-to-br from-[#151719] to-[#101214]
            rounded-xl
            p-6
            transition-all duration-200
            hover:border-[#34373C]
        ">

            {/* Top row */}
            <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                    <span
                        className={`
                            text-xs font-medium
                            px-2.5 py-1
                            rounded-md
                            border
                            ${difficultyStyles[question.difficulty]}
                        `}
                    >
                        {question.difficulty}
                    </span>

                    <span className="text-sm text-[#686A70]">
                        {question.platform}
                    </span>
                </div>

                <span
                    className={`text-sm ${statusStyles[question.status]}`}
                >
                    {question.status === "SOLVED"
                        ? "Solved"
                        : "Unsolved"}
                </span>
            </div>

            {/* Title */}
            <h2 className="
                text-xl
                font-semibold
                text-[#F2F2F2]
                mt-5
                tracking-tight
            ">
                {question.title}
            </h2>

            {/* Topic */}
            <p className="text-sm text-[#8A8D93] mt-2">
                {question.topic}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">

                <button
                    onClick={() =>
                        navigate(`/questions/${question.id}`)
                    }
                    className="
                        bg-[#F2F2F2]
                        text-[#08090A]
                        rounded-lg
                        px-4 py-2
                        text-sm
                        font-medium
                        transition-all duration-200
                        hover:bg-white
                    "
                >
                    Open →
                </button>

                <button
                    onClick={() =>
                        navigate(`/questions/edit/${question.id}`)
                    }
                    className="
                        border border-[#2A2D32]
                        text-[#B0B2B7]
                        rounded-lg
                        px-4 py-2
                        text-sm
                        transition-all duration-200
                        hover:border-[#41444A]
                        hover:text-[#F2F2F2]
                    "
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="
                        border border-[#2A2D32]
                        text-[#B0B2B7]
                        rounded-lg
                        px-4 py-2
                        text-sm
                        transition-all duration-200
                        hover:border-[#A8493E]
                        hover:text-[#D9827A]
                    "
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default QuestionCard;