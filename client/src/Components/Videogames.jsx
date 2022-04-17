import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideogames } from "../redux/actions";
import VideogameCard from "./VideogameCard";



export default function Videogames() {
  let videogames = useSelector((state) => state.videogames); //traigo el estado de los personajes
  let dispatch = useDispatch();
  useEffect(() => {
    //despacha una accion para lograr traer los personajes
    dispatch(fetchVideogames());
  }, []);
  console.log(videogames);
  return (
    <div >
      {videogames.map((videogames) => {
        return (
        <div >
            <VideogameCard
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
