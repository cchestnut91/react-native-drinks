import * as ActionTypes from '../actions/types'
import moment from 'moment'

export default function timeReducer(time = moment(), action) {
  switch (action.type) {
    case ActionTypes.UPDATE_TIME:
      return action.time;
  }
  return time;
}
