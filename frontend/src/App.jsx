import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            
            <Route path = "/" element = {<h1>PrepForge</h1>} />  

            <Route path="/register" element={<Register />}/> 
        </Routes>    
    </BrowserRouter>
    
  )
}

export default App
