import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions/index";
import sty from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(name));
  }

  return (
    <div className={sty.searchbar}>
      <input
        className={sty.input}
        type="text"
        value={name}
        placeholder="What are you looking for?"
        onChange={(e) => handleImputChange(e)}
      />
      <button
        className={sty.btnSearch}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
