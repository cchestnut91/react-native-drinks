import * as ActionTypes from '../actions/types'
import UUID from 'react-native-uuid'
import moment from 'moment'
const initialState = []

function projectedEndTime(action) {

}

function startTime(action) {

}

function sessionFromAction (action) {
  return {
    id: UUID.v4(),
    drinks: [action.drink],
    //endTime: projectedEndTime(action),
    //startTime: startTime(),
  }
}

function addDrinkToSession(session, drink) {
  return {
    ...session,
    drinks: session.drinks.concat(drink)
  };
}

export default function sessionsReducer(sessions = [], action) {
  switch(action.type) {
    case ActionTypes.ADD_SESSION:
      return sessions.concat(sessionFromAction(action));
    case ActionTypes.ADD_DRINK_TO_SESSION:
      var sessionID = action.session.id;
      return sessions.map(session => {
        if (session.id === sessionID) {
          return addDrinkToSession(session, action.drink);
        }
        return session;
      });
  }
  return sessions;
}
