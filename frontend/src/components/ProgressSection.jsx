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

    return(
        <div className="border rounded-xl p-6 mt-6">

            <div className="flex items-center justify-between">
                
                <h2 className="text-xl font-semibold">
                    Progress
                </h2>

                <button
                    onClick={handleFavorite}
                    className="border rounded-lg px-4 py-2"
                >
                    {progress.favorite ? "★ Favorited" : "☆ Favorite"}
                </button>
            </div>

            <div className="mt-6">
                <p className="font-medium mb-3">
                    Confidence
                </p>

                <div className="flex gap-2">

                    {[1, 2, 3, 4, 5].map((value) => (
                        <button 
                            key={value}
                            onClick={() => handleConfidence(value)}
                            className={` border rounded-lg px-4 py-2 cursor-pointer ${progress.confidence === value ? "bg-black text-white" : ""}`}>
                            {value}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">

                <button 
                    onClick={handleRevise}
                    className="border rounded-lg px-5 py-2"
                >    
                    Mark as Revised
                </button>
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                
                <div>

                    <p className="text-gray-500 text-sm">
                        Revision Count
                    </p>

                    <p className="text-xl font-semibold">
                        {progress.revisionCount}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Last Solved
                    </p>
                    <p className="text-xl font-semibold">
                        {progress.lastSolved || "Not yet"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm">
                        Next Revision
                    </p>
                    <p className="text-xl font-semibold">
                        {progress.nextRevision || "Not scheduled"}
                    </p>
                </div>
            </div>

            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}
        </div>
    )
}

export default ProgressSection