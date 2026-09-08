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

        <div className="mb-5">
            <h2 className="
                text-lg
                font-semibold
                text-[#F2F2F2]
            ">
                Notes
            </h2>

            <p className="
                text-sm
                text-[#686A70]
                mt-1
            ">
                Keep important observations and solution ideas here.
            </p>
        </div>

        {error && (
            <div className="
                border
                border-[#A8493E]/30
                bg-[#A8493E]/5
                rounded-lg
                px-4
                py-3
                mb-4
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

        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your notes..."
            rows="7"
            className="
                w-full
                bg-[#0D0F11]
                border
                border-[#24272B]
                rounded-lg
                px-4
                py-3
                text-sm
                text-[#F2F2F2]
                placeholder:text-[#686A70]
                outline-none
                resize-none
                transition-colors
                duration-200
                focus:border-[#41444A]
            "
        />

        <div className="
            flex
            items-center
            justify-between
            mt-4
        ">

            <span className="text-xs text-[#686A70]">
                {hasNote ? "Saved note" : "No note yet"}
            </span>

            <div className="flex gap-3">

                {hasNote && (
                    <button
                        onClick={handleDelete}
                        className="
                            text-sm
                            text-[#8A8D93]
                            transition-colors
                            duration-200
                            hover:text-[#C97870]
                        "
                    >
                        Delete
                    </button>
                )}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="
                        bg-[#F2F2F2]
                        text-[#08090A]
                        rounded-lg
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        transition-colors
                        duration-200
                        hover:bg-white
                        disabled:opacity-50
                    "
                >
                    {saving
                        ? "Saving..."
                        : hasNote
                            ? "Update Note"
                            : "Save Note"}
                </button>

            </div>

        </div>

    </section>
);
}

export default NotesSection;