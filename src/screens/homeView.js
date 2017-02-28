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
import * as AddDrinkActions from '../actions/addDrink';

const cardHeight = 100;

class HomeView extends Component {
  render() {
    return (
      <Screen>
        <View style={viewStyles.labelContainer}>
          <Text style={textStyles.largeLabel}>
            0.013
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
          <Text>
            Current Session
          </Text>
        </View>
        <CardDock height={cardHeight}>
          <View style={viewStyles.card}>
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
  }
});

const textStyles = StyleSheet.create({
  largeLabel: {
    fontSize: 62,
    color: '#F90029',
  },
  smallLabel: {

  },
});

HomeView.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object,
  routes: PropTypes.object
};

// export default HomeView;
export default connect()(HomeView);
