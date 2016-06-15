import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Html from '../utils/Html';
import { bindActionCreators } from 'redux';
import * as CommentActions from '../actions/CommentActions';
import * as DetailActions from '../actions/DetailActions';
import { connect } from 'react-redux';
import TabShow from '../components/TabShow';
import connectComponent from '../utils/connectComponent';
import config from '../config';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Comment extends Component {
  constructor (props){
    super(props);
    this.state = {textInput: ''};
    this.keyboardWillShowEvent = DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
		this.keyboardWillHideEvent = DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow (e){
    this.commentView && this.commentView.setNativeProps({
			style: {
				height: commentHeight - e.endCoordinates.height
			}
		})
  }

  keyboardWillHide (){
    this.commentView && this.commentView.setNativeProps({
			style: {
				height: commentHeight
			}
		})
  }

  reply (){
    const { actions ,Detail } = this.props;
    if(!this.textInputValue){
      return actions.toast('评论不能为空')
    }
    console.log(this)
    actions.replyTopicById({
      topicId: Detail.data.id,
			content: this.textInputValue + config.replySuffix,
			// replyId: this.replyId,
			user: {
				loginname: '212',
				avatar_url: '2212'
			}
    },()=>{
      this._resetReplyForm()
    })
  }

  _resetReplyForm() {
		this.replyId = null;
		this.textInput.setNativeProps({
			text: ''
		});
		this.textInputValue = '';
		this.textInput.blur();
	}

  componentUnMount(){
    this.keyboardWillHideEvent.remove()
    this.keyboardWillShowEvent.remove()
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

    const { Detail , navigator} = this.props;
    return (
      <View style={[styles.container]}>
        <View style={[styles.commentHeader]}>
          <View style={styles.returnBtn}>
            <TouchableOpacity onPress={navigator.pop}>
              <Text style={{fontSize:16,color:'#fff'}}>返回</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={{fontSize:16,color:'#fff'}}>
                评论({Detail && Detail.data && Detail.data.reply_count})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.commentList]}
          ref={(view) => this.commentView = view}
        >
          {
            Detail && Detail.data && Detail.data.reply_count !=0 ?
            <ListView
              dataSource={ds.cloneWithRows(Detail.data.replies)}
              renderRow={this._renderRow.bind(this)}
              initialListSize={10}
              onEndReachedThreshold={0}
              pageSize={3}
              showsVerticalScrollIndicator={true}
              removeClippedSubviews={true}
              pagingEnabled={true}
              refreshDescription="正在加载..."
              renderFooter={null}
            /> :
            <View style={{flexDirection:'row',paddingTop:30,alignItems : 'center',justifyContent : 'center'}}>
              <Text style={{fontSize:20,color:'#red'}}>暂无评论</Text>
            </View>
          }
        </View>
        <View style={[styles.commentBox]}>
          <Image
            style={[styles.article,styles.authorHeader]}
            source={{uri : 'http://test.imgs.wn518.com/upimages/ys-sales/2016-05-05/fc37e0ae1cdc0282019f3d7d25d6fcdf_1_0_0_480_480_0.jpg'}}
          />
          <View style={{flex:1}}>
            <TextInput
               ref={(view) => this.textInput = view}
               value={this.state && this.state.textInput}
               onChangeText={(text) => {
                               this.textInput.setNativeProps({
                                   text: text
                               });
                               this.textInputValue = text;
                               this.setState({textInput:text})
                           }}
               style={{height: 40, borderWidth:1,borderColor:'#eee'}}
               placeholder="说说我的看法"
               placeholderTextColor="#ccc"
               keyboardType={"default"}
             />
          </View>
          <View>
            <TouchableOpacity
              style={[styles.replyBtn]}
              onPress={()=>this.reply()}
            >
              <Icon
                name='ios-undo'
                size={ 30 }
                color='#333'
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    return (
      <View style={[styles.rows]}
        key={rowData.id}
      >
        <Image
          style={styles.article}
          source={{uri: rowData.author.avatar_url}}
        />
        <View
          style={styles.content}
        >

          <View style={{flex : 1,flexDirection:'row',justifyContent : 'space-between'}}>
            <View style={{flex:1}} >
              <Text>{rowData.author.loginname}</Text>
            </View>
            <View style={{flex:1}} >
              <Text style={{textAlign:'right'}}>{moment(rowData.last_reply_at).startOf('minute').fromNow()}</Text>
            </View>
          </View>
          <Html
            router={this.props.navigator}
            content={rowData.content}
            style={htmlStyles}
          />
        </View>
      </View>
    )
  }
}

