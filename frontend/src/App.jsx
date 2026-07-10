import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyPlants from "./pages/MyPlants";
import CareGuide from "./pages/CareGuide";
import Reminders from "./pages/Reminders";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/myplants" element={<ProtectedRoute><MyPlants /></ProtectedRoute>} />
      <Route path="/careguide" element={<ProtectedRoute><CareGuide/></ProtectedRoute>}/>
      <Route path="/careguide/:modelName" element={<ProtectedRoute><CareGuide/></ProtectedRoute>} />
      <Route path="/reminders"element={<ProtectedRoute><Reminders /></ProtectedRoute>}/>

    </Routes>
  );
}

export default App;