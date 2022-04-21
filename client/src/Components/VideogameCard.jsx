import React from "react";
import {Link} from "react-router-dom"
import sty from "../styles/VideogameCard.model.css";

export default function VideogameCard({ id, name, image, rating }) {
  return (
    <div>
        <h3>{name}</h3>
        <Link to={`/${id}`}>
        {<img className={sty.img} src={image} alt="imagen" />}
        </Link>
        <h4>Rating: {rating}</h4>
        <h6>Tengo que agregar los géneros</h6>
    </div>
  );
}