const avatarWidth = 40;
const headerHeight = 65;
const {height, width} = Dimensions.get('window');
const commentHeight = height - headerHeight - avatarWidth - 20
// const { width , height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container : {
    height : height - headerHeight - avatarWidth
  },
  commentList : {
    height : commentHeight
  },
  authorHeader : {
    padding:10
  },
  commentBox : {
    padding:10,
    height : 60,
    flexDirection : 'row'
  },
  replyBtn : {
    paddingTop : 5,
    marginLeft:5
  },
  commentHeader : {
    height : headerHeight,
    paddingTop:20,
    flexDirection : 'row',
    backgroundColor : '#333',
    alignItems : 'center',
    justifyContent : 'center',
  },
  returnBtn : {
    position : 'absolute',
    left : 10,
    top : 35
  },
  wrapStyle : {
    flex : 1,
    position:'absolute',
    left : 20,
    bottom : 25,
  },
  rows : {
    padding : 10,
    borderBottomWidth : 1,
    borderStyle : 'solid',
    borderBottomColor : '#eee',
    flexDirection : 'row',
  },
  content : {
    flex : 1,
    paddingLeft:10
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
    width : avatarWidth,
    height : avatarWidth,
    borderRadius : avatarWidth/2,
    marginRight : 5
  },
  articleTitle : {
    fontSize : 16,
    flex : 1
  },
  articleDec : {
    flexDirection : 'row',
    alignItems : 'center',
    flex : 1,

  },
})

const fontSize = 14;
const titleMargin = 5;

const htmlStyles = StyleSheet.create({
	p: {
		//lineHeight: fontSize * 1.4,
		fontSize: fontSize,
		color: 'rgba(0,0,0,0.8)'
	},
	pwrapper: {
		marginTop: 5,
		marginBottom: 5
	},

	a: {
		color: '#3498DB',
		fontSize: fontSize,
		paddingLeft: 4,
		paddingRight: 4,
		marginRight: 10,
		marginLeft: 10
	},
	h1: {
		fontSize: fontSize * 1.6,
		fontWeight: "bold",
		color: 'rgba(0,0,0,0.8)'
	},
	h1wrapper: {
		marginTop: titleMargin,
		marginBottom: titleMargin
	},
	h2: {
		fontSize: fontSize * 1.5,
		fontWeight: 'bold',
		color: 'rgba(0,0,0,0.85)'
	},
	h2wrapper: {
		marginBottom: titleMargin,
		marginTop: titleMargin
	},
	h3: {
		fontWeight: 'bold',
		fontSize: fontSize * 1.4,
		color: 'rgba(0,0,0,0.8)'
	},
	h3wrapper: {
		marginBottom: titleMargin - 2,
		marginTop: titleMargin - 2
	},
	h4: {
		fontSize: fontSize * 1.3,
		color: 'rgba(0,0,0,0.7)',
		fontWeight: 'bold'
	},
	h4wrapper: {
		marginBottom: titleMargin - 2,
		marginTop: titleMargin - 2,
	},
	h5: {
		fontSize: fontSize * 1.2,
		color: 'rgba(0,0,0,0.7)',
		fontWeight: 'bold'
	},
	h5wrapper: {
		marginBottom: titleMargin - 3,
		marginTop: titleMargin - 3,
	},
	h6: {
		fontSize: fontSize * 1.1,
		color: 'rgba(0,0,0,0.7)',
		fontWeight: 'bold'
	},
	h6wrapper: {
		marginBottom: titleMargin - 3,
		marginTop: titleMargin - 3,
	},
	li: {
		fontSize: fontSize * 0.9,
		color: 'rgba(0,0,0,0.7)'
	},
	liwrapper: {
		paddingLeft: 20,
		marginBottom: 10
	},
	strong: {
		fontWeight: 'bold'
	},
	em: {
		fontStyle: 'italic'
	},
	codeScrollView: {
		backgroundColor: '#333',
		flexDirection: 'column',
		marginBottom: 15
	},
	codeRow: {
		flex: 1,
		flexDirection: 'row',
		height: 25,
		alignItems: 'center'
	},
	codeFirstRow: {
		paddingTop: 20,
		height: 25 + 20
	},
	codeLastRow: {
		paddingBottom: 20,
		height: 25 + 20
	},
	codeFirstAndLastRow: {
		paddingBottom: 20,
		height: 25 + 40,
		paddingTop: 20
	},
	lineNum: {
		width: 55,
		color: 'rgba(255,255,255,0.5)',
	},
	lineNumWrapper: {
		width: 55,
		height: 25,
		backgroundColor: 'rgba(0,0,0,0.1)',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20
	},
	codeWrapper: {
		flexDirection: 'column'
	},
	codeLineWrapper: {
		height: 25,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	blockquotewrapper: {
		paddingLeft: 20,
		borderLeftColor: '#3498DB',
		borderLeftWidth: 3
	},
	img: {
		width: width - 80 - 20,
		height: width - 80 - 20,
		resizeMode: Image.resizeMode.contain,
		margin: 10
	}
});

export const LayoutComponent = Comment;
export function mapStateToProps(state){
  return {
    User : state && state.User,
    Comment : state.Comment,
    Detail : state.Detail
  }
}
// const mapActionCreators = (dispatch) => ({
//   comment : bindActionCreators(CommentActions , dispatch),
//   detail : bindActionCreators(DetailActions , dispatch),
// })
//
// const mapStateToProps = (state)=>
// ({
//   Comment : state.Comment,
//   Detail : state.Detail
// })
//
// export default connect (mapStateToProps , mapActionCreators)(Comment)
