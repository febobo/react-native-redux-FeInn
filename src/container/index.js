import React from 'react';
import { Component , Navigator , View , Text ,TabBarIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import Essence from '../page/Essence';
import * as EssenceActions from '../actions/EssenceActions';
import { connect } from 'react-redux';
import navigationBar from './navigationBar'
import Icon from 'react-native-vector-icons/Ionicons';


class FeInnApp extends Component {
  constructor (props){
    super(props);
  }

  render (){
    const { state , actions } = this.props;
    let defaultName = '精选';
    let defaultComponent = Essence;
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
        >
      <Navigator
          initialRoute={{ name: defaultName, component: defaultComponent }}
          configureScene={(route) => {
            return Navigator.SceneConfigs.VerticalDownSwipeJump;
          }}
          renderScene={(route, navigator) => {
            console.log(route)
              let Component = route.component;
              return <Component {...this.props} {...route.params} navigator={navigator} />
          }}
          navigationBar={navigationBar}
      />
      </Icon.TabBarItem>
      </TabBarIOS>

    )
  }
}


        // <Essence {...this.props} />
export default connect ( state => ({
  essence : state.essence,
}),
  (dispatch) => ({
    essence : bindActionCreators(EssenceActions , dispatch)
  })
)(FeInnApp)
