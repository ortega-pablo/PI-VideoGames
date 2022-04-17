import { FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES } from "../actions/index";

const initialState = {
  videogames: [],
  genres: [],
  detail: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    default:
      return state;
  }
}
