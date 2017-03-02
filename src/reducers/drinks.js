import * as ActionTypes from '../actions/types'
import moment from 'moment'
const initialState = {}

function drinkModelFromAction (action) {
  return {
    drinkType: action.drinkType, 
    time: timeFromAction(action),
    size: action.size,
    id: action.id
  };
};

function timeFromAction(action) {
  var mom = moment();
  return mom.subtract(action.time, 'm');
}

export default function drinksReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.SAVE_DRINK:
      return {
        ...state, 
        [action.id]: drinkModelFromAction(action)
      };
  }
  return state;
}
