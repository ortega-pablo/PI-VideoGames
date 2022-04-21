import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_BY_PROVENANCE = "FILTER_BY_PROVENANCE";


export function getVideogames() {
  return async function (dispatch) {
    var videogames = await axios.get("http://localhost:3001/api/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: videogames.data,
    });
  };
}

export function orderByName(payload) {
  return {
      type: ORDER_BY_NAME,
      payload
    }
  }


export function filterVideogamesByProvenance(payload) {
  return {
      type: FILTER_BY_PROVENANCE,
      payload
    }
  }

