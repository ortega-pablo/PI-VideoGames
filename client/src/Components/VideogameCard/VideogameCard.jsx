import React from "react";
import  sty from "./VideogameCard.module.css"

export default function VideogameCard({ id , name, image, rating, genres }) {
  return (
    <div className={sty.card}>
      <div><h3 className={sty.cardName}>{name}</h3></div>
      <div><img className={sty.cardImage} src={image} alt="imagen" width="280" height="140" /></div>
      <div><h4 className={sty.rating}>Rating: {rating}</h4></div>
      <div><h4 className={sty.genres}>Genres:</h4></div> 
      <div className={sty.genre}>{genres.map(genre=><h5 key={genre.name}>{genre.name}</h5>)}</div>
    </div>
  );
}