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
import  sty from "./Home.module.css"
import NavBar from "../NavBar/NavBar";


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
    dispatch(getGenres())
  }, [dispatch]);

  

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
      
      <NavBar/>

      <div className={sty.filter}>
        <p>
          <span>
          Order:
          <select onChange={(e) => handleSortName(e)} className={sty.select}>
            <option value="" className={sty.option}>Select</option>
            <option value="asc" className={sty.option}>A to Z</option>
            <option value="desc" className={sty.option}>Z to A</option>
          </select>
          </span>
          <span>
          Rating:
          <select onChange={(e) => handleSortRating(e)} className={sty.select}>
            <option value="" className={sty.option}>Select</option>
            <option value="ascendant" className={sty.option}>Ascendant</option>
            <option value="descendant" className={sty.option}>Descendant</option>
          </select>
          </span>
          <span>
          Genre:
          <select onChange={(e) => handleFilterGenre(e)} className={sty.select}>
          <option value="all" className={sty.option}>All</option>
            {genres.map((genre) => (
              <option value={genre.name} className={sty.option}>{genre.name}</option>
            ))}
          </select>
          </span>
          <span>
          Provenance:
          <select onChange={(e) => handleFilterProvenance(e)} className={sty.select}>
            <option value="all" className={sty.option}>All</option>
            <option value={true} className={sty.option}>Created</option>
            <option value="false" className={sty.option}>Existing</option>
          </select>
          </span>
        </p>
      </div>

      <div className={sty.cards}>
        {currentVideogames.map((videogames) => {
          return (
            <div key={videogames.id}>
              <Link to={"/home/" + videogames.id} className={sty.link}>
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
