import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProgressSection from "../components/ProgressSection";
import NotesSection from "../components/NoteSection";
import api from "../services/api";
import PageTransition from "../components/PageTransition";
import LoadingState from "../components/LoadingState";

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
    return (
        <div className="min-h-screen bg-[#08090A]">
            <Navbar />
            <LoadingState />
        </div>
    );
}

    if (error) {
        return (
            <div className="min-h-screen bg-[#08090A]">
                <Navbar />

                <main className="max-w-5xl mx-auto px-6 py-12">
                    <div className="
                        border border-[#24272B]
                        bg-[#101214]
                        rounded-xl
                        p-8
                    ">
                        <div className="
                                border
                                border-[#A8493E]/30
                                bg-[#A8493E]/5
                                rounded-lg
                                px-4
                                py-3
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
                    </div>
                </main>
            </div>
        );
    }

    if (!question) {
        return null;
    }

    const difficultyStyles = {
        EASY: "text-[#7A9471] bg-[#7A9471]/10 border-[#7A9471]/20",
        MEDIUM: "text-[#C9A15A] bg-[#C9A15A]/10 border-[#C9A15A]/20",
        HARD: "text-[#A8493E] bg-[#A8493E]/10 border-[#A8493E]/20"
    };

    return (

        <PageTransition>
        <div className="min-h-screen bg-[#08090A]">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-12">

                {/* Back */}
                <button
                    onClick={() => navigate("/questions")}
                    className="
                        text-sm
                        text-[#686A70]
                        hover:text-[#F2F2F2]
                        transition-colors duration-200
                        mb-8
                    "
                >
                    ← Back to questions
                </button>

                {/* Question */}
                <section className="
                    border border-[#24272B]
                    bg-gradient-to-br
                    from-[#16181B]
                    to-[#101214]
                    rounded-xl
                    p-6
                    md:p-8
                ">

                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-start
                        md:justify-between
                        gap-5
                    ">

                        <div>
                            <div className="flex items-center gap-3 mb-4">

                                <span
                                    className={`
                                        text-xs
                                        font-medium
                                        px-2.5
                                        py-1
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

                            <h1 className="
                                text-3xl
                                md:text-4xl
                                font-semibold
                                tracking-tight
                                text-[#F2F2F2]
                            ">
                                {question.title}
                            </h1>

                            <p className="
                                text-sm
                                text-[#8A8D93]
                                mt-3
                            ">
                                Topic · {question.topic}
                            </p>
                        </div>

                        <span className={`
                            text-sm
                            ${
                                question.status === "SOLVED"
                                    ? "text-[#7A9471]"
                                    : "text-[#686A70]"
                            }
                        `}>
                            {question.status === "SOLVED"
                                ? "● Solved"
                                : "○ Unsolved"}
                        </span>

                    </div>

                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        mt-8
                        pt-6
                        border-t
                        border-[#24272B]
                    ">

                    <a
                        href={question.link}
                        target="_blank"
                        rel="noreferrer"
                        className="
                            inline-flex
                            items-center
                            bg-[#B8AA8A]
                            text-[#0B0C0E]
                            rounded-lg
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            transition-all
                            duration-200
                            hover:bg-[#C8BA9A]
                            "
                        >
                            Open Problem →
                        </a>

                        <button
                            onClick={() =>
                                navigate(`/questions/edit/${question.id}`)
                            }
                            className="
                                border border-[#2A2D32]
                                text-[#B0B2B7]
                                rounded-lg
                                px-5
                                py-2.5
                                text-sm
                                transition-colors duration-200
                                hover:border-[#41444A]
                                hover:text-[#F2F2F2]
                            "
                        >
                            Edit
                        </button>

                    </div>

                </section>

                {/* Progress */}
                <ProgressSection questionId={id} />

                {/* Notes */}
                <NotesSection questionId={id} />

            </main>
        </div>

        </PageTransition>
    );
}

export default QuestionDetails;