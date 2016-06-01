
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import Essence from '../page/Essence';
import * as DetailActions from '../actions/DetailActions';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';

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
    console.log(this.props.Detail,data)
    return (
      <ScrollView>
      <View style={[styles.container]}>
        {
          data ?
          <View>
            <Text
              style={{fontSize:18}}
            >
              {data.title}
            </Text>
            <HTMLView
              value={data.content}
              stylesheet={styles}
            />
          </View>
          : null
        }
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    // alignItems : 'center',
    // justifyContent : 'center',
    // backgroundColor : '#730'
    paddingTop:65,
    paddingHorizontal : 5
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
