import * as ActionTypes from './types';

export function setSex(sexValue) {
  return {type: ActionTypes.SET_SEX, sex: sexValue};
}

export function setWeight(weight) {
  return {type: ActionTypes.SET_WEIGHT, weight};
}

export function setShowWeight(show) {
  return {type: ActionTypes.TOGGLE_WEIGHT_PICKER, shouldShow: show};
}

export function setShowSex(show) {
  return {type: ActionTypes.TOGGLE_SEX_PICKER, shouldShow: show};
}
