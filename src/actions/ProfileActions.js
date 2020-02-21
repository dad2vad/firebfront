import Axios from "axios";

import { GET_PROFILE, PROFILE_LOADING, GET_POSTS } from "./Types";

export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const getProfile = username => dispatch => {
  dispatch(profileLoading());
  Axios.get(`https://53o8qypq5x.sse.codesandbox.io/api/profile/${username}`)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};
