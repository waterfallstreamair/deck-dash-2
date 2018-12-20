/*
 * HomeReducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS({
  posts: false,
  comments: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.TYPE_POSTS_SUCCESS:
      return state.set('posts', action.posts);
    case constants.TYPE_COMMENTS_SUCCESS:
      return state.setIn(['comments', action.post.id], action.comments);
    case constants.TYPE_COMMENTS_REMOVE:
      return state.setIn(['comments', action.post.id], false);
    default:
      return state;
  }
}

export default homeReducer;
