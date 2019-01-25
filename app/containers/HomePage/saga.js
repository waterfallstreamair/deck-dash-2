import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import request from 'utils/request';
import * as constants from './constants';
import * as actions from './actions';
import { makeSelectPosts } from './selectors';

export function* getPosts() {
  const url = constants.CONST_URL_POSTS;
  try {
    const posts = yield call(request, url);
    yield put(actions.getPosts({ posts }));
  } catch (e) {
    // yield put(actions.showInfo({ e }));
  }
}

export function* setPostsFilter(action) {
  const { search } = action;
  try {
    const posts = yield select(makeSelectPosts())
    const text = search ? search.toLowerCase() : null;
    const filtered = text
      ? posts.filter(e => e.title.toLowerCase().includes(text))
      : null;
    yield put(actions.setPostsFilter({ filtered }));
  } catch (e) {
    console.log({ e })
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
    takeLatest(constants.TYPE_POSTS_FILTER_REQUEST, setPostsFilter),
    takeLatest(constants.TYPE_COMMENTS_REQUEST, getComments),
  ]);
}
