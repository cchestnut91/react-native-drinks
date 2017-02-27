import React from 'react'
import {View, StyleSheet, Image} from 'react-native'

const SIZE = 80;

const IMG_COCKTAIL = require('../img/liquorGlassSmall.png')
const IMG_WINE = require('../img/wineSmall.png')
const IMG_BEER = require('../img/beerGlassSmall.png')

export default class CircleIcon extends React.Component {
  render () {
    return (
      <View style={styles.circle}>
        <Image source={IMG_COCKTAIL} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'white',
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent : 'center',
  }
});
