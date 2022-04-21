import {Route, Routes } from "react-router-dom";

import "./App.css";
import LandingPage from "./Components/LandingPage";
import Searchbar from "./Components/Searchbar";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}></Route>
        <Route  exact path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
