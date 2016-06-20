
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

class Article extends Component {
  constructor (props){
    super(props);
  }

  componentWillMount(){
    const { actions } = this.props;
    actions.getPhoto({
      page :1,
      limit:10
    })
  }

  render (){
    console.log(this)
    const { Acticle } = this.props;
    return (
      <View style={[styles.container]}>
      {
        Acticle && Acticle.photos && Acticle.photos.length !=0 ?
        <ScrollView style={{flex:1}}>

          <View style={styles.imgsWrap}>
            <View style={styles.imgs}>
              {this._renderImg(Acticle.photos.slice(0,5))}
            </View>
            <View style={styles.imgs}>
              {this._renderImg(Acticle.photos.slice(5,10))}
            </View>
          </View>
        </ScrollView> :
        <View style={{flexDirection:'row',paddingTop:30,alignItems : 'center',justifyContent : 'center'}}>
          <Text style={{fontSize:20}}>说好的妹子呢</Text>
        </View>
      }
      </View>
    )
  }

  _renderImg(imgs){
    return (
      imgs.map( (v,k) =>{
        return (
          <TouchableOpacity
            key={'photo-' + k}
          >
            <Image
              style={{width:width/2,height:parseInt(Math.random() * (width/4) + (width/2))}}
              source={{uri : v.url}}
            />
          </TouchableOpacity>
        )
      })
    )
  }
}
const { width , height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container : {
    flex : 1,
    // alignItems : 'center',
    // justifyContent : 'center',
    // backgroundColor : 'blue'
  },
  imgsWrap : {
    flex :1,
    flexDirection : "row"
  },
  imgs : {
    flex : 1
  },
})

export const LayoutComponent = Article;
export function mapStateToProps(state){
  return {
    Acticle : state.Acticle,
  }
}
