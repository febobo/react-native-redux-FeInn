import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
var WeChat=require('react-native-wechat');
export default class WNWechat extends Component {

  constructor(props){
    super(props);
    this.shareToTimeline = this.shareToTimeline.bind(this);
    this.shareToSession = this.shareToSession.bind(this);
    this.state = {
      showShare : false
    }
  }

  show(){
    this.setState({
      showShare : !this.state.showShare
    })
  }

  async shareToSession (){
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToSession({
            title:'一边泡Cnode社区，一边看美女，还有更多搞笑视频，尽在FeInn',
            description: '分享自:FeInn',
            thumbImage: 'http://p2.wmpic.me/article/2016/07/05/1467705190_DyyYACab_215x185.jpg',
            type: 'news',
            webpageUrl: 'https://github.com/febobo/react-native-redux-FeInn'
          })
          .catch((error) => {
            console.log(error.message);
          });
        } else {
          Alert.alert(
                     '提示',
                     '没有安装微信软件，请您安装微信之后再试',
                   )
        }
    });
  }

  async shareToTimeline (){
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToTimeline({
            title:'一边泡Cnode社区，一边看美女，还有更多搞笑视频，尽在FeInn',
            description: '分享自:FeInn',
            thumbImage: 'http://p2.wmpic.me/article/2016/07/05/1467705190_DyyYACab_215x185.jpg',
            type: 'news',
            webpageUrl: 'https://github.com/febobo/react-native-redux-FeInn'
          })
          .catch((error) => {
            console.log(error.message);
          });
        } else {
          Alert.alert(
                     '提示',
                     '没有安装微信软件，请您安装微信之后再试',
                   )
        }
    });
  }

  renderContent(){
    return (
      <View style={styles.wrap}>
        <View style={styles.mask}></View>
        <View style={styles.shareWrap}>
          <View style={styles.title}>
            <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>推荐给朋友</Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={this.shareToSession}
              style={{flex:1}}
            >
              <View
                style={styles.iconWrap}
              >
                <Image
                  style={styles.shareIcon}
                  source={require('../public/wechat.png')}
                />
                <Text style={styles.icondir}>微信好友</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.shareToTimeline}
              style={{flex:1}}
            >
              <View
                style={styles.iconWrap}
              >
                <Image
                  style={styles.shareIcon}
                  source={require('../public/wechattimeline.png')}
                />
                <Text style={styles.icondir}>微信朋友圈</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }

  render(){
    return (
      <View style={styles.wrap}>
        {
          this.state.showShare ?
          this.renderContent()
          : null
        }
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
