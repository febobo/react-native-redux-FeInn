
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  TouchableOpacity,
  NavigatorIOS,
  ListView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import RefreshableListView from 'react-native-refreshable-listview';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

import Article from './Article'
import Detail from './Detail'
var page = 1;
export default class Essence extends Component {
  constructor (props){
    super(props);
  }

  componentWillMount (){
    let params = `page=${page}&limit=10`
    this._getList(params)
  }

  to(){
    const { navigator } = this.props;
    navigator.push({
      name : '文章',
      component : Detail,
      params : {
        aid
      }
    })
  }

  linkToArticle (e,rowData){
    const { navigator } = this.props;
    if(!rowData) return;
    navigator.push({
      name : rowData.title,
      component : Detail,
      params : {
        aid : rowData.id
      }
    })
  }

  _getList(params){
    const { getList } = this.props.essence;
    getList(params)
  }

  _onReached (){
    const { isDownLoad } = this.props.essence;
    isDownLoad(true);
    let params = `page=${++page}&limit=10`
    this._getList(params,()=>{
      isDownLoad(false)
    });
  }

  _loadData (){
    let params = "page=1&limit=10"
    return this._getList(params)
  }

  render (){
    const { data , downLoadStatus} = this.props.Essence;

    console.log(22)
    return (
      <View style={[styles.container]}>
        {
          data ?
          <RefreshableListView
            dataSource={ds.cloneWithRows(data)}
            renderRow={this._renderRow.bind(this)}
            initialListSize={10}
            onEndReached={this._onReached.bind(this)}
            onEndReachedThreshold={0}
            pageSize={3}
            showsVerticalScrollIndicator={true}
            removeClippedSubviews={true}
            pagingEnabled={true}
            loadData={this._loadData.bind(this)}
            refreshDescription="正在加载..."
            refreshingIndicatorComponent={
              <RefreshableListView.RefreshingIndicator
                description='下拉刷新'
              />
            }
            renderFooter={null}
          /> :
          null
        }
        {
          downLoadStatus ?
          <View
            style={[styles.loadTips]}
          >
            <Text style={[styles.loadTipsText]}>正在加载...</Text>
          </View> : null
        }

      </View>
    )
  }
  _renderRow(rowData, sectionID, rowID, highlightRow){
    // console.log(rowData, sectionID, rowID, highlightRow)
    const navs = {
			ask: '问答',
			share: '分享',
			job: '招聘'
		};
    return (
      <TouchableOpacity
        key={rowData.id}
        onPress={ (e)=>{this.linkToArticle(e,rowData)}}
      >
      <View style={[styles.rows]}>
        <Image
          style={styles.article}
          source={{uri: rowData.author.avatar_url}}
        />
        <View
          style={styles.content}
        >
          <Text
            style={[styles.articleTitle]}
            numberOfLines={1}
          >
            {rowData.title}
          </Text>
          <View style={[styles.articleDec]}>
            <View style={{flex:2,flexDirection:'row',}}>
              <View style={{flexDirection:'row', justifyContent : 'center'}} >
                <Icon name="ios-eye-outline" size={22} color="#333" />
                <Text style={[styles.dec]}>{rowData.visit_count}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent : 'center'}} >
                <Icon name="ios-text-outline" size={22} color="#333" />
                <Text style={[styles.dec]}>{rowData.reply_count}</Text>
              </View>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems : 'center'}}>
              <Text style={[styles.tag]}>{navs[rowData.tab]}</Text>
              {
                rowData.good ?
                <Text style={[styles.tag]}>精</Text> : null
              }
              {
                rowData.top ?
                <Text style={[styles.tag]}>顶</Text> : null
              }
            </View>
            <Text style={{flex:2,textAlign:'right'}}>{moment(rowData.last_reply_at).startOf('minute').fromNow()}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}
var indicatorStylesheet = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
    height: 60,
    marginTop: 10,
  },
  content: {
    backgroundColor: 'blue',
    marginTop: 10,
    height: 60,
  },
})
const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingBottom:48,
    paddingVertical : 5
  },
  loadTips :{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    height:36,
  },
  loadTipsText : {
    fontSize : 16,
    color: '#ccc',
  },
  flex1 : {
    flex : 1
  },
  rows : {
    padding : 10,
    borderBottomWidth : 1,
    borderStyle : 'solid',
    borderBottomColor : '#eee',
    flexDirection : 'row',
    height : 80
  },
  dec : {
    lineHeight:20,
    marginHorizontal : 5
  },
  tag : {
    color : '#4a2',
    marginHorizontal : 3
  },
  article : {
    width : 50,
    height : 50,
    borderRadius : 25
  },
  articleTitle : {
    fontSize : 16,
    flex : 1
  },
  articleDec : {
    flexDirection : 'row',
    alignItems : 'center',
    flex : 1
  },
  content : {
    flex : 1,
    paddingLeft : 8
  },
  link : {
    padding : 10,
    paddingHorizontal: 20,
    borderRadius : 3,
    borderColor: 'blue',
    borderWidth : 1,
    marginTop:20,
    // color : '#fff'
  }
})
