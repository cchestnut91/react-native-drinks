import * as ActionTypes from '../actions/types'
const initialState = {
  weight: 170,
  sex: 0.535,
  showWeightPicker: false,
  showSexPicker: false,
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_SEX:
      return {...state, sex: action.sex};
    case ActionTypes.SET_WEIGHT:
      return {...state, weight: action.weight};
    case ActionTypes.TOGGLE_WEIGHT_PICKER:
      return {...state, showWeightPicker: action.shouldShow};
    case ActionTypes.TOGGLE_SEX_PICKER:
      return {...state, showSexPicker: action.shouldShow};
  }
  return state;
}
