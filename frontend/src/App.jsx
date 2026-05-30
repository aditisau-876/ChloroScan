import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyPlants from "./pages/MyPlants";
import CareGuide from "./pages/CareGuide";
import Reminders from "./pages/Reminders";

function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/myplants" element={<MyPlants />} />

      <Route path="/careguide" element={<CareGuide />}/>

      <Route path="/reminders"element={<Reminders />}/>

    </Routes>
  );
}

export default App;