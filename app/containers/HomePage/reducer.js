/*
 * HomeReducer
 *
 */

//import { fromJS } from 'immutable';
import * as constants from './constants';
/*
export const initialState = fromJS({
  posts: null,
  comments: null
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.TYPE_POSTS_SUCCESS:
      return state.set('posts', action.posts);
    case constants.TYPE_COMMENTS_SUCCESS:
      const i = state.get('posts').indexOf(e => e.id === action.post.id);
      return state.setIn(['posts', i, 'comments'], action.comments);
    case constants.TYPE_COMMENTS_REMOVE:
      const i = state.get('posts').indexOf(e => e.id === action.post.id);
      return state.setIn(['posts', i, 'comments'], null);
    default:
      return state;
  }
}

export default homeReducer;
*/
export const initialState = []

const posts = (state = initialState, action) => {
  switch (action.type) {
    
    case constants.TYPE_POSTS_SUCCESS:
      return [...state, ...action.posts];
      
    case constants.TYPE_COMMENTS_SUCCESS:
      return state.map(e => 
        e.id === action.post.id ? { ...e, comments: action.comments } : e
      );
      
    case constants.TYPE_COMMENTS_REMOVE:
      return state.map(e => 
        e.id === action.post.id ? { ...e, comments: null } : e
      );
      
    default:
      return state;
  }
};

export default posts;
