import * as ActionTypes from './types';
import moment from 'moment';

export function updateTime(time = moment()) {
  return {type: ActionTypes.UPDATE_TIME, time}
}
