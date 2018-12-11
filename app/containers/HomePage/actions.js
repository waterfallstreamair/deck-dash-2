import * as constants from './constants';

export const getPostsRequest = (options) => {
  return { 
    type: constants.TYPE_POSTS_REQUEST 
  }
};

export const getPosts = (options) => {
  const { posts } = options;
  return {
    type: constants.TYPE_POSTS_SUCCESS,
    posts: posts.slice(0, 10)
  };
};

export const getCommentsRequest = (options) => {
  const { post } = options;
  return { 
    type: constants.TYPE_COMMENTS_REQUEST, 
    post 
  }
};

export const getComments = (options) => {
  const { post, comments } = options;
  return {
    type: constants.TYPE_COMMENTS_SUCCESS,
    post,
    comments
  };
};

export const removeComments = (options) => {
  const { post } = options;
  return {
    type: constants.TYPE_COMMENTS_REMOVE,
    post
  };
};