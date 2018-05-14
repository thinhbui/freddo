import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

class Options extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="ios-restaurant" size={25} color="#fff" />,
    header: null
  };
  componentDidMount() {}

  render() {
    return <View style={{ flex: 1 }} />;
  }
}
const mapDisPatchToProps = dispatch => ({});
const mapStateToProps = state => ({});
export default connect(mapStateToProps, mapDisPatchToProps)(Options);
