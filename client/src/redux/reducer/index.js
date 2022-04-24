import {
  GET_VIDEOGAMES,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  FILTER_BY_PROVENANCE,
  FILTER_BY_GENRE,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  GET_PLATFORMS,
  GET_DETAILS,
} from "../actions/index";

const initialState = {
  allVideogames: [],
  videogames: [],
  filteredVideogames: [],
  genres: [],
  detail: [],
  platforms: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload,
      };

    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case ORDER_BY_NAME:
      let sortedVideogamesName = state.videogames.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === "asc" ? -1 : 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === "asc" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        videogames: sortedVideogamesName,
      };

    case ORDER_BY_RATING:
      let sortedVideogamesRating = state.videogames.sort((a, b) => {
        if (a.rating < b.rating) {
          return action.payload === "ascendant" ? -1 : 1;
        }
        if (a.rating > b.rating) {
          return action.payload === "ascendant" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        videogames: sortedVideogamesRating,
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

    case FILTER_BY_GENRE:
      const allGenreVideogames = state.allVideogames;
      const videogamesFiltered = [];
      allGenreVideogames.forEach((videogame) =>
        videogame.genres.forEach((genre) => {
          if (genre.name === action.payload) {
            videogamesFiltered.push(videogame);
          }
        })
      );

      return {
        ...state,
        videogames:
          action.payload === "all" ? allGenreVideogames : videogamesFiltered,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
