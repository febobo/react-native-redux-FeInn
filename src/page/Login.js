
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import TabShow from '../components/TabShow';
import Icon from 'react-native-vector-icons/Ionicons';
import { randomBg } from '../utils';

export default class Login extends Component {
  constructor (props){
    super(props);
  }

  renderHeader (){
    return (
      <View style={[styles.userHeader,{backgroundColor:randomBg()}]}>
        <View style={styles.userImgWrap}>
          <Image
            style={[styles.userImg]}
            source={{uri : 'http://test.imgs.wn518.com/upimages/ys-sales/2016-05-05/fc37e0ae1cdc0282019f3d7d25d6fcdf_1_0_0_480_480_0.jpg'}}
          />
        </View>
      </View>
    )
  }
  render (){
    const pointContent = (()=>{
      return (
        <Icon
          name='md-arrow-back'
          size={ 30 }
          color='rgba(255,255,255,1)'
        />
      )
    })();

    return (
      <View style={[styles.container]}>
        <View>
          {this.renderHeader()}
        </View>
        <TabShow {...this.props}
          content={pointContent}
          wrapStyle={styles.wrapStyle}
         />
      </View>
    )
  }
}

const { width , height } = Dimensions.get('window');
const userImgWidth = 100;
const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  userImgWrap : {
    flex : 1,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  userHeader : {
    height :height/4
  },
  userImg : {
    width : userImgWidth,
    height : userImgWidth,
    borderRadius : userImgWidth/2
  },
  wrapStyle : {
    flex : 1,
    position:'absolute',
    left : 20,
    bottom : 25,
  },
})
