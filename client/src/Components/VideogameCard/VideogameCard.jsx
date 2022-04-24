import React from "react";
import {Link} from "react-router-dom"


export default function VideogameCard({ id , name, image, rating, genres }) {
  return (
    <div >
        <h3>{name}</h3>
        {<img  src={image} alt="imagen" />}
        <h4>Rating: {rating}</h4>
        <h4>Genres:</h4>
        <div >
            {genres.map(genre=><h5 key={genre.name}>{genre.name}</h5>)}
        </div>
    </div>
  );
}