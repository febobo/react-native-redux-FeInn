
import React from 'react';
import {
  Component ,
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
import Essence from '../page/Essence';
import Article from '../page/Article';
import Welfare from '../page/Welfare';

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

  render(){
    console.log(this)
    const { tabChange } = this.props.tab;
    return(
      <TabBarIOS>
        <Icon.TabBarItem
          title="精选"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.isActive('essence')}
          onPress={()=>{tabChange('essence')}}
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
      </TabBarIOS>
    )
  }
}
