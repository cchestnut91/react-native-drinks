import * as ActionTypes from './types';

function addDrinkType(drinkType) {
  return {type: ActionTypes.ADD_DRINK_TYPE, drinkType}
}

export function addBeerType() {
  return addDrinkType('beer');
}

export function addWineType() {
  return addDrinkType('wine');
}

export function addCocktailType() {
  return addDrinkType('cocktail');
}

export function toggleSizePicker(shouldShow) {
  return {type: ActionTypes.TOGGLE_SIZE_PICKER, shouldShow };
}

export function toggleTimePicker(shouldShow) {
  return {type: ActionTypes.TOGGLE_TIME_PICKER, shouldShow };
}

export function setTime(time) {
  return {type: ActionTypes.ADD_TIME, time};
}

export function setSize(size) {
  return {type: ActionTypes.ADD_SIZE, size};
}

export function saveDrink() {
  return {type: ActionTypes.SAVE_DRINK};
}
