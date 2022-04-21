import {
  GET_VIDEOGAMES,
  ORDER_BY_NAME,
  FILTER_BY_PROVENANCE,
} from "../actions/index";

const initialState = {
  allVideogames: [],
  videogames: [],
  filteredVideogames: [],
  genres: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload,
        //filteredVideogames: action.payload,
      };

    case ORDER_BY_NAME:
      let sortedVideogames = state.videogames.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === "ascendant" ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === "ascendant" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        videogames: sortedVideogames
      };

    case FILTER_BY_PROVENANCE:
      const allVideogames = state.allVideogames;
      const provenanceFilter =
        action.payload === "all"
          ? allVideogames
          : allVideogames.filter((el) => el.isDataBase === action.payload);
      return {
        ...state,
        videogames: provenanceFilter,
      };
    default:
      return state;
  }
}

export default rootReducer;

/* export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload,
      };
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        filteredVideogames: action.payload,
      };
    case SORT:
      let orderedVideogames = [...state.videogames];
      orderedVideogames = orderedVideogames.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === "ascendant" ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === "ascendant" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredVideogames: orderedVideogames,
      };
    default:
      return state;
  }
} */
