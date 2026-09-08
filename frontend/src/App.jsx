import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";
import QuestionDetails from "./pages/QuestionDetails";
import Landing from "./pages/Landing.";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            
            <Route path="/" element={<Landing />} /> 

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

            <Route 
                    path="/questions"
                    element={
                        <ProtectedRoute>
                            <Questions />
                        </ProtectedRoute>
                        
                    }
            />

            <Route
                path="/questions/add"
                element={
                    <ProtectedRoute>
                        <AddQuestion />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/questions/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditQuestion />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/questions/:id"
                element={
                    <ProtectedRoute>
                        <QuestionDetails />
                    </ProtectedRoute>
                }
            />

        </Routes>    
    </BrowserRouter>
    
  )
}

export default App
