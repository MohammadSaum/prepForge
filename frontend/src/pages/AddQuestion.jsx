import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import PageTransition from "../components/PageTransition";
import CustomSelect from "../components/CustomSelect";

function AddQuestion() {
    const [formData, setFormData] = useState({
        title: "",
        difficulty: "EASY",
        platform: "",
        topic: "",
        link: "",
        status: "UNSOLVED"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post("/questions", formData);
            navigate("/questions");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to add question"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <PageTransition>

        <div className="min-h-screen bg-[#08090A]">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-10">
                    <p className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-[#686A70]
                        mb-3
                    ">
                        Question library
                    </p>

                    <h1 className="
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-[#F2F2F2]
                    ">
                        Add question
                    </h1>

                    <p className="
                        text-sm
                        text-[#8A8D93]
                        mt-3
                    ">
                        Add a problem to your interview preparation library.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="
                        border
                        border-[#24272B]
                        bg-gradient-to-br
                        from-[#151719]
                        to-[#101214]
                        rounded-xl
                        p-6
                        md:p-8
                    "
                >

                    {error && (
                        <div className="
                            border
                            border-[#A8493E]/30
                            bg-[#A8493E]/5
                            rounded-lg
                            px-4
                            py-3
                            mb-6
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
                    )}

                    <div className="space-y-6">

                        {/* Title */}
                        <FormField label="Title">
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Two Sum"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </FormField>

                        {/* Difficulty */}
                        <FormField label="Difficulty">
                            <CustomSelect
                                value={formData.difficulty}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        difficulty: value
                                    })
                                }
                                options={[
                                    { value: "EASY", label: "Easy" },
                                    { value: "MEDIUM", label: "Medium" },
                                    { value: "HARD", label: "Hard" }
                                ]}
                            />
                        </FormField>

                        {/* Platform */}
                        <FormField label="Platform">
                            <CustomSelect
                                value={formData.platform}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        platform: value
                                    })
                                    }
                                placeholder="Select platform"
                                options={[
                                    { value: "LEETCODE", label: "LeetCode" },
                                    { value: "HACKERRANK", label: "HackerRank" },
                                    { value: "CODEFORCES", label: "Codeforces" },
                                    { value: "CODECHEF", label: "CodeChef" },
                                    { value: "GEEKSFORGEEKS", label: "GeeksForGeeks" },
                                    { value: "OTHER", label: "Other" }
                                ]}
                            />
                        </FormField>

                        {/* Topic */}
                        <FormField label="Topic">
                            <input
                                type="text"
                                name="topic"
                                placeholder="e.g. Arrays"
                                value={formData.topic}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </FormField>

                        {/* Link */}
                        <FormField label="Problem URL">
                            <input
                                type="url"
                                name="link"
                                placeholder="https://leetcode.com/problems/..."
                                value={formData.link}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </FormField>

                        {/* Status */}
                        <FormField label="Status">
                            <CustomSelect
                                value={formData.status}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        status: value
                                    })
                                }
                                options={[
                                    { value: "UNSOLVED", label: "Unsolved" },
                                    { value: "SOLVED", label: "Solved" }
                                ]}
                            />
                            
                        </FormField>

                    </div>

                    {/* Actions */}
                    <div className="
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#24272B]
                        mt-8
                        pt-6
                    ">
                        <button
                            type="button"
                            onClick={() => navigate("/questions")}
                            className="
                                text-sm
                                text-[#8A8D93]
                                transition-colors
                                duration-200
                                hover:text-[#F2F2F2]
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                bg-[#F2F2F2]
                                text-[#08090A]
                                rounded-lg
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200
                                hover:bg-white
                                disabled:opacity-50
                            "
                        >
                            {loading ? "Adding..." : "Add Question"}
                        </button>
                    </div>

                </form>

            </main>
        </div>

        </PageTransition>
    );
}

function FormField({ label, children }) {
    return (
        <div>
            <label className="
                block
                text-sm
                font-medium
                text-[#D4D4D8]
                mb-2
            ">
                {label}
            </label>

            {children}
        </div>
    );
}

export default AddQuestion;