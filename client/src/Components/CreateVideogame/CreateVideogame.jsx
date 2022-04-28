import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getGenres,
  getPlatforms,
  postVideogame,
} from "../../redux/actions/index";
import sty from "./CreateVideogame.module.css"


function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Please enter a name";
  } else {
    if (input.name.replace(/ /g, "") === "") {
      errors.name = "Please enter a name";
    }
    if (input.name.replace(/ /g, "").match(/[^A-Za-z0-9]/)) {
      errors.name =
        "The name must be alpha-numeric and without special characters";
    }
    if (input.name.length > 25) {
      errors.name = "Max 25 characters";
    }
  }

  if (!input.description) {
    errors.description = "Please enter a description";
  } else {
    if (input.description.replace(/ /g, "") === "") {
      errors.description = "Please enter a description";
    }
  }

  if (input.rating) {
    
    if (input.rating < 0 || input.rating > 5) {
      errors.rating = "The raiting has a range from 0 to 5";
    }
  } 
  if(!input.released){
    errors.released = "Please enter a date"
  }

  /*   /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
    Comprueba uno o ninguno de los siguientes: ftp: //, http: // o https: //
    Se requiere www.
    Comprueba cualquier número de caracteres válidos.
    Finalmente, verifica que tenga un dominio y que ese dominio tenga al menos 2 caracteres.
    */
  if (input.background_image) {
    if (!input.background_image.match(/((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})/)) {
      errors.background_image = "Please enter a valid URL";
    }
  }

  
  if(!input.platforms.length){
      errors.platforms = "Please select one or more platforms";
    }

  return errors;
}

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    background_image: "",
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });
  function handleDeleteGenres(el) {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== el),
    });
  }
  function handleDeletePlatforms(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== el),
    });
    setErrors(
      validate({
        ...input,
        platforms: input.platforms.filter((platform) => platform !== el),
      })
    );
    
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectGenres(e) {
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }
  function handleSelectPlatforms(e) {
    if (!input.platforms.includes(e.target.value) && e.target.value !== "Select...") {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      
    }
    setErrors(
      validate({
        ...input,
        platforms: [...input.platforms, e.target.value]
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!Object.values(errors).length) {
      dispatch(postVideogame(input));
      setInput({
        background_image: "",
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
      alert("videogame successfully created");
      navigate("/home");
    } else {
      alert("Please review the information");
    }
    
  }
  return (
    <div className={sty.container}>
      <div>
      <Link to="/home">
        <button className={sty.btn}>Return to Home</button>
      </Link>
      </div>
      <div className={sty.general}>

      <form className={sty.container} onSubmit={(e) => handleSubmit(e)}>
        
        <div className={sty.divTitle}>
          <h1>New Videogame</h1>
        </div>
        
        <div className={sty.divName}>
          <label className={sty.label}>Name:</label>
          <input
            className={sty.input}
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors?.name && <p className={sty.errors}>{errors.name}</p>}
        </div>

        <div className={sty.divDescription}>
          <label className={sty.label}>Description:</label>
          <textarea className={sty.textarea} type="text" value={input.description} name="description" onChange={(e) => handleChange(e)} />
          {errors?.description && <p className={sty.errors}>{errors.description}</p>}
        </div>

        <div className={sty.divRating}>
          <label className={sty.label}>Rating:</label>
          <input className={sty.input} type="number" value={input.rating} name="rating" onChange={(e) => handleChange(e)} />
          {errors?.rating && <p className={sty.errors}>{errors.rating}</p>}
        </div>

        <div className={sty.divReleased}>
          <label className={sty.label}>Released:</label>
          <input className={sty.input} type="Date" value={input.released} name="released" min="1900-00-00" max="2050-12-31" onChange={(e) => handleChange(e)} />
          {errors?.released && <p className={sty.errors}>{errors.released}</p>}
        </div>

        <div className={sty.divImg}> 
          <label className={sty.label}>Image:</label>
          <input className={sty.input} type="text" value={input.background_image} name="background_image" onChange={(e) => handleChange(e)} />
          {errors?.background_image && <p className={sty.errors}>{errors.background_image}</p>}
        </div>

        <div className={sty.divGen}>
          <label className={sty.label}>Genres:</label>
          <select className={sty.selectGenre} id="genres" onChange={(e) => handleSelectGenres(e)}>
          <option default>Select...</option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
        </div>

        <div className={sty.divGenres}>
          {input.genres.map((genre) => (
            <div className={sty.genre}>
              <p>{genre}</p>
              <button className={sty.btnGenre} type="button" onClick={() => handleDeleteGenres(genre)} >x</button>
            </div>
          ))}
        </div>

        <div className={sty.divPlat}>
          <label className={sty.label}>Platforms:</label>
          <select className={sty.selectGenre} id="platforms" onChange={(e) => handleSelectPlatforms(e)}>
          <option selected>Select...</option>
            {platforms.map((platform) => (
              <option value={platform.name}>{platform.name}</option>
            ))}
          </select>

          {errors?.platforms && <p className={sty.errors}>{errors.platforms}</p>}
        </div>

        <div className={sty.divPlatforms}>
            {input.platforms?.map((platform) => (
            <div className={sty.genre}>
              <p>{platform}</p>
              <button className={sty.btnGenre} type="button" onClick={() => handleDeletePlatforms(platform)}>x</button>
            </div>
            ))}
          </div>

        
      </form>
      
      </div>

      {
        !input.name || !input.description || !input.platforms || input.platforms === 'Select...' || !input.platforms.length ?
        <button className={sty.btnOff} disabled type="submit">Create</button> :
      <button className={sty.btn} type="submit"  onClick={(e) => handleSubmit(e)}>Create</button>
    }
      
    
    
    </div>
  );
}
