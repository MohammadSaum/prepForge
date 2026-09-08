import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import PageTransition from "../components/PageTransition";
import CustomSelect from "../components/CustomSelect";

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

                setFormData({
                    title: response.data.title,
                    difficulty: response.data.difficulty,
                    platform: response.data.platform,
                    topic: response.data.topic,
                    link: response.data.link,
                    status: response.data.status
                });
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
        return (
            <div className="min-h-screen bg-[#08090A]">
                <Navbar />

                <main className="max-w-3xl mx-auto px-6 py-12">
                    <p className="text-sm text-[#686A70]">
                        Loading question...
                    </p>
                </main>
            </div>
        );
    }

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
                        Edit question
                    </h1>

                    <p className="
                        text-sm
                        text-[#8A8D93]
                        mt-3
                    ">
                        Update the details of this problem.
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
                            disabled={saving}
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
                            {saving ? "Saving..." : "Save Changes"}
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

export default EditQuestion;