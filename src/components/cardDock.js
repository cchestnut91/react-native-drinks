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
        toValue: this.state.offset.__getValue() == 0 ? (-this.height + 100) : 0
      }
    ).start()
  }
  onChildLayout(event) {
    this.height = event.nativeEvent.layout.height;
  }
  render() {
    return (
      <View style={[styles.container, {height:this.props.height}]}>
        <Animated.View style={{marginTop: this.state.offset}}>
          <TouchableWithoutFeedback onPress={() => this.toggleOffset()} onLayout={(event) => this.onChildLayout(event)}>
            <View>
              {this.props.children}
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
});
