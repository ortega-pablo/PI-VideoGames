import React, {useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { Link ,useParams } from 'react-router-dom'
import { getDetail } from '../../redux/actions'


export default function VideogameDetail(props) {

  const {id} = useParams()
  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDetail(id))
  },[dispatch])

  const myVideogame = useSelector((state)=>state.detail)

  return (
    <div>
      {
        myVideogame.length>0 ?
        <div>
          <h1>{myVideogame[0].name}</h1>
          <img src={myVideogame[0].background_image}/>
          <p>{myVideogame[0].description.replace(/<[^>]*>?/g,'')}</p>
          <h2>Released: {myVideogame[0].released}</h2>
          <h2>Rating: {myVideogame[0].rating}</h2>
          <h2>Genres:</h2>
          <div >
            {myVideogame[0].genres.map(genre=><h3 key={genre.name}>{genre.name}</h3>)}
        </div>
          <h2>Platforms:</h2>
          <div>
            {myVideogame[0].platforms.map(platform=><h3 key={platform.name}>{platform.name}</h3>)}
        </div>
        </div>
        : <p>Loading...</p>
      }
      <Link to="/home" ><button>Return</button></Link>
    </div>
  )
}

        
