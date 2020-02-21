import { TEST_DISPATCH, FOLLOW_USER } from "../actions/Types";

//creates initial state
const initialState = {
  user: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return { ...state, user: action.payload };
    case FOLLOW_USER:
      return { ...state, loading: false, user: action.payload };
    default:
      return state;
  }
}
