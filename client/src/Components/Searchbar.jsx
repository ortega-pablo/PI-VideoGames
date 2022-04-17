import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../redux/actions";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch()
  function onSubmit(e) {
    e.preventDefault()
    dispatch(searchVideogames(search))
  }

  function onImputChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onImputChange} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
