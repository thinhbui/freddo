import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { addListener } from './ultils/redux';
import RootNavigator from './RootNavigator';

class AppNavigatorState extends Component {
    render() {
        const { dispatch, nav } = this.props;
        // console.log('nav', nav);
        return (
            <RootNavigator
                navigation={addNavigationHelpers({
                    dispatch,
                    state: nav,
                    addListener
                })}
            />
        );
    }
}
const mapStateToProps = state => ({
    nav: state.nav,
  });
export default connect(mapStateToProps)(AppNavigatorState);
