import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Screen from '../components/screen'
import CircleIcon from '../components/circleIcon'
import CardDock from '../components/cardDock'

const cardHeight = 100;

export default class ProfileView extends Component {
  render() {
    return (
      <Screen>
        <View style={viewStyles.topView}>
          <CircleIcon icon='SCALE' background='#F90029'/>
          <CircleIcon icon='GENDER' background='#F90029'/>
        </View>
        <View style={viewStyles.middleView}>
          <View style={viewStyles.textContainer}>
            <Text style={textStyles.header}>
              Weight
            </Text>
            <Text style={textStyles.header}>
              Sex
            </Text>
          </View>
          <View style={viewStyles.textContainer}>
            <Text style={textStyles.value}>
              190
            </Text>
            <Text style={textStyles.value}>
              Male
            </Text>
          </View>
        </View>
        <View style={viewStyles.bottomView}>
          <CircleIcon icon='CHECK' background='#F90029' />
        </View>
      </Screen>
    );
  }
}

const viewStyles = StyleSheet.create({
  topView: {
    height: 160,
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  middleView: {
    backgroundColor: '#F90029',
    flex:1,
  },
  bottonView: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

const textStyles = StyleSheet.create({
  header: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  value: {
    color: 'white',
    textAlign: 'center'
  }
});

ProfileView.propTypes = {
  title: PropTypes.string.isRequired,
};
