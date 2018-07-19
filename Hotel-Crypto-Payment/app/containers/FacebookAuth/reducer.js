/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  EXEC_AUTH_FACEBOOK,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
});

function facebookAuthReducer(state = initialState, action) {
  switch (action.type) {
    case EXEC_AUTH_FACEBOOK:
      // Delete prefixed '@' from the github username
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    default:
      return state;
  }
}

export default facebookAuthReducer;
