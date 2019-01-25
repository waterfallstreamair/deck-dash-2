/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectPosts = () =>
  createSelector(selectHome, homeState => homeState.getIn(['posts', 'all']));

const makeSelectFiltered = () =>
  createSelector(selectHome, homeState => homeState.getIn(['posts', 'filtered']));

const makeSelectComments = () =>
  createSelector(selectHome, homeState => homeState.get('comments'));

export { 
  selectHome, 
  makeSelectPosts, 
  makeSelectFiltered,
  makeSelectComments,
};
