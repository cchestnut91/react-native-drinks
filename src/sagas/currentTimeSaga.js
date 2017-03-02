import {delay} from 'redux-saga';
import {put} from 'redux-saga/effects'
import * as CurrentTimeActions from '../actions/currentTime'
import moment from 'moment'

export default function* saga () {
  while (true) {
    yield put(CurrentTimeActions.updateTime(moment()));
    yield delay(1000);
  }
}
