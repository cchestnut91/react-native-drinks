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
import {Provider} from 'react-redux'
import store from './src/store'

export default class RootViewController extends Component {
  render() {
    const routes = {
      home: {title: 'Drink Keeper', name: 'home'},
      profile: {title: 'Update Health Info', name: 'profile'},
      add: {title: 'Add Drink', name: 'add'},
    };
    return (
      <Provider store={store}>
      <Navigator
        initialRoute={routes.home}
        renderScene={(route, navigator) => {
          switch(route.name) {
            case 'home':
              return <HomeView title={route.title} navigator={navigator} routes={routes}/>
            case 'profile': 
              return <ProfileView title={route.title} navigator={navigator} routes={routes}/>
            case 'add':
              return <AddDrinkView title={route.title} navigator={navigator} routes={routes}/>
          }
          }
        }
        navigationBar={
          <Navigator.NavigationBar
          routeMapper={{
            LeftButton: (route, navigator, index, navState) => { return (null); },
            RightButton: (route, navigator, index, navState) => { return (
              <TouchableHighlight onPress={() => {
                navigator.push(routes.profile);
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
     </Provider>
    )
  }
}

AppRegistry.registerComponent('RootViewController', () => RootViewController);
