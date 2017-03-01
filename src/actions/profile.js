import * as ActionTypes from './types';

export function setSex(sexValue) {
  return {type: ActionTypes.SET_SEX, sex: sexValue};
}

export function setWeight(weight) {
  return {type: ActionTypes.SET_WEIGHT, weight};
}

export function setWeightPickerHidden(hidden) {
  console.log('hide', hidden);
  return {type: ActionTypes.TOGGLE_WEIGHT_PICKER, shouldShow: hidden};
}

export function setSexPickerHidden(hidden) {
  return {type: ActionTypes.TOGGLE_SEX_PICKER, shouldShow: !hidden};
}
