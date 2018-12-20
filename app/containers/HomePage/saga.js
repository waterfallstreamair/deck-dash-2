import { call, put, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';
import * as constants from './constants';
import * as actions from './actions';

export function* getPosts() {
  const url = constants.CONST_URL_POSTS;
  try {
    const posts = yield call(request, url);
    yield put(actions.getPosts({ posts }));
  } catch (e) {
    // yield put(actions.showInfo({ e }));
  }
}

export function* getComments(action) {
  const { post } = action;
  const url = constants.CONST_URL_COMMENTS.replace('{postId}', post.id);
  try {
    const comments = yield call(request, url);
    yield put(actions.getComments({ post, comments }));
  } catch (e) {
    // yield put(actions.showInfo({ e }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* postsData() {
  yield all([
    takeLatest(constants.TYPE_POSTS_REQUEST, getPosts),
    takeLatest(constants.TYPE_COMMENTS_REQUEST, getComments),
  ]);
}
