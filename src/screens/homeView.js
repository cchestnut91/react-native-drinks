import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Screen from '../components/screen'

export default class HomeView extends Component {
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
        </View>
        <View style={viewStyles.slidingView}>
        </View>
      </Screen>
    );
  }
}

const viewStyles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    flex: 3
  },
  buttonContainer: {
    backgroundColor: '#F90029',
    flex: 4
  },
  slidingView: {
    flex: 1
  },
});

const textStyles = StyleSheet.create({
  largeLabel: {
    fontSize: 62,
    color: '#F90029'
  },
  smallLabel: {

  },
});

HomeView.propTypes = {
  title: PropTypes.string.isRequired,
};
