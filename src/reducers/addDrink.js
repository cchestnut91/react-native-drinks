import * as ActionTypes from '../actions/types'
const initialState = {
  type: null,
  size: null,
  time: null,
  timePickerOpen: false,
  sizePickerOpen: false
}

export default function addDrinkReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_DRINK_TYPE:
      return {...state, type: action.drinkType, time: 10, size: 1};
    case ActionTypes.TOGGLE_TIME_PICKER: 
      return {...state, timePickerOpen: action.shouldShow};
    case ActionTypes.TOGGLE_SIZE_PICKER:
      return {...state, sizePickerOpen: action.shouldShow};
    case ActionTypes.ADD_TIME:
      return {...state, time: action.time}
    case ActionTypes.ADD_SIZE:
      return {...state, size: action.size}
    case ActionTypes.SAVE_DRINK:
      return initialState;
  }
  return state;
}
