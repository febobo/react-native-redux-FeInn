
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
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Return from '../components/Return';
import { randomBg } from '../utils';

const regs = {
	http: {
		topic: /^https?:\/\/cnodejs\.org\/topic\/\w*/,
		user: /^https?:\/\/cnodejs\.org\/user\/\w*/
	},
	gif: /.*\.gif$/
};

export default class Detail extends Component {
  constructor (props){
    super(props);
  }

  componentWillMount(){
    const { aid } = this.props;
    const { getArticleDetail } = this.props.detail;
    getArticleDetail(aid)
  }

  render (){
    // console.log(this)
    const { data } = this.props.Detail;
    return (
      <View style={[styles.container]}>
      <ScrollView>
      <View style={[styles.container]}>
        {
          data ?
          <View>
          <View style={[styles.header,{backgroundColor:randomBg()}]}>
            <View>
              <Image
                style={styles.authorImg}
                source={{uri : data.author.avatar_url}}
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
                  name='ios-time'
                  size={12}
                  color='rgba(255,255,255,0.5)'
                  style={styles.dateIcon}
                />
                <Text style={styles.dateText}>
                  {moment(data.create_at).startOf('minute').fromNow()}
                </Text>
              </View>
            </View>
          </View>
            <HTMLView
              value={data.content}
              stylesheet={styles}
            />
          </View>
          : null
        }
      </View>
      </ScrollView>
      <Return {...this.props} />
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
	},
  img: {
		width: defaultMaxImageWidth,
		height: defaultMaxImageWidth,
		resizeMode: Image.resizeMode.cover,
		borderRadius: 5,
		margin: 10
	}
})

const mapActionCreators = (dispatch) => ({
  detail : bindActionCreators(DetailActions , dispatch),
})

const mapStateToProps = (state)=>
({
  Detail : state.Detail
})

export default connect (mapStateToProps , mapActionCreators)(Detail)
