import {
  TEST_DISPATCH,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  GET_PROFILE
} from "../actions/Types";

//creates initial state
const initialState = {
  profiles: [],
  profile: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return { ...state, user: action.payload };
    case PROFILE_LOADING:
      return { ...state, loading: true };
    // case GET_PROFILES:
    //   return { ...state, posts: action.payload, loading: false };
    case GET_PROFILE:
      return { ...state, profile: action.payload, loading: false };
    default:
      return state;
  }
}
