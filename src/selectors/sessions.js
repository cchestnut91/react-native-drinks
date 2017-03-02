import {createSelector} from 'reselect';
import {getEndTimeForSession, getPeakBACForSession} from '../utils/calculator'
import moment from 'moment'

const sessionEntitiesSelector = state => state.sessions;
const drinkEntitiesSelector = state => state.drinks;
const genderSelector = state => state.profile.sex;
const weightSelector = state => state.profile.weight;

export const sessionsSelector = createSelector(
  sessionEntitiesSelector,
  drinkEntitiesSelector,
  (sessions, drinks) => {
    return sessions.map(session => {
      return {
        ...session,
        drinks: session.drinks.map(drinkId => drinks[drinkId])
      };
    });
  }
);

export const currentSessionSelector = createSelector(
  sessionsSelector,
  genderSelector,
  weightSelector,
  (sessions, gender, weight) => {
    return sessions.find(session => {
      var endTime = getEndTimeForSession(session, gender, weight);
      var now = moment();
      return endTime.isAfter(now) || endTime.isSame(now);
    });
  }
);

export const latestSessionSelector = createSelector(
  sessionsSelector,
  genderSelector,
  weightSelector,
  (sessions, gender, weight) => {
    if (sessions.length) {
      return sessions.sort((sessionA, sessionB) => {
        return getEndTimeForSession(sessionA).isAfter(getEndTimeForSession(sessionB));
      })[0];
    } else {
      return null;
    }
  }
);

export const peakBACForLastSessionSelector = createSelector(
  currentSessionSelector,
  latestSessionSelector,
  (current, latest) => {
    if (current) {
      return getPeakBACForSession(current);
    } else if (latest) {
      return getPeakBACForSession(latest);
    }
    return 0;
  }
);
