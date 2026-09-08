import api from "../services/api";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import FilterBar from "../components/FilterBar";
import Pagination from"../components/Pagination"; 
import { useNavigate } from "react-router-dom";

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

    if(loading) {
        return <p className="p-6">Loading</p>
    }

    if(error) {
        return <p className="p-6">
            {error}
        </p>
    }

    return (
        <div className="min-h-screen">

            <Navbar/>

            <main className="max-w-6xl mx-auto p-6">

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Questions
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your interview questions 
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/questions/add")}
                        className="border rounded-lg px-4 py-2 cursor-pointer">
                        + Add Question
                    </button>
                </div>

                <FilterBar 
                    topic={topic}
                    difficulty={difficulty}
                    status={status}
                    onTopicChange={handleTopicChange}
                    onDifficultyChange={handleDifficultyChange}
                    onStatusChange={handleStatusChange}
                /> 
                <div>
                    {questions.length === 0 ? (
                        <div className="border rounded-xl p-10 text-center">
                            <h2 className="text-xl font-semibold">
                                No questions found
                            </h2>

                            <p className="text-gray-500 mt-2">
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
                                        const updatedQuestions = prev.filter(
                                            (q) => q.id !== deletedId
                                        );

                                        if (updatedQuestions.length === 0 && currentPage > 0) {
                                            setCurrentPage((prevPage) => prevPage - 1);
                                        }

                                        return updatedQuestions;
                                    });
                                }}
                            />
                        ))
                    )}
                </div>

                {questions.length > 0 && (
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    /> 
                )}
            </main>
        </div>
    )
}

export default Questions;