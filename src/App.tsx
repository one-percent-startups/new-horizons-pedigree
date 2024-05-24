/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Pedigree from "./pages/Pedegree";
import Homepage from "./pages/Home";
function App() {
  const localStorageItem = localStorage.getItem("newhorizon_user") ?? "";
  let user: any = null;
  if (localStorageItem) {
    user = JSON.parse(localStorageItem);
  }
  const ProtectedRoute = () => {
    return user ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/pedigree" element={<Pedigree />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
