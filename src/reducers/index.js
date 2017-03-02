import { combineReducers } from 'redux'
import addDrink from './addDrink'
import profile from './profile'
import drinks from './drinks'
import sessions from './sessions'

export default combineReducers({
  addDrink,
  profile,
  drinks,
  sessions
})
