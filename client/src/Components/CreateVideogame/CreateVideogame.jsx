import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getGenres,
  getPlatforms,
  postVideogame,
} from "../../redux/actions/index";

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
    errors.name = "";
  }

  if (!input.description) {
    errors.description = "Please enter a description";
  } else {
    if (input.description.replace(/ /g, "") === "") {
      errors.description = "Please enter a description";
    }
    errors.description = "";
  }

  if (input.rating) {
    if (input.rating.match(/[^0-9]/)) {
      errors.rating = "Please enter a number";
    }
    if (input.rating < 0 || input.rating > 5) {
      errors.rating = "The raiting has a range from 0 to 5";
    }
  }

  if (input.released) {
    if (input.released.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/)) {
      errors.released = "Please enter a valid date";
    }
  }
  /*   /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
    Comprueba uno o ninguno de los siguientes: ftp: //, http: // o https: //
    Se requiere www.
    Comprueba cualquier número de caracteres válidos.
    Finalmente, verifica que tenga un dominio y que ese dominio tenga al menos 2 caracteres.
    */
  if (input.background_image) {
    if (
      input.background_image.match(
        /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
      )
    ) {
      errors.background_image = "Please enter a valid url";
    }
  }

  
  if(input.platforms[0]){
      errors.platforms = "";
    }else{
      errors.platforms = errors.platforms + ["hola"];
    }
  
  
  

  console.log(errors)
  return errors;
}

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    background_image: "",
    name: "Please enter a name",
    description: "Please enter a description",
    released: "",
    rating: "",
    platforms: ["Please select the platform/s"],
    genres: "",
  });

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
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      errors.name === "" &&
      errors.description === "" &&
      errors.platforms === ""
    ) {
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
    <div>
      <Link to="/home">
        <button>Return to Home</button>
      </Link>
      <h1>New Videogame</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors?.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {errors?.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="text"
            value={Number(input.rating)}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {errors?.rating && <p>{errors.rating}</p>}
        </div>
        <div>
          <label>Released:</label>
          <input
            type="Date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {errors?.released && <p>{errors.released}</p>}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
          />
          {errors?.background_image && <p>{errors.background_image}</p>}
        </div>

        <div>
          <label>Genres:</label>
          <select id="genres" onChange={(e) => handleSelectGenres(e)}>
            
            <option default></option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
          {input.genres.map((genre) => (
            <div>
              <p>{genre}</p>
              <button type="button" onClick={() => handleDeleteGenres(genre)}>
                x
              </button>
            </div>
          ))}
        </div>

        <div>
          <label>Platforms:</label>
          <select id="platforms" onChange={(e) => handleSelectPlatforms(e)}>
          <option disabled selected="selected">Select...</option>
            {platforms.map((platform) => (
              <option value={platform.name}>{platform.name}</option>
            ))}
          </select>
          
          {input.platforms.map((platform) => (
            <div>
              <p>{platform}</p>
              <button
                type="button"
                onClick={() => handleDeletePlatforms(platform)}
              >
                x
              </button>
              
            </div>
          ))}
          {errors?.platforms && <p>{errors.platforms}</p>}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
