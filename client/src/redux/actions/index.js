import axios from "axios"
export const FETCH_VIDEOGAMES = "FETCH_VIDEOGAMES"
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES"



export function fetchVideogames() {
 return function (dispatch) {
    axios.get("http://localhost:3001/api/videogames")
    .then((videogames) => {
      dispatch ({
        type:FETCH_VIDEOGAMES,
        payload: videogames.data
      })
    })
    .catch((error) =>{
      console.log(error)
    })
 }
}


export function searchVideogames(search) {
  return function (dispatch) {
     axios.get(`http://localhost:3001/api/videogames?name=${search}`)
     .then((videogames) => {
       dispatch ({
         type:SEARCH_VIDEOGAMES,
         payload: videogames.data
       })
     })
     .catch((error) =>{
       console.log(error)
     })
  }
 }