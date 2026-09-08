import CustomSelect from "./CustomSelect";

function FilterBar({
    topic,
    difficulty,
    status,
    onTopicChange,
    onDifficultyChange,
    onStatusChange
}) {
    return (
        <div className="flex flex-col md:flex-row gap-3 mb-8">

            <input
                type="text"
                placeholder="Search by topic..."
                value={topic}
                onChange={(e) => onTopicChange(e.target.value)}
                className="
                    flex-1
                    bg-[#101214]
                    border border-[#24272B]
                    rounded-lg
                    px-4 py-3
                    text-sm
                    text-[#F2F2F2]
                    placeholder:text-[#686A70]
                    outline-none
                    transition-colors
                    duration-200
                    focus:border-[#4A4D52]
                "
            />

            <div className="md:w-48">
                <CustomSelect
                    value={difficulty}
                    onChange={onDifficultyChange}
                    placeholder="All difficulties"
                    options={[
                        { value: "EASY", label: "Easy" },
                        { value: "MEDIUM", label: "Medium" },
                        { value: "HARD", label: "Hard" }
                    ]}
                />
            </div>

            <div className="md:w-48">
                <CustomSelect
                    value={status}
                    onChange={onStatusChange}
                    placeholder="All statuses"
                    options={[
                        { value: "SOLVED", label: "Solved" },
                        { value: "UNSOLVED", label: "Unsolved" }
                    ]}
                />
            </div>

        </div>
    );
}

export default FilterBar;