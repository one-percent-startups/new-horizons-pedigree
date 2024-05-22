import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Pedigree from "./pages/Pedegree";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Pedigree />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
