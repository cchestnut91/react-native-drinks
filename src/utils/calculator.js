import moment from 'moment'

export function getEndTimeForSession(session, gender, weight) {
  var kgWeight = weight * 0.454;
  var weightMod = gender * kgWeight;
  var metConst = metabolismConstantForGender(gender);

  var consumed = 0;
  var bac = 0;
  var endTime = null;
  session.drinks.forEach((drink, index) => {
    var consumed = drink.size;
    var startBac = (bac * 100) + (consumed / weightMod);

    var drinkTime = drink.time;

    var metabolized = 0;
    bac = startBac;
    if (bac <= 0.0) {
      bac = 0.0;
    } else {
      bac = bac / 100;
    }

    var minutes = 1;

    if (session.drinks.length == (index + 1)) {
      while (bac * 100 >= 0.001) {
        metabolized = metConst * (minutes * (1 / 60.0));
        bac = startBac - metabolized;
        if (bac <= 0.0) {
          bac = 0.0;
        } else {
          bac = bac / 100;
        }

        minutes++;
      }
      endTime = drinkTime.clone().add(minutes, 'm');
    }
  });
  return endTime;
}

export function getBACForSessionAtTime(session, gender, weight, time) {
  var kgWeight = weight * 0.454;
  var weightMod = gender * kgWeight;
  var metConst = metabolismConstantForGender(gender);

  var consumed = 0;
  var bac = 0;
  var endTime = null;
  var peakBAC = 0;
  for (let index = 0; index < session.drinks.length; index++) {
    let drink = session.drinks[index];
    var consumed = drink.size;
    var startBac = (bac * 100) + (consumed / weightMod);

    var drinkTime = drink.time;

    var metabolized = 0;
    bac = startBac;
    if (bac <= 0.0) {
      bac = 0.0;
    } else {
      bac = bac / 100;
    }

    if (drinkTime.isSame(time, 'm')) {
      return bac;
    }

    var minutes = 1;

    var newTime = drinkTime.clone();

    if (session.drinks.length != (index + 1)) {
      while (newTime.isBefore(session.drinks[index+1].time)) {
        metabolized = metConst * (minutes * (1 / 60.0));
        bac = startBac - metabolized;
        if (bac <= 0.0) {
          bac = 0.0;
        } else {
          bac = bac / 100;
        }

        if (newTime.isSame(time, 'm')) {
          return bac;
        }

        minutes++;
        newTime = drinkTime.clone().add(minutes, 'm');
      }
    } else {
      while (bac * 100 >= 0.001) {

        metabolized = metConst * (minutes * (1 / 60.0));
        bac = startBac - metabolized;
        if (bac <= 0.0) {
          bac = 0.0;
        } else {
          bac = bac / 100;
        }

        if (newTime.isSame(time, 'm')) {
          return bac;
        }

        minutes++;
        newTime = drinkTime.clone().add(minutes, 'm');
      }
    }
    return 0;
  }
  return 'how..';
}

export function getPeakBACForSession(session, gender, weight) {
  var kgWeight = weight * 0.454;
  var weightMod = gender * kgWeight;
  var metConst = metabolismConstantForGender(gender);

  var consumed = 0;
  var bac = 0;
  var endTime = null;
  var peakBAC = 0;
  session.drinks.forEach((drink, index) => {
    var consumed = drink.size;
    var startBac = (bac * 100) + (consumed / weightMod);

    var drinkTime = drink.time;

    var metabolized = 0;
    bac = startBac;
    if (bac <= 0.0) {
      bac = 0.0;
    } else {
      bac = bac / 100;
    }

    peakBAC = bac;

    var minutes = 1;

    if (session.drinks.length != (index + 1)) {
      while (drinkTime.clone().add(minutes, 'm').isBefore(session.drinks[index+1].time)) {
        metabolized = metConst * (minutes * (1 / 60.0));
        bac = startBac - metabolized;
        if (bac <= 0.0) {
          bac = 0.0;
        } else {
          bac = bac / 100;
        }

        if (bac > peakBAC) {
          peakBAC = bac;
        }

        minutes++;
      }
    } else {
      while (bac * 100 >= 0.001) {
        metabolized = metConst * (minutes * (1 / 60.0));
        bac = startBac - metabolized;
        if (bac <= 0.0) {
          bac = 0.0;
        } else {
          bac = bac / 100;
        }

        if (bac > peakBAC) {
          peakBAC = bac;
        }

        minutes++;
      }
      endTime = drinkTime.clone().add(minutes, 'm');
    }
  });
  return peakBAC;
}

function metabolismConstantForGender(gender) {
  switch (gender) {
    case 0.49:
      return 0.017;
    case 0.58:
      return 0.015;
  }
  return 0.016;
}
