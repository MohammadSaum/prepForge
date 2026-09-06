import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            
            <Route path = "/" element = {<h1>PrepForge</h1>} />  

            <Route path="/register" element={<Register />}/> 

            <Route
                    path="/login"
                    element={<Login />}
            />

            <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>}
            />

        </Routes>    
    </BrowserRouter>
    
  )
}

export default App
