import {fork} from 'redux-saga/effects';
import addDrinkSaga from './addDrinkSaga';

export default function* rootSaga () {
  yield [
    fork(addDrinkSaga)
  ];
}
