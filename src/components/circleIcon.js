import React, {PropTypes} from 'react'
import {View, StyleSheet, Image} from 'react-native'

const SIZE = 80;

const IMG_COCKTAIL = require('../img/liquorGlassSmall.png')
const IMG_WINE = require('../img/wineSmall.png')
const IMG_BEER = require('../img/beerGlassSmall.png')
const IMG_CHECK = require('../img/check.png')
const IMG_SCALE = require('../img/scale.png')
const IMG_GENDER = require('../img/gender_white.png')
const IMG_SIZE = require('../img/size.png')
const IMG_CLOCK = require('../img/clock.png')

export default class CircleIcon extends React.Component {
  getImage() {
    let icon = this.props.icon;
    console.log(icon);
    console.log(this.props.background);
    if (icon == 'WINE') {
      return IMG_WINE;
    } else if (icon == 'BEER') {
      return IMG_BEER;
    } else if (icon == 'COCKTAIL') {
      return IMG_COCKTAIL;
    } else if  (icon == 'CHECK') {
      return IMG_CHECK;
    } else if  (icon == 'SCALE') {
      return IMG_SCALE;
    } else if  (icon == 'GENDER') {
      return IMG_GENDER;
    } else if  (icon == 'SIZE') {
      return IMG_SIZE;
    } else if  (icon == 'CLOCK') {
      return IMG_CLOCK;
    }
    return IMG_COCKTAIL;
  }
  render () {
    return (
      <View style={[styles.circle, {backgroundColor:this.props.background}]}>
        <Image source={this.getImage()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent : 'center',
  }
});

CircleIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired
};