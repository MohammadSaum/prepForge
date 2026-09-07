function FilterBar({
    topic, 
    difficulty,
    status,
    onTopicChange, 
    onDifficultyChange,
    onStatusChange
}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
                type="text"
                placeholder="Search by topic"
                value={topic}
                onChange={(e => onTopicChange(e.target.value))}
                className="border rounded-lg p-3 flex-1"
            />

            <select
                value={difficulty}
                onChange={(e) => {onDifficultyChange(e.target.value)}}
                className="border rounded-lg p-3 cursor-pointer"
                >
                <option value="">All difficulty</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
            </select>

            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="border rounded-lg p-3  cursor-pointer"
            >
                <option value="">All status</option>
                <option value="SOLVED">Solved</option>
                <option value="UNSOLVED">Unsolved</option>
            </select>

        </div>
    );
}

export default FilterBar; 