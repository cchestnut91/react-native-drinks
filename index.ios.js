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
import ProfileView from './src/screens/profileView'
import AddDrinkView from './src/screens/addDrinkView'
//import * as Home from './homeView'

export default class RootViewController extends Component {
  render() {
    const routes = [
      {title: 'Drink Keeper', name: 'home'},
      {title: 'Update Health Info', name: 'profile'},
      {title: 'Add Drink', name: 'add'},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={(route, navigator) => {
          switch(route.name) {
            case 'home':
              return <HomeView title={route.title} />
            case 'profile': 
              return <ProfileView title={route.title} />
            }
          }
        }
        navigationBar={
          <Navigator.NavigationBar
          routeMapper={{
            LeftButton: (route, navigator, index, navState) => { return (null); },
            RightButton: (route, navigator, index, navState) => { return (
              <TouchableHighlight onPress={() => {
                navigator.push(routes[1]);
                }}><Text>Profile</Text></TouchableHighlight>
              ); },
            Title: (route, navigator, index, navState) => { return (
              <Text>{route.title}</Text>
              ); },
       }}
       style={{backgroundColor: '#F90029'}}
     />
  }

      />
    )
  }
}

AppRegistry.registerComponent('RootViewController', () => RootViewController);
