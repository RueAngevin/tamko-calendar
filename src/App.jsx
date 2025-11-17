import "./css/App.css";
import NavBar from "./components/NavBar";
import Home from "./views/Calendar";

function App() {
  return (
    <>
      <NavBar />
      <div className="bg-[#b4c8ff] h-dvh flex items-center justify-center text-xl font-bold">
        <Home />
      </div>
    </>
  );
}

export default App;
