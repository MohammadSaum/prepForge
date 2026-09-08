import { useEffect, useState } from "react";
import api from "../services/api";

function ProgressSection({ questionId }) {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProgress = async () => {
        try {
            const response = await api.get(`/progress/${questionId}`);
            setProgress(response.data);
        } catch (error) {
            setError("Failed to load progress");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, [questionId]);

    const handleFavorite = async () => {
        try {
            const response = await api.patch(
                `/progress/${questionId}/favorite`
            );

            setProgress(response.data);
        } catch (error) {
            setError("Failed to update favorite");
        }
    };

    const handleConfidence = async (value) => {
        try {
            const response = await api.patch(
                `/progress/${questionId}/confidence`,
                {
                    confidence: value
                }
            );

            setProgress(response.data);
        } catch (error) {
            setError("Failed to update confidence");
        }
    };

    const handleRevise = async () => {
        try {
            const response = await api.patch(
                `/progress/${questionId}/revise`
            );

            setProgress(response.data);
        } catch (error) {
            setError("Failed to revise question");
        }
    };

    if (loading) {
        return <p className="mt-6">Loading progress...</p>;
    }

    if (error && !progress) {
        return <p className="text-red-500 mt-6">{error}</p>;
    }

    return (
        <section className="
            border border-[#24272B]
            bg-gradient-to-br
            from-[#151719]
            to-[#101214]
            rounded-xl
            p-6
            md:p-8
            mt-6
        ">

            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">
                <div>
                    <h2 className="
                        text-lg
                        font-semibold
                        text-[#F2F2F2]
                    ">
                        Progress
                    </h2>

                    <p className="
                        text-sm
                        text-[#686A70]
                        mt-1
                    ">
                        Track your confidence and revision history.
                    </p>
                </div>

                <button
                    onClick={handleFavorite}
                    className={`
                        w-32
                        border
                        rounded-lg
                        px-4
                        py-2
                        text-sm
                        transition-all
                        duration-200
                        ${
                            progress.favorite
                                ? "border-[#B8AA8A]/40 text-[#B8AA8A] bg-[#B8AA8A]/10"
                                : "border-[#2A2D32] text-[#A1A3A8] hover:border-[#41444A] hover:text-[#F2F2F2]"
                        }
                    `}
                >
                    {progress.favorite
                        ? "★ Favorited"
                        : "☆ Favorite"}
                </button>
            </div>

            <div className="
                mt-8
                pt-6
                border-t
                border-[#24272B]
            ">
                <p className="
                    text-sm
                    font-medium
                    text-[#D4D4D8]
                    mb-3
                ">
                    Confidence
                </p>

                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            onClick={() => handleConfidence(value)}
                            className={`
                                w-10
                                h-10
                                rounded-lg
                                border
                                text-sm
                                transition-all
                                duration-200
                                ${
                                    progress.confidence === value
                                        ? "bg-[#F2F2F2] text-[#08090A] border-[#F2F2F2]"
                                        : "border-[#2A2D32] text-[#8A8D93] hover:border-[#41444A] hover:text-[#F2F2F2]"
                                }
                            `}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>

            <div className="
                mt-8
                flex
                items-center
                justify-between
                gap-4
                flex-wrap
            ">
                <div>
                    <p className="text-sm text-[#686A70]">
                        Revision count
                    </p>

                    <p className="
                        text-2xl
                        font-semibold
                        text-[#F2F2F2]
                        mt-1
                    ">
                        {progress.revisionCount}
                    </p>
                </div>

                <button
                    onClick={handleRevise}
                    className="
                        border
                        border-[#2A2D32]
                        rounded-lg
                        px-5
                        py-2.5
                        text-sm
                        text-[#B0B2B7]
                        transition-all
                        duration-200
                        hover:border-[#41444A]
                        hover:text-[#F2F2F2]
                    "
                >
                    Mark as Revised
                </button>
            </div>

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
                mt-8
                pt-6
                border-t
                border-[#24272B]
            ">

                <div>
                    <p className="text-xs text-[#686A70]">
                        Last solved
                    </p>

                    <p className="text-sm text-[#D4D4D8] mt-1">
                        {progress.lastSolved || "Not yet"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-[#686A70]">
                        Next revision
                    </p>

                    <p className="text-sm text-[#D4D4D8] mt-1">
                        {progress.nextRevision || "Not scheduled"}
                    </p>
                </div>

            </div>

            {error && (
                <p className="text-sm text-[#B85C5C] mt-5">
                    {error}
                </p>
            )}

        </section>
    );
}

export default ProgressSection