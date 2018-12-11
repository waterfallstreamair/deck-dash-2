/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import { selectHome } from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './Page';

import * as postActions from './actions';

const mapStateToProps = state => ({
  posts: selectHome(state)
});

const mapDispatchToProps = dispatch => ({
  getPostsRequest: () => dispatch(postActions.getPostsRequest()),
  getCommentsRequest: options => dispatch(postActions.getCommentsRequest(options)),
  removeComments: options => dispatch(postActions.removeComments(options))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);

/*
export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: e => dispatch(changeUsername(e.target.value)),
    onSubmitForm: e => {
      e.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  posts: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});
*/