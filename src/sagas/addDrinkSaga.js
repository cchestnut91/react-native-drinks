import {takeEvery} from 'redux-saga';
import {take, put, select} from 'redux-saga/effects';
import {sessionsSelector, latestSessionSelector, currentSessionSelector} from '../selectors/sessions';
import * as ActionTypes from '../actions/types'
import * as AddDrinkActions from '../actions/addDrink';

import {getEndTimeForSession} from '../utils/calculator';
function getLatestSession () {

}

function* addDrinkSaga (action) {
  var session = yield select(currentSessionSelector);

  if (session == null) {
    // create a session
    yield put(AddDrinkActions.addSession(action.id));
  } else {
    yield put(AddDrinkActions.addDrinkToSession(action.id, session));
  }
}

export default function* saga () {
  yield takeEvery(ActionTypes.SAVE_DRINK, addDrinkSaga)
}
