import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames , filterVideogamesByProvenance, orderByName} from "../redux/actions";
import Paged from "./Paged";
import VideogameCard from "./VideogameCard";

export default function Home() {
  const dispatch = useDispatch("");
  const allVideogames = useSelector((state) => state.videogames); //igual que hacer map state to props
  const [order,setOrder] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15)
  const indexOfLastVideogame = currentPage * videogamesPerPage
  const indexOfFirsVideogame = indexOfLastVideogame - videogamesPerPage
  const currentVideogames = allVideogames.slice(indexOfFirsVideogame,indexOfLastVideogame)

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getVideogames()); // iguial que map dispatch to props
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleSort(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordered ${e.target.value}`)
  }

  function handleFilterProvenance(e) {
    dispatch(filterVideogamesByProvenance(e.target.value));
  }

  return (
    <div>
      <Link to="/videogame">Videogame</Link>
      <button onClick={ (e) => { handleClick(e) }} >
        Recharge
      </button>
      <div>
        <select>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </select>
        <select>
          <option value="ratingAsc">Ascendant</option>
          <option value="ratingDesc">Descendant</option>
        </select>
        <select>{/* hacer map para filtrar por género */}</select>
        <select onChange={e => handleFilterProvenance(e)}>
        <option value="all" >All</option>
          <option value="true" >Created</option>
          <option value="false">Existing</option>
        </select>
        <Paged
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paged={paged}
        />
        {currentVideogames.map((videogames) => {
          return (
            <div>
              <VideogameCard
                isDataBase={videogames.isDatabase}
                id={videogames.id}
                name={videogames.name}
                image={videogames.background_image}
                rating={videogames.rating}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* export default function Videogames() {
  let videogames = useSelector((state) => state.filteredVideogames); //traigo el estado de los personajes
  let dispatch = useDispatch();
  useEffect(() => {
    //despacha una accion para lograr traer los personajes
    dispatch(fetchVideogames());
  },[]);
  return (
    <div>
      {videogames.map((videogames) => {
        return (
        <div>
            <VideogameCard
            id={videogames.id}
            name={videogames.name}
            image={videogames.background_image}
            rating={videogames.rating}
          />
        </div>
      )
      })}
    </div>
  );
}
 */
