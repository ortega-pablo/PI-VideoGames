import React, { useEffect, useState } from 'react'
import { useParams } from "react-router"
import axios from 'axios'

export default function VideogameDetail() {
  const [videogame, setVideogame] = useState(null)
  let {id} = useParams()
  useEffect(()=>{
    axios.get(`http://localhost:3001/api/videogames/${id}`)
    .then((response)=>{
      setVideogame(response.data)
    })
    return () => {
      setVideogame(null)
    }
  }, [])
  return (
    <div >
      videogame?
      <>
      <h3>{videogame.name}</h3>
        {<img src={videogame.image} alt='imagen'/>}
        <h4>Rating: {videogame.rating}</h4>
      </> :
      <div>Louding</div>
        
    </div>
  )
}
