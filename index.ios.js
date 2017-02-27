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
import HomeView from './src/screens/homeView'
//import * as Home from './homeView'

export default class RootViewController extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Drink Keeper', index: 0 }}
        renderScene={(route, navigator) =>
          <HomeView title={route.title} />
        }
        navigationBar={
          <Navigator.NavigationBar
          routeMapper={{
            LeftButton: (route, navigator, index, navState) => { return (null); },
            RightButton: (route, navigator, index, navState) => { return (<Text>Profile</Text>); },
            Title: (route, navigator, index, navState) => { return (<Text>{route.title}</Text>); },
       }}
       style={{backgroundColor: '#F90029'}}
     />
  }

      />
    )
  }
}

AppRegistry.registerComponent('RootViewController', () => RootViewController);
