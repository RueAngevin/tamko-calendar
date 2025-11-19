import "./css/App.css";
import NavBar from "./components/NavBar";
import Calendar from "./views/Calendar";
import { Routes, Route } from "react-router-dom";
import About from "./views/About";
import Events from "./views/Events";
import LogIn from "./views/LogIn";
import Organizers from "./views/Organizers";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoute from "./utils/PublicRoutes";
import AdminPanel from "./views/AdminPanel";

function App() {
  return (
    <>
      <NavBar />
      <div className="bg-[#b4c8ff] h-dvh flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Calendar />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/organizers" element={<Organizers />}></Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LogIn />}></Route>
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<AdminPanel />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
