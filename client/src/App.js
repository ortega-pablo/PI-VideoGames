import './App.css';
import Searchbar from './Components/Searchbar';
//import { Route } from 'react-router-dom';
//import Nav from './components/Nav/Nav';
//import CreateVideogame from './Components/CreateVideogame/CreateVideogame';
import Videogames from './Components/Videogames';
//import VideogameDetail from './Components/Videogames/Videogames';


function App() {
  return (
    <div className="App">

        <Searchbar />
        <Videogames />

    </div>
  );
}




export default App;
