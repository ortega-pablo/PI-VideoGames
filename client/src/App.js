import {Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import CreateVideogame from "./Components/CreateVideogame/CreateVideogame";
import "./App.css";
import NotFound from "./Components/NotFound/NotFound";
import VideogameDetail from "./Components/VideogameDetail/VideogameDetail";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home/:id" element={<VideogameDetail/>} />
        <Route path="/create" element={<CreateVideogame/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
