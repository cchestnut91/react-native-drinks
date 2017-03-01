import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  PickerIOS
} from 'react-native';
import Screen from '../components/screen'
import CircleIcon from '../components/circleIcon'
import CardDock from '../components/cardDock'
import {connect} from 'react-redux'
import * as ProfileActions from '../actions/profile';

const cardHeight = 100;

class ProfileView extends Component {
  labelForSex(sexValue) {
    if (sexValue == 0.49) {
      return "Female";
    } else if (sexValue == 0.58) {
      return "Male";
    }
    return "Other";
  }
  labelForWeight(weightValue) {
    return weightValue.toString();
  }
  updateSex(value) {
    this.props.dispatch(ProfileActions.setSex(value));
  }
  updateWeight(value) {
    this.props.dispatch(ProfileActions.setWeight(value));
  }
  sexValues() {
    return [0.49, 0.535, 0.58];
  }
  weightValues() {
    var weightArray = [];
    for (i = 50; i < 500; i++) {
      weightArray.push(i);
    }
    return weightArray;
  }
  render() {
    return (
      <Screen>
        <View style={viewStyles.topView}>
          <CircleIcon icon='SCALE' background='#F90029' onPress={() => {
            this.props.dispatch(ProfileActions.setShowWeight(!this.props.showWeightPicker));
            this.props.dispatch(ProfileActions.setShowSex(false));
          }}/>
          <CircleIcon icon='GENDER' background='#F90029' onPress={() => {
            console.log(this.props.showSexPicker);
            this.props.dispatch(ProfileActions.setShowSex(!this.props.showSexPicker));
            this.props.dispatch(ProfileActions.setShowWeight(false));
            console.log(this.props.showSexPicker);
          }}/>
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
              {this.props.weight}
            </Text>
            <Text style={textStyles.value}>
              {this.labelForSex(this.props.sex)}
            </Text>
          </View>
          {this.props.showWeightPicker && (
            <Picker
              selectedValue={this.props.weight}
              onValueChange={(value) => this.updateWeight({value})}
              >
              {this.weightValues().map((value) => (
                <Picker.Item 
                  color='white'
                  label={this.labelForWeight(value)} 
                  value={value}
                  key={value}
                />
              ))}
            </Picker>
          )}
          {this.props.showSexPicker && (
            <PickerIOS
              selectedValue={this.props.sex}
              onValueChange={(value) => this.updateSex({value})}
              >
              {this.sexValues().map((value) => (
                <PickerIOS.Item 
                  color='white'
                  label={this.labelForSex(value)} 
                  value={value}
                  key={value}
                />
              ))}
            </PickerIOS>
          )} 
        </View>
        <View style={viewStyles.bottomView}>
          <CircleIcon icon='CHECK' background='#F90029' onPress={() => {
            this.props.navigator.pop();
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
  },
  bottomView: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  navigator: PropTypes.object,
};

function selector (state) {
  return {
    weight: state.profile.weight,
    sex: state.profile.sex,
    showWeightPicker: state.profile.showWeightPicker,
    showSexPicker: state.profile.showSexPicker
  };
}

export default connect(selector)(ProfileView);
