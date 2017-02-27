/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
} from 'react-native';
import HomeView from './homeView'

export default class RootViewController extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Drink Keeper', index: 0 }}
        renderScene={(route, navigator) =>
          <HomeView title={route.title} />
        }
      />
    )
  }
}

AppRegistry.registerComponent('RootViewController', () => RootViewController);
