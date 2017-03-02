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

export function getCurrentBACForSession(seession, gender, weight) {
  
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
