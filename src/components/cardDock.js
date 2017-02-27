import React from 'react'
import {StyleSheet, View, Text, Animated, TouchableWithoutFeedback} from 'react-native'

export default class CardDock extends React.Component {
  state = {
    offset: new Animated.Value(0)
  };
  toggleOffset() {
    Animated.timing(
      this.state.offset,
      {
        toValue: this.state.offset.__getValue() == 0 ? -200 : 0
      }
    ).start()
  }
  render() {
    return (
      <View style={[styles.container, {height:this.props.height}]}>
        <Animated.View style={{marginTop: this.state.offset}}>
          <TouchableWithoutFeedback onPress={() => this.toggleOffset()}>
            <View>
              <View style={[styles.blue, {height: this.props.height}]}>
              </View>
              <View style={[styles.red, {height: this.props.height * 2}]}>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
  blue: {
    backgroundColor: 'blue'
  },
  red: {
    backgroundColor: 'orange'
  }
});
