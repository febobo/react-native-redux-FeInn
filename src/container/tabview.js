
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
export default class TabView extends Component {
  constructor (props){
    super(props);
  }

  _renderComponent (){

  }

  render(){
    console.log(this)
    return(
      <TabBarIOS>
        <Icon.TabBarItem
          title="精选"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={true}
        >
        <Essence {...this.props} />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="文章"
          iconName="ios-book"
          selectedIconName="ios-home"
          selected={false}
        >
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="福利"
          iconName="ios-heart"
          selectedIconName="ios-heart"
          selected={false}
        >
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
}
