import {createSelector} from 'reselect';
import {getEndTimeForSession, getPeakBACForSession, getBACForSessionAtTime} from '../utils/calculator'
import moment from 'moment'

const sessionEntitiesSelector = state => state.sessions;
const drinkEntitiesSelector = state => state.drinks;
const genderSelector = state => state.profile.sex;
const weightSelector = state => state.profile.weight;
const currentTimeSelector = state => state.currentTime

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
  currentTimeSelector,
  (sessions, gender, weight, now) => {
    return sessions.find(session => {
      var endTime = getEndTimeForSession(session, gender, weight);
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

export const currentBACSelector = createSelector(
  currentSessionSelector,
  genderSelector,
  weightSelector,
  currentTimeSelector,
  (current, gender, weight, now) => {
    if (current) {
      var out = getBACForSessionAtTime(current, gender, weight, now);
      return out;
    } else {
      return 0.000;
    }
  }
)

export const peakBACForLastSessionSelector = createSelector(
  currentSessionSelector,
  latestSessionSelector,
  genderSelector,
  weightSelector,
  (current, latest, gender, weight) => {
    if (current) {
      return getPeakBACForSession(current, gender, weight);
    } else if (latest) {
      return getPeakBACForSession(latest, gender, weight);
    }
    return 0;
  }
);
