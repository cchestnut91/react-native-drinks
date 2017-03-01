import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PickerIOS,
  Picker
} from 'react-native';
import Screen from '../components/screen'
import CircleIcon from '../components/circleIcon'
import CardDock from '../components/cardDock'
import {connect} from 'react-redux'
import * as AddDrinkActions from '../actions/addDrink';

var whenValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

class AddDrinkView extends Component {
  whenLabelForValue(value) {
    if (value == 0) {
      return "Now";
    } else if (value == 60) {
      return "1 Hour Ago";
    }
    return value + ' Min Ago';
  }
  sizeValues() {
    if (this.props.drinkType == 'beer') {
      return [1, 1.333, 1.666];
    } else if (this.props.drinkType == 'cocktail') {
      return [0.75, 1, 1.5, 2];
    } else if (this.props.drinkType == 'wine') {
      return [0.75, 1, 1.25];
    }
    return [];
  }
  sizeLabelForValue(value) {
    let index = this.sizeValues().indexOf(value);
    if (this.props.drinkType == 'beer') {
      return ['12 oz.', '16 oz.', '20 oz.'][index];
    } else if (this.props.drinkType == 'cocktail') {
      return ['Weak (< 1 ox.)', 'Normal (1.5 oz.)', 'Strong (2-3 oz.)', 'Woah! (> 3 oz.)'][index];
    } else if (this.props.drinkType == 'wine') {
      return ['Small (< 5 oz.)', 'Normal (5-6 oz.)', 'Large (> 6 oz.)'][index];
    }
    return [];
  }

  componentWillUnmount() {
      this.props.dispatch(AddDrinkActions.toggleTimePicker(false));
      this.props.dispatch(AddDrinkActions.toggleSizePicker(false));
  }

  updateTime(timeValue) {
    this.props.dispatch(AddDrinkActions.setTime(timeValue.value));
  }
  updateSize(sizeValue) {
    this.props.dispatch(AddDrinkActions.setSize(sizeValue.value));
  }
  addDrink() {
    this.props.dispatch(AddDrinkActions.saveDrink());
  }
  render() {
    return (
      <Screen>
        <View style={viewStyles.topView}>
          <CircleIcon icon='CLOCK' background='#F90029' onPress={() => {
            this.props.dispatch(AddDrinkActions.toggleTimePicker(!this.props.showTimePicker));
            this.props.dispatch(AddDrinkActions.toggleSizePicker(false));
          }}/>
          <CircleIcon icon='SIZE' background='#F90029' onPress={() => {
            this.props.dispatch(AddDrinkActions.toggleTimePicker(false));
            this.props.dispatch(AddDrinkActions.toggleSizePicker(!this.props.showSizePicker));
          }}/>
        </View>
        <View style={viewStyles.middleView}>
          <View>
            <View style={viewStyles.textContainer}>
              <Text style={textStyles.header}>
                When
              </Text>
              <Text style={textStyles.header}>
                Size
              </Text>
            </View>
            <View style={viewStyles.textContainer}>
              <Text style={textStyles.value}>
                {this.whenLabelForValue(this.props.selectedTime)}
              </Text>
              <Text style={textStyles.value}>
                {this.sizeLabelForValue(this.props.selectedValue)}
              </Text>
            </View>
          </View>
          {this.props.showTimePicker && (
            <Picker
              selectedValue={this.props.selectedTime}
              onValueChange={(value) => this.updateTime({value})}
              >
              {whenValues.map((value) => (
                <Picker.Item 
                  color='white'
                  label={this.whenLabelForValue(value)} 
                  value={value}
                  key={value}
                />
              ))}
            </Picker>
          )}
          {this.props.showSizePicker && (
            <PickerIOS
              selectedValue={this.props.selectedValue}
              onValueChange={(value) => this.updateSize({value})}
              >
              {this.sizeValues().map((value) => (
                <PickerIOS.Item 
                  color='white'
                  label={this.sizeLabelForValue(value)} 
                  value={value}
                  key={value}
                />
              ))}
            </PickerIOS>
          )}
        </View>
        <View style={viewStyles.bottomView}>
          <CircleIcon  icon='CHECK' background='#F90029' onPress={() => {
            this.props.navigator.pop();
            this.addDrink();
            }}/>
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
    justifyContent: 'space-between'
  },
  bottomView: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

AddDrinkView.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object,
};

function selector (state) {
  return {
    drinkType: state.addDrink.type,
    showTimePicker: state.addDrink.timePickerOpen,
    showSizePicker: state.addDrink.sizePickerOpen,
    selectedTime: state.addDrink.time,
    selectedValue: state.addDrink.size
  };
}

export default connect(selector)(AddDrinkView);
