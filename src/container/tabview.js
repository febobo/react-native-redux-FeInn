
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const myIcon = (<Icon name="ios-time" size={30} color="#900" />)
import * as EssencePage from '../page/Essence';
import Article from '../page/Article';
import Welfare from '../page/Welfare';
import * as Login from '../page/Login';
import connectComponent from '../utils/connectComponent';
const Essence = connectComponent(EssencePage);

export default class TabView extends Component {
  constructor (props){
    super(props);
  }

  _renderComponent (){

  }

  isActive (currentTab){
    const { Tab } = this.props;
    if(Tab.selectedTab == currentTab){
      return true;
    }
      return false
  }

  goSetting (){
    const { navigator } = this.props;
    navigator.push({
      component : connectComponent(Login),
    })
  }
  render(){

    const { tabChange } = this.props.actions;
    return(
      <TabBarIOS>
        <Icon.TabBarItem
          title="精选"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.isActive('essence')}
          onPress={()=>{tabChange('essence')}}
          color={'red'}
        >
        <Essence {...this.props} />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="文章"
          iconName="ios-book-outline"
          selectedIconName="ios-book"
          selected={this.isActive('article')}
          onPress={()=>{tabChange('article')}}
        >
        <Article {...this.props} />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="福利"
          iconName="ios-heart-outline"
          selectedIconName="ios-heart"
          selected={this.isActive('welfare')}
          onPress={()=>{tabChange('welfare')}}
        >
        <Welfare {...this.props} />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="设置"
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          selected={this.isActive('settings')}
          onPress={this.goSetting.bind(this)}
        >
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
}
