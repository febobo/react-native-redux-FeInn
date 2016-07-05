import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Dimensions
} from 'react-native';
var WeChat=require('react-native-wechat');
import Icon from 'react-native-vector-icons/Ionicons';
import TabShow from '../components/TabShow';

export default class WNWechat extends Component {

  constructor(props){
    super(props);
  }
  async componentDidMount (){
    try {
      console.log(WeChat)
      await WeChat.registerApp('wxb3b6cb97e4c0afbf');
      this.apiVersion = await WeChat.getApiVersion();
      this.wxAppInstallUrl = await WeChat.getWXAppInstallUrl();
      this.isWXAppSupportApi = await WeChat.isWXAppSupportApi();
      this.isWXAppInstalled = await WeChat.isWXAppInstalled();
      console.log(this)
    } catch (e) {
      console.error(e);
    }
  }

  render(){

    const shareContent = (()=>{
      return (
        <Icon
          name='md-share'
          size={ 30 }
          color='rgba(255,255,255,1)'
        />
      )
    })();

    return (
      <TabShow {...this.props}
        content={shareContent}
        onPress={this.props.share}
        wrapStyle={styles.shareWrapStyle}
       />
    )
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  shareWrapStyle : {
    flex : 1,
    position:'absolute',
    left : width/2 - 20,
    bottom : Platform.OS == 'ios' ? 25 : 50,
  }
})
