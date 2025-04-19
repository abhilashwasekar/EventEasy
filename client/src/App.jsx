import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventPage from "./pages/EventPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/register/:eventId" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
