import api from "../services/api";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import FilterBar from "../components/FilterBar";
import Pagination from"../components/Pagination"; 
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import LoadingState from "../components/LoadingState";

function Questions() {

    const navigate = useNavigate(); 

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(""); 

    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);

    const handleTopicChange = (value) => {
        setTopic(value);
        setCurrentPage(0);
    };

    const handleDifficultyChange = (value) => {
        setDifficulty(value);
        setCurrentPage(0);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setCurrentPage(0);
    };

    useEffect(() => {

    const fetchQuestions = async () => {

        try {
            const response = await api.get("/questions/page", {
                params: {
                    page: currentPage,
                    size: pageSize,
                    topic: topic || undefined,
                    difficulty: difficulty || undefined,
                    status: status || undefined
                }
            });

            setQuestions(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            setError("Failed to load questions");

        } finally {
            setLoading(false);
        }
    };

    fetchQuestions();

}, [currentPage, pageSize, topic, difficulty, status]);

    if (loading) {
    return (
        <div className="min-h-screen bg-[#08090A]">
            <Navbar />
            <LoadingState />
        </div>
    );
}

    if(error) {
        return <p className="p-6">
            {error}
        </p>
    }

    return (
        <PageTransition>
    <div className="min-h-screen bg-[#08090A]">

        <Navbar />

        <main className="max-w-6xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="
                flex
                flex-col
                md:flex-row
                md:items-end
                md:justify-between
                gap-6
                mb-10
            ">

                <div>
                    <p className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-[#686A70]
                        mb-3
                    ">
                        Interview preparation
                    </p>

                    <h1 className="
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-[#F2F2F2]
                    ">
                        Questions
                    </h1>

                    <p className="
                        text-[#8A8D93]
                        mt-3
                        text-sm
                    ">
                        Manage and track your interview questions.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/questions/add")}
                    className="
                        bg-[#F2F2F2]
                        text-[#08090A]
                        rounded-lg
                        px-5 py-2.5
                        text-sm
                        font-medium
                        transition-all duration-200
                        hover:bg-white
                    "
                >
                    + Add Question
                </button>

            </div>

            {/* Filters */}
            <FilterBar
                topic={topic}
                difficulty={difficulty}
                status={status}
                onTopicChange={handleTopicChange}
                onDifficultyChange={handleDifficultyChange}
                onStatusChange={handleStatusChange}
            />

            {/* Questions */}
            <div className="space-y-4">

                {questions.length === 0 ? (
                    <div className="
                        border border-[#24272B]
                        bg-[#101214]
                        rounded-xl
                        px-6 py-16
                        text-center
                    ">
                        <h2 className="
                            text-lg
                            font-medium
                            text-[#F2F2F2]
                        ">
                            No questions found
                        </h2>

                        <p className="
                            text-sm
                            text-[#686A70]
                            mt-2
                        ">
                            Add a question or try changing your filters.
                        </p>
                    </div>
                ) : (
                    questions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onDelete={(deletedId) => {
                                setQuestions((prev) => {
                                    const updatedQuestions =
                                        prev.filter(
                                            (q) => q.id !== deletedId
                                        );

                                    if (
                                        updatedQuestions.length === 0 &&
                                        currentPage > 0
                                    ) {
                                        setCurrentPage(
                                            (prevPage) => prevPage - 1
                                        );
                                    }

                                    return updatedQuestions;
                                });
                            }}
                        />
                    ))
                )}

            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

        </main>
    </div>
    </PageTransition>
);
}

export default Questions;