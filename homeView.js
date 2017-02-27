import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class HomeView extends Component {
  render() {
    return (
      <View>
        <View style={viewStyles.navBar}>
          <Text style={textStyles.title}>
            {this.props.title}
          </Text>
        </View>
        <View style={{flex: 1}>
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
        </View>
      </View>
    );
  }
}

const viewStyles = StyleSheet.create({
  navBar: {
    backgroundColor: '#F90029',
    height: 64,
  },
  labelContainer: {
    alignItems: 'center',
    flex: 4
  },
  buttonContainer: {
    backgroundColor: '#F90029',
    flex: 3
  },
  slidingView: {
    flex: 1
  },
});

const textStyles = StyleSheet.create({
  title: {
    marginTop: 30,
    textAlign: 'center'
  },
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
