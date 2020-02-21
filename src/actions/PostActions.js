import Axios from "axios";

import {
  // TEST_DISPATCH,
  GET_ERRORS,
  GET_POSTS,
  // GET_POST,
  POST_LOADING,
  ADD_POST
} from "./Types";

export const postLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const getPosts = () => dispatch => {
  dispatch(postLoading());
  Axios.get("https://53o8qypq5x.sse.codesandbox.io/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: {} }));
};

export const addPost = newPost => dispatch => {
  dispatch(postLoading());
  Axios.post("https://53o8qypq5x.sse.codesandbox.io/api/posts", newPost)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: {} }));
};

export const likePost = id => dispatch => {
  Axios.post(`https://53o8qypq5x.sse.codesandbox.io/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const addComment = (id, newComment) => dispatch => {
  console.log(newComment);
  Axios.post(
    `https://53o8qypq5x.sse.codesandbox.io/api/posts/comment/${id}`,
    newComment
  )
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const likeComment = (commentID, id) => dispatch => {
  Axios.post(
    `https://53o8qypq5x.sse.codesandbox.io/api/posts/like/${id}/${commentID}`
  )
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
