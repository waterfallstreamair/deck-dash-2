import { fromJS } from 'immutable';

import homeReducer from '../reducer';
// import * as actions from '../actions';
import * as constants from '../constants';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      posts: false,
      comments: {},
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle TYPE_POSTS_SUCCESS action', () => {
    const post = {
      userId: 1,
      id: 1,
      title: 'title',
      body: 'body',
    };
    const expectedResult = state.set('posts', [post]);
    expect(
      homeReducer(state, {
        type: constants.TYPE_POSTS_SUCCESS,
        posts: [post],
      }),
    ).toEqual(expectedResult);
  });

  it('should handle TYPE_COMMENTS_SUCCESS action', () => {
    const post = {
      userId: 1,
      id: 1,
      title: 'title',
      body: 'body',
    };
    const comment = {
      postId: 1,
      id: 1,
      name: 'name',
      email: 'email',
      body: 'body',
    };
    const initialState = state.set('posts', [post]);
    const expectedResult = state
      .set('posts', [post])
      .setIn(['comments', post.id], [comment]);

    expect(
      homeReducer(initialState, {
        type: constants.TYPE_COMMENTS_SUCCESS,
        post,
        comments: [comment],
      }),
    ).toEqual(expectedResult);
  });

  it('should handle TYPE_COMMENTS_REMOVE action', () => {
    const post = {
      userId: 1,
      id: 1,
      title: 'title',
      body: 'body',
    };
    const comment = {
      postId: 1,
      id: 1,
      name: 'name',
      email: 'email',
      body: 'body',
    };
    const initialState = state
      .set('posts', [post])
      .setIn(['comments', post.id], [comment]);
    const expectedResult = state
      .set('posts', [post])
      .setIn(['comments', post.id], false);

    expect(
      homeReducer(initialState, {
        type: constants.TYPE_COMMENTS_REMOVE,
        post,
      }),
    ).toEqual(expectedResult);
  });
});
