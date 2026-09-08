import { useEffect, useState } from "react";
import api from "../services/api";

function NotesSection({ questionId }) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [hasNote, setHasNote] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get(`/notes/${questionId}`);

                setContent(response.data.content);
                setHasNote(true);
            } catch (error) {
                if (error.response?.status === 400) {
                    setHasNote(false);
                } else {
                    setError("Failed to load note");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [questionId]);

    const handleSave = async () => {
        if (!content.trim()) {
            setError("Note cannot be empty");
            return;
        }

        try {
            setError("");
            setSaving(true);

            const response = await api.post(
                `/notes/${questionId}`,
                {
                    content: content
                }
            );

            setContent(response.data.content);
            setHasNote(true);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save note"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await api.delete(`/notes/${questionId}`);

            setContent("");
            setHasNote(false);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete note"
            );
        }
    };

    if (loading) {
        return (
            <div className="border rounded-xl p-6 mt-6">
                Loading notes
            </div>
        );
    }

    return (
        <div className="border rounded-xl p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">
                Notes
            </h2>

            {error && (
                <p className="text-red-500 mb-4">
                    {error}
                </p>
            )}

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notes"
                rows="6"
                className="border rounded-lg p-3 w-full resize-y"
            />

            <div className="flex gap-3 mt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="border rounded-lg px-5 py-2 disabled:opacity-50"
                >
                    {saving
                        ? "Saving"
                        : hasNote
                            ? "Update Note"
                            : "Save Note"}
                </button>

                {hasNote && (
                    <button
                        onClick={handleDelete}
                        className="border rounded-lg px-5 py-2"
                    >
                        Delete Note
                    </button>
                )}
            </div>
        </div>
    );
}

export default NotesSection;