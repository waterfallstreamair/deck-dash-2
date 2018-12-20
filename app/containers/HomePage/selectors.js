/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectPosts = () =>
  createSelector(selectHome, homeState => homeState.get('posts'));

const makeSelectComments = () =>
  createSelector(selectHome, homeState => homeState.get('comments'));

export { selectHome, makeSelectPosts, makeSelectComments };
