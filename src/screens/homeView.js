import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Screen from '../components/screen'
import CircleIcon from '../components/circleIcon'
import CardDock from '../components/cardDock'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect';
import * as AddDrinkActions from '../actions/addDrink'
import {latestSessionSelector, currentSessionSelector, peakBACForLastSessionSelector, currentBACSelector} from '../selectors/sessions'
import moment from 'moment'

const cardHeight = 100;

class HomeView extends Component {
  currentSessionText() {
    if (this.props.currentSession) {
      return 'Current Session';
    } else if (this.props.lastSession) {
      return 'Last Session';
    } else {
      return '';
    }
  }
  sessionLengthText() {
    if (this.session()) {
      var firstDrink = this.session().drinks.sort((a, b) => {
        return a.time.isAfter(b.time);
      })[0];
      var startTime = this.session().drinks[0].time;
      if (startTime.isSame(moment(), 'm')) {
        return 'Just Started';
      } else {
        return this.formatTimeDiff(startTime.diff(moment(), 'm'));
      }
    } else if (this.props.lastSession) {
      return 'Last Session';
    } else {
      return 'No Sessions';
    }
  }
  formatTimeDiff(numMinutes) {
    numMinutes = -1 * numMinutes;
    var numHours = Math.floor(numMinutes / 60);
    numMinutes = numMinutes % 60;
    var ret = "";
    if (numHours == 0) {
      return numMinutes + " Minutes";
    } else {
      var minString;
      if (numMinutes < 10) {
        minString = '0'+numMinutes;
      } else {
        minString = numMinutes;
      }
      return numHours+':'+minString + ' Hours';
    }
  }
  numberOfDrinks() {
    if (this.props.currentSession != null) {
      return this.props.currentSession.drinks.length;
    } else if (this.props.lastSession != null) {
      return this.props.lastSession.drinks.length;
    }
    return null;
  }
  shouldSlide() {
    return this.session() != null;
  }
  session() {
    if (this.props.currentSession != null) {
      return this.props.currentSession;
    } else if (this.props.lastSession != null) {
      return this.props.lastSession;
    }
    return null;
  }
  formatBac(bacValue) {
    return (bacValue * 100).toFixed(3);
  }
  render() {
    return (
      <Screen>
        <View style={viewStyles.labelContainer}>
          <Text style={textStyles.largeLabel}>
            {`${this.formatBac(this.props.currentBAC)}`}
          </Text>
          <Text style={textStyles.smallLabel}>
            Current B.A.C.
          </Text>
        </View>
        <View style={viewStyles.buttonContainer}>
          <View style={viewStyles.buttonWrapper}>
            <CircleIcon icon='COCKTAIL' background='white' onPress={() => {
              this.props.dispatch(AddDrinkActions.addCocktailType());
              this.props.navigator.push(this.props.routes.add)
            }}/>
            <CircleIcon icon='WINE' background='white' onPress={() => {
              this.props.dispatch(AddDrinkActions.addWineType())
              this.props.navigator.push(this.props.routes.add)
            }}/>
            <CircleIcon icon='BEER' background='white' onPress={() => {
              this.props.dispatch(AddDrinkActions.addBeerType())
              this.props.navigator.push(this.props.routes.add)
            }}/>
          </View>
          <Text style={{color: 'white'}}>
            {this.currentSessionText()}
          </Text>
        </View>
        <CardDock height={cardHeight} shouldSlide={this.shouldSlide()}>
          <View style={viewStyles.card}>
            <View style={viewStyles.detailHeaderContainer}>
              <Text style={textStyles.sessionDetailsHeader}>
                {this.sessionLengthText()}
              </Text>
            </View>
            <View style={viewStyles.detailContainer}>
              <Text style={textStyles.sessionDetailsLabel}>
                Number of Drinks
              </Text>
              <Text style={textStyles.sessionDetailsValue}>
                {this.numberOfDrinks()}
              </Text>
              <Text style={textStyles.sessionDetailsLabel}>
                Peak B.A.C.
              </Text>
              <Text style={textStyles.sessionDetailsValue}>
                {this.formatBac(this.props.peakBac)}
              </Text>
            </View>
          </View>
        </CardDock>
      </Screen>
    );
  }
}

const viewStyles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    height: 160,
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#F90029',
    flex:1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 8,
    justifyContent: 'space-between'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    height: 243
  },
  red: {
    backgroundColor: 'orange'
  },
  detailHeaderContainer: {
    height: 100,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  detailContainer: {
    paddingHorizontal: 8,
  }
});

const textStyles = StyleSheet.create({
  largeLabel: {
    fontSize: 62,
    color: '#F90029',
  },
  smallLabel: {

  },
  sessionDetailsHeader: {
    color: '#F90029',
    fontSize: 52,
  },
  sessionDetailsLabel: {
    fontSize: 20,
  },
  sessionDetailsValue: {
    textAlign: 'right',
    color: '#F90029',
    fontSize: 30,
  }
});

HomeView.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object,
  routes: PropTypes.object
};

const selector = createStructuredSelector({
  currentSession: currentSessionSelector,
  lastSession: latestSessionSelector,
  peakBac: peakBACForLastSessionSelector,
  currentBAC: currentBACSelector
});

// export default HomeView;
export default connect(selector)(HomeView);
