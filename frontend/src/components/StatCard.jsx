function StatCard({title, value}) {
    return(
        <div className="border rounded-xl p-6">
            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>

        </div>
    );
}

export default StatCard; 