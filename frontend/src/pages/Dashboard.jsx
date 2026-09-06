import { useEffect, useState } from "react";
import api from "../services/api"
import Navbar from "../components/Navbar";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {

            try{
                const response = await api.get("/dashboard"); 

                setDashboard(response.data); 
            } catch (error) {
                console.error(error); 
            }
        };

        fetchDashboard();
    }, []); 

    return (
        <div>

            <Navbar /> 

            <main className="p-6">

                <h1>Dashboard</h1>

                {dashboard && (
                    <pre>
                        {JSON.stringify(dashboard, null, 2)}
                    </pre>
                )}
            </main>
        </div>
    );
}

export default Dashboard; 