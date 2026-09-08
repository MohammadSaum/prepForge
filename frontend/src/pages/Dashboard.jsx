import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import api from "../services/api";
import PageTransition from "../components/PageTransition";
import LoadingState from "../components/LoadingState";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/dashboard");
                setDashboard(response.data);
            } catch (error) {
                setError("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
    return (
        <div className="min-h-screen bg-[#08090A]">
            <Navbar />
            <LoadingState />
        </div>
    );
}

    if (error) {
        return (
            <div className="min-h-screen bg-[#08090A]">
                <Navbar />

                <main className="max-w-6xl mx-auto px-6 py-12">
                    <div className="
                        border border-[#24272B]
                        bg-[#101214]
                        rounded-xl
                        p-8
                    ">
                        <p className="text-[#B85C5C]">
                            {error}
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <PageTransition>
        <div className="min-h-screen bg-[#08090A]">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-8 md:py-12">

                {/* Header */}
                <div className="mb-10">
                    <p className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-[#686A70]
                        mb-3
                    ">
                        Interview preparation
                    </p>

                    <h1 className="
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-[#F2F2F2]
                    ">
                        Dashboard
                    </h1>

                    <p className="
                        text-[#8A8D93]
                        text-sm
                        mt-3
                    ">
                        Your interview preparation at a glance.
                    </p>
                </div>

                {/* Stats */}
                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                ">
                    <StatCard
                        title="Total Questions"
                        value={dashboard.totalQuestions}
                    />

                    <StatCard
                        title="Easy"
                        value={dashboard.easyQuestions}
                    />

                    <StatCard
                        title="Medium"
                        value={dashboard.mediumQuestions}
                    />

                    <StatCard
                        title="Hard"
                        value={dashboard.hardQuestions}
                    />

                    <StatCard
                        title="Favorites"
                        value={dashboard.favoriteQuestions}
                    />

                    <StatCard
                        title="Revision Due"
                        value={dashboard.revisionDue}
                    />
                </div>

                {/* Preparation overview */}
                <section className="
                    mt-10
                    border border-[#24272B]
                    bg-linear-to-br from-[#151719] to-[#101214]
                    rounded-xl
                    p-6
                ">
                    <div className="mb-6">
                        <h2 className="
                            text-lg
                            font-semibold
                            text-[#F2F2F2]
                        ">
                            Preparation overview
                        </h2>

                        <p className="
                            text-sm
                            text-[#686A70]
                            mt-1
                        ">
                            Your question distribution by difficulty.
                        </p>
                    </div>

                    <div className="space-y-5 grid grid-cols-1 md:grid-cols-3 gap-4">

                        <ProgressRow
                            label="Easy"
                            value={dashboard.easyQuestions}
                            total={dashboard.totalQuestions}
                            color="#7A9471"
                        />

                        <ProgressRow
                            label="Medium"
                            value={dashboard.mediumQuestions}
                            total={dashboard.totalQuestions}
                            color="#C9A15A"
                        />

                        <ProgressRow
                            label="Hard"
                            value={dashboard.hardQuestions}
                            total={dashboard.totalQuestions}
                            color="#A8493E"
                        />

                    </div>
                </section>

            </main>
        </div>
        </PageTransition>
    );
}

function ProgressRow({ label, value, total, color }) {
    const percentage =
        total === 0
            ? 0
            : Math.round((value / total) * 100);

    return (
        <div>
            <div className="
                flex
                items-center
                justify-between
                text-sm
                mb-2
                
            ">
                <span className="text-[#B0B2B7]">
                    {label}
                </span>

                <span className="text-[#686A70]">
                    {value} · {percentage}%
                </span>
            </div>

            <div className="
                h-1.5
                rounded-full
                bg-[#24272B]
                overflow-hidden
            ">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                    }}
                />
            </div>
        </div>
    );
}

export default Dashboard;