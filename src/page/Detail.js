
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
import { bindActionCreators } from 'redux';
import Essence from '../page/Essence';
import * as DetailActions from '../actions/DetailActions';
import { connect } from 'react-redux';
import Html from '../utils/Html';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import TabShow from '../components/TabShow';
import RNWechat from '../components/RNWechat';
// import WeChat from 'react-native-wechat';
var WeChat=require('react-native-wechat')

import { randomBg } from '../utils';


class Detail extends Component {
  constructor (props){
    super(props);
    this.share = this.share.bind(this);
    this.state = {
      showShare : false
    }
  }

  componentWillMount(){
    const { aid } = this.props;
    const { getArticleDetail } = this.props.actions;
    getArticleDetail(aid)
  }

  componentWillUnmount(){
    const { actions } = this.props;
    actions.clearCacheDetail();
  }
  share (){
    this.setState({
      showShare:!this.state.showShare
    })
    setTimeout( ()=>{
      this.RNWechat && this.RNWechat.show()
    },100)
  }


  render (){
    const { data } = this.props.Detail;
    const pointContent = (()=>{
      return (
        <Icon
          name='md-arrow-back'
          size={ 30 }
          color='rgba(255,255,255,1)'
        />
      )
    })();

    const commentContent = (()=>{
      return (
        <Icon
          name='ios-text-outline'
          size={ 30 }
          color='rgba(255,255,255,1)'
        />
      )
    })();
    const shareContent = (()=>{
      return (
        <Icon
          name={this.state.showShare ? 'md-close' :'md-share'}
          size={ 30 }
          color='rgba(255,255,255,1)'
        />
      )
    })();
    return (
      <View style={[styles.container]}>

      <ScrollView>
      <View>
        {
          data && data.id?
          <View >
          <View style={[styles.header,{backgroundColor:randomBg()}]}>
            <View>
              <Image
                style={styles.authorImg}
                source={{uri : data.author.avatar_url}}
                defaultSource={require('../public/defaultImg.png')}
              />
            </View>
            <View
              style={[styles.autoWrap]}
            >
              <Text
                style={{fontSize:18}}
              >
                {data.title}
              </Text>
              <View style={styles.titleFooter}>
                <Icon
                  name='ios-time-outline'
                  size={14}
                  color='#ccc'
                  style={styles.dateIcon}
                />
                <Text style={styles.dateText}>
                  {moment(data.create_at).startOf('minute').fromNow()}
                </Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal : 10}}>
            <Html
  						router={this.props.navigator}
  						content={data.content}/>
          </View>
          </View>
          : null
        }
      </View>
      </ScrollView>
      <TabShow {...this.props}
        content={pointContent}
        wrapStyle={styles.wrapStyle}
       />
       <TabShow {...this.props}
         content={commentContent}
         wrapStyle={styles.commentWrapStyle}
         pageFlag={'comment'}
         aid={data && data.id}
        />
        {
          this.state.showShare ?
          <RNWechat
            ref={view => this.RNWechat = view}
          /> :null
        }
        <TabShow {...this.props}
          content={shareContent}
          onPress={this.share}
          wrapStyle={styles.shareWrapStyle}
         />
      </View>
    )
  }
}

const authorImgHeight = 40;
const AuthorWidth = 100;
const {height, width} = Dimensions.get('window');
const defaultMaxImageWidth = width - 30 - 20;
const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingBottom:Platform.OS == 'ios' ? 0 : 50,
  },
  wrapStyle : {
    flex : 1,
    position:'absolute',
    left : 20,
    bottom : Platform.OS == 'ios' ? 25 : 50,
  },
  titleFooter : {
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 10
    // justifyContent : 'center',
  },
  commentWrapStyle : {
    flex : 1,
    position:'absolute',
    right : 20,
    bottom : Platform.OS == 'ios' ? 25 : 50,
  },
  shareWrapStyle : {
    flex : 1,
    position:'absolute',
    left : width/2 - 20,
    bottom : Platform.OS == 'ios' ? 25 : 50,
  },
  authorImg: {
		width: authorImgHeight,
		height: authorImgHeight,
		borderRadius: authorImgHeight / 2
	},
  header: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingRight: 20,
		paddingLeft: 20,
		paddingTop: Platform.OS === 'ios' ? 20 : 0
	},
  autoWrap : {
    width: width - AuthorWidth - 20,
		flexDirection: 'column',
		paddingTop: 20,
		paddingBottom: 20
  },
  dateIcon: {
		width: 12,
		height: 16,
		marginRight: 8
	}
})


export const LayoutComponent = Detail;
export function mapStateToProps(state){
  return {
    Detail : state.Detail
  }
}
