import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getVideogames,
  filterVideogamesByProvenance,
  filterVideogamesByGenre,
  orderByName,
  orderByRating,
  getGenres,
} from "../../redux/actions";
import Paged from "../Paged/Paged";
import VideogameCard from "../VideogameCard/VideogameCard";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch("");
  const allVideogames = useSelector((state) => state.videogames); //igual que hacer map state to props
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirsVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirsVideogame,
    indexOfLastVideogame
  );
  const genres = useSelector((state) => state.genres);

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres()) // iguial que map dispatch to props
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }
  function handleSortRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleFilterProvenance(e) {
    dispatch(filterVideogamesByProvenance(e.target.value));
  }
  function handleFilterGenre(e) {
    dispatch(filterVideogamesByGenre(e.target.value));
  }

  return (
    <div>
      <div>
        <button onClick={(e) => { handleClick(e)}} >Recharge all</button>
        <SearchBar />
        <Link to={"/create"}><button>Create new Videogame</button></Link>
      </div>

      <div>
        <p>
          Order:
          <select onChange={(e) => handleSortName(e)}>
            <option value="">Select</option>
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
          Rating:
          <select onChange={(e) => handleSortRating(e)}>
            <option value="">Select</option>
            <option value="ascendant">Ascendant</option>
            <option value="descendant">Descendant</option>
          </select>
          Genre:
          <select onChange={(e) => handleFilterGenre(e)}>
          <option value="all">All</option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
          Provenance:
          <select onChange={(e) => handleFilterProvenance(e)}>
            <option value="all">All</option>
            <option value="true">Created</option>
            <option value="false">Existing</option>
          </select>
        </p>
      </div>

      <div>
        {currentVideogames.map((videogames) => {
          return (
            <div key={videogames.id}>
              <Link to={"/home/" + videogames.id}>
              <VideogameCard
                isDataBase={videogames.isDatabase}
                id={videogames.id}
                name={videogames.name}
                image={videogames.background_image}
                rating={videogames.rating}
                genres={videogames.genres}
              />
              </Link>
            </div>
          );
        })}
      </div>

      <div>
        <Paged
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paged={paged}
        />
      </div>

    </div>
  );
}
