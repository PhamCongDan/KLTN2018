/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { EXEC_AUTH_FACEBOOK } from 'containers/FacebookAuth/constants';
import { LOAD_REPOS } from 'containers/App/constants';
import { makeSelectLocation } from 'containers/App/selectors';


import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* execFacebookAuth() {
  const location = yield select(makeSelectLocation());
  // // Select username from store
  const requestURL = `http://localhost:3000/auth/facebook/code${location.search}`;

  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(request, requestURL);
    console.log(user);
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* facebookUserData() {
  yield takeLatest(EXEC_AUTH_FACEBOOK, execFacebookAuth);
}

