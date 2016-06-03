import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import * as CommentActions from '../actions/CommentActions';
import { connect } from 'react-redux';
import TabShow from '../components/TabShow';
import connectComponent from '../utils/connectComponent';



export default class Comment extends Component {
  constructor (props){
    super(props);
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
        <TabShow {...this.props}
          content={pointContent}
          wrapStyle={styles.wrapStyle}
         />
        <Text style={{fontSize:30,color:'#fff'}}>Hello Comment-native</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#730'
  },
  wrapStyle : {
    flex : 1,
    position:'absolute',
    left : 20,
    bottom : 25,
  }
})

const mapActionCreators = (dispatch) => ({
  comment : bindActionCreators(CommentActions , dispatch),
})

const mapStateToProps = (state)=>
({
  Comment : state.Comment
})

export default connect (mapStateToProps , mapActionCreators)(Comment)
