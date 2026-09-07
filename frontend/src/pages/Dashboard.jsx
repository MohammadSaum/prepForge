import { useEffect, useState } from "react";
import api from "../services/api"
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(""); 

    useEffect(() => {
        const fetchDashboard = async () => {

            try{
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

    if(loading) {
        return <p className="p-6">Loading</p>
    }

    if(error) {
        return <p className="p-6 text-red-500">{error}</p>
    }

    return (
        <div className="min-h-screen">

            <Navbar /> 

            <main className="max-w-6xl max-auto p-6">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Welcome back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Track your interview prepration. 
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <StatCard 
                        title="Total Questions" 
                        value ={dashboard.totalQuestinos}
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

            </main>
        </div>
    );
}

export default Dashboard; 