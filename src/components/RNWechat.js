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

import Icon from 'react-native-vector-icons/Ionicons';
import TabShow from '../components/TabShow';

var WeChatRegister;
export default class WNWechat extends Component {

  constructor(props){
    super(props);
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
      <View style={styles.wrap}>
      <View style={styles.mask}></View>
      <View style={styles.shareWrap}>
        <View style={styles.title}>
          <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>推荐给朋友</Text>
        </View>
        <View style={styles.content}>
          <View
            style={styles.iconWrap}
          >
            <Image
              style={styles.shareIcon}
              source={require('../public/wechat.png')}
            />
            <Text style={styles.icondir}>微信好友</Text>
          </View>
          <View
            style={styles.iconWrap}
          >
            <Image
              style={styles.shareIcon}
              source={require('../public/wechattimeline.png')}
            />
            <Text style={styles.icondir}>微信朋友圈</Text>
          </View>
        </View>

      </View>
      </View>

    )
  }
}

const {height, width} = Dimensions.get('window');
const shareW = width * 0.7;
const shareH = height / 3;
const iconW = 40;
const styles = StyleSheet.create({
  wrap : {
    position : 'absolute',
    left : 0,
    right : 0,
    top : 0,
    bottom : 0,
  },
  mask : {
    position : 'absolute',
    left : 0,
    right : 0,
    top : 0,
    bottom : 0,
    backgroundColor : '#000',
    opacity : 0.7
  },
  title : {
    padding : 20
  },
  content : {
    flexDirection : 'row',
    padding : 25,
    paddingTop : 0
  },
  iconStyle : {
    borderRadius : 4
  },
  shareIcon : {
    flex : 1,
    width : iconW,
    height : iconW
  },
  iconWrap : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  icondir : {
    fontSize:14,
    color:'#fff',
    textAlign:'center',
    marginTop:6
  },
  shareWrap : {
    width : shareW,
    // height : shareH,
    backgroundColor : '#e85050',
    position : 'absolute',
    left : (width - shareW) /2,
    top : (height - shareH) /2,
    borderRadius : 3,
    opacity :1
  }
})
