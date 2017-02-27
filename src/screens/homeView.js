import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Screen from '../components/screen'
import CircleIcon from '../components/circleIcon'

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
          <View style={viewStyles.buttonWrapper}>
            <CircleIcon />
            <CircleIcon />
            <CircleIcon />
          </View>
          <Text>
            Current Session
          </Text>
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
  slidingView: {
    height: 100,
  },
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
};
