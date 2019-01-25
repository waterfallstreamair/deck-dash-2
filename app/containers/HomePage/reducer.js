/*
 * HomeReducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS({
  posts: {
    all: false,
    filtered: false,
  },
  comments: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.TYPE_POSTS_SUCCESS:
      return state.setIn(['posts', 'all'], action.posts);
    case constants.TYPE_POSTS_FILTER_SUCCESS:
      return state.setIn(['posts', 'filtered'], action.filtered);
    case constants.TYPE_COMMENTS_SUCCESS:
      return state.setIn(['comments', action.post.id], action.comments);
    case constants.TYPE_COMMENTS_REMOVE:
      return state.setIn(['comments', action.id], false);
    default:
      return state;
  }
}

export default homeReducer;
