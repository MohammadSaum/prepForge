function StatCard({ title, value }) {
    return (
        <div
            className="
                border border-[#24272B]
                bg-linear-to-br from-[#151719] to-[#101214]
                rounded-xl
                p-6
                transition-all duration-200
                hover:border-[#34373C]
                hover:-translate-y-0.5
            "
        >
            <p className="text-sm text-[#686A70]">
                {title}
            </p>

            <p className="text-3xl font-semibold tracking-tight text-[#F2F2F2] mt-3">
                {value}
            </p>
        </div>
    );
}

export default StatCard;