import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from './constants';
import * as postsActions from './actions';
import request from 'utils/request';

export function* getPosts() {
  const url = constants.CONST_URL_POSTS;
  try {
    const posts = yield call(request, url);
    yield put(postsActions.getPosts({ posts }));
  } catch (e) {
    console.log({ e });
  }
}

export function* getComments(action) {
  const { post } = action;
  const url = constants.CONST_URL_COMMENTS.replace('postId', post.id);
  try {
    const comments = yield call(request, url);
    yield put(postsActions.getComments({post, comments}));
  } catch (e) {
    //yield put(repoLoadingError(err));
    console.log({ e });
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* postsData() {
  return yield takeLatest(constants.TYPE_POSTS_REQUEST, getPosts);
  //yield takeLatest(constants.TYPE_COMMENTS_REQUEST, getComments);
}
