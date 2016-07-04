
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  TabBarIOS,
  Dimensions,
  Platform,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const myIcon = (<Icon name="ios-time" size={30} color="#900" />)
import * as EssencePage from '../page/Essence';
import * as ArticlePage from '../page/Article';
import * as WelfarePage from '../page/Welfare';
import * as Login from '../page/Login';
import connectComponent from '../utils/connectComponent';
import TabNavigator from 'react-native-tab-navigator';
// import iconHome from '../public/favicon.png';
const Essence = connectComponent(EssencePage);
const Article = connectComponent(ArticlePage);
const Welfare = connectComponent(WelfarePage);

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

  renderTabber(){
    const { tabChange } = this.props.actions;
    if(Platform.OS == 'ios'){
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
            title="发现"
            iconName="ios-eye-outline"
            selectedIconName="ios-eye"
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
            title="我的"
            iconName="ios-person-outline"
            selectedIconName="ios-person"
            selected={this.isActive('settings')}
            onPress={this.goSetting.bind(this)}
          >
          </Icon.TabBarItem>
        </TabBarIOS>
      )
    }else{
      return (
        <TabNavigator
          tabBarStyle={styles.tabbarAndroid}
        >
          <TabNavigator.Item
            selected={this.isActive('essence')}
            title="精选"
            renderIcon={() => <Icon
                      name='ios-home-outline'
                      size={ 18 }
                      color='#000'
                   />}
            renderSelectedIcon={() => <Icon
                      name='ios-home'
                      size={ 18 }
                      color='rgb(0,122,255)'
                   />}
            onPress={()=>{tabChange('essence')}}>
            <View style={{flex:1}}><Essence {...this.props} /></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.isActive('article')}
            title="发现"
            renderIcon={() => <Icon
                      name='ios-eye-outline'
                      size={ 18 }
                      color='#000'
                   />}
            renderSelectedIcon={() => <Icon
                      name='ios-eye'
                      size={ 18 }
                      color='rgb(0,122,255)'
                   />}
            onPress={()=>{tabChange('article')}}>
            <View style={{flex:1}}><Article {...this.props} /></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.isActive('welfare')}
            title="福利"
            renderIcon={() => <Icon
                      name='ios-heart-outline'
                      size={ 18 }
                      color='#000'
                   />}
            renderSelectedIcon={() => <Icon
                      name='ios-heart'
                      size={ 18 }
                      color='rgb(0,122,255)'
                   />}
            onPress={()=>{tabChange('welfare')}}>
            <View style={{flex:1}}><Welfare {...this.props} /></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.isActive('settings')}
            title="我的"
            renderIcon={() => <Icon
                      name='ios-person-outline'
                      size={ 18 }
                      color='#000'
                   />}
            renderSelectedIcon={() => <Icon
                      name='ios-person'
                      size={ 18 }
                      color='rgb(0,122,255)'
                   />}
            onPress={this.goSetting.bind(this)} >
            <View style={{flex:1}}></View>
          </TabNavigator.Item>

        </TabNavigator>
      )
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
      {this.renderTabber()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
	tabbarAndroid: {
    height : 65,
    paddingTop : 5,
    backgroundColor : '#e5e5e5',
    paddingBottom : 25
	}
});
