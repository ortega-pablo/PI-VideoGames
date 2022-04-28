import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const FILTER_BY_PROVENANCE = "FILTER_BY_PROVENANCE";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";


export const GET_DETAILS = "GET_DETAILS";

export function getVideogames() {
  return async function (dispatch) {
    try {
      var videogames = await axios.get("http://localhost:3001/api/videogames");
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: videogames.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      var videogames = await axios.get(
        `http://localhost:3001/api/videogames?name=${name}`
      );
      return dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: videogames.data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      var genres = await axios.get("http://localhost:3001/api/genres");
      return dispatch({
        type: GET_GENRES,
        payload: genres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    try {
      var platforms = await axios.get("http://localhost:3001/api/platforms");
      return dispatch({
        type: GET_PLATFORMS,
        payload: platforms.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      const newVideogame = await axios.post(
        "http://localhost:3001/api/videogames",
        payload
      );
      return newVideogame;
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
}

export function filterVideogamesByProvenance(payload) {
  return {
    type: FILTER_BY_PROVENANCE,
    payload,
  };
}

export function filterVideogamesByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var videogameDetail = await axios.get(`http://localhost:3001/api/videogames/${id}`,id);
      return dispatch({
        type: GET_DETAILS,
        payload: videogameDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteVideogame(id){
  return async function (dipatch) {
      try {
          await axios.delete(`http://localhost:3001/api/videogames/${id}`)
      } catch (error) {
          console.log(error)
      }
  }
}
