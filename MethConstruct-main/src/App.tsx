import React from "react";
import AuthPage from "./pages/auth-page";
import Directions from "./pages/directions-page/directions-page";
import ConstructPage from "./pages/construct-page";
import UploadPage from "./pages/upload-page";
import DesciplinsPage from "./pages/desciplins-page";
import Navbar from "./components/Navbar";
import WorkingProgramms from "./pages/workingProgramms-page/workingProgramms-page";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<NavbarWithLocation />} />
      </Routes>
    </div>
  );
}

const NavbarWithLocation: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: isLoginPage ? 0 : "64px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/working-programms" element={<WorkingProgramms />} />
          <Route path="/constructor" element={<ConstructPage />} />
          <Route path="/desciplins" element={<DesciplinsPage/>} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
