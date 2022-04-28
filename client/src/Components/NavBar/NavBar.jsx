import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { getVideogames } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar'
import sty from "./NavBar.module.css"

export default function NavBar() {
    const dispatch = useDispatch("");
    
    useEffect(() => {
        dispatch(getVideogames());
      }, [dispatch]);
      
    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
      }

  return (
    <div className={sty.navbar}>
        <button  className={sty.btn} onClick={(e) => { handleClick(e)}} >Recharge</button>
        <Link to={"/create"}><button className={sty.btn} >Create</button></Link>
        <SearchBar />
    </div>
  )
}
