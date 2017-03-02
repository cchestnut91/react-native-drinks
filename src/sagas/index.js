import {fork} from 'redux-saga/effects';
import addDrinkSaga from './addDrinkSaga';
import currentTimeSaga from './currentTimeSaga';

export default function* rootSaga () {
  yield [
    fork(addDrinkSaga),
    fork(currentTimeSaga),
  ];
}
