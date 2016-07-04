
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from 'react-native';
import LightBox from 'react-native-lightbox'
import Carousel from 'react-native-looped-carousel'

class Article extends Component {
  constructor (props){
    super(props);
    this._onScroll = this._onScroll.bind(this);
    this.loadList = this.loadList.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillMount(){
    this.loadList()
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.Acticle.photos == this.props.Acticle.photos){
      return false
    }
    return true
  }

  loadList (){
    const { actions , Acticle } = this.props;
    actions.getPhoto({
      page : Acticle.page,
      limit: Acticle.limit
    })
  }
  _onRefresh (){
    this.loadList()
  }

  _onScroll(e) {
    const { actions , Acticle } = this.props;
    let scrollH = e.nativeEvent.contentSize.height; //scrollview的高度
    let y = e.nativeEvent.contentOffset.y;//当前滑动显示的y轴坐标
    let height = e.nativeEvent.layoutMeasurement.height ;//显示部分高度
    if (scrollH - y < height) {//处理加载更多
      // this._loadmore();

      actions.getPhoto({
        page : Acticle.page + 1,
        limit: Acticle.limit
      })
    }
  }

  render (){
    const { Acticle } = this.props;
    console.log(Acticle)
    return (
      <View style={[styles.container]}>

        <ScrollView style={{flex:1}}
          onScroll={this._onScroll}
          initialListSize={1}
          pageSize={1}
          refreshControl={
            <RefreshControl
              refreshing={Acticle.getPhotosIsPending}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }
        >
        {
          Acticle && Acticle.photos && Acticle.photos.length !=0 ?
          <View style={styles.imgsWrap}>
            <View style={styles.imgs}>
              {this._renderImg(Acticle.photos.slice(0,Acticle.photos.length/2))}
            </View>
            <View style={styles.imgs}>
              {this._renderImg(Acticle.photos.slice(Acticle.photos.length/2,Acticle.photos.length))}
            </View>
          </View>
          : null

        }
        {
            Acticle && Acticle.getPhotosIsPending == false && Acticle.photos.length == 0 ?
            <View style={{flexDirection:'row',paddingTop:30,alignItems : 'center',justifyContent : 'center'}}>
              <Text style={{fontSize:20}}>说好的妹子呢</Text>
            </View> :null
        }
        </ScrollView>
      </View>
    )
  }

  _lightImg(item){
    // console.log(item)
    const { Acticle } = this.props;
    const imgs = [];
    const urlArr = [];
    Acticle && Acticle.photos.length && Acticle.photos.map( (v,k) =>{
        urlArr.push(v.url);
        imgs.push(
          <View style={{flex: 1}} key={k}>
            <Image
              style={{flex: 1}}
              resizeMode="contain"
              source={{ uri: v.url }}
            />
          </View>
        )
    })
    imgs.unshift(
      <View style={{flex: 1}} key='212'>
        <Image
          style={{flex: 1}}
          resizeMode="contain"
          source={{ uri: item.url }}
        />
      </View>
    )
    let inx = urlArr.findIndex( (v,k,arr) => {
      return v == item.url;
    })
    imgs.splice(inx,1);
    return (
      <Carousel
        style={{ width: width, height: height }}
        autoplay={false}
      >
        {imgs}
      </Carousel>
    );
  }


  _renderImg(imgs){
    return (
      imgs.map( (v,k) =>{
        return (
          <TouchableOpacity
            key={'photo-' + k}
          >
            <LightBox
              renderContent={()=>this._lightImg(v)}
            >
              <Image
                style={{width:width/2,height:parseInt(Math.random() * (width/4) + (width/2))}}
                source={{uri : v.url}}
                defaultSource={require('../public/defaultImg.png')}
              />
            </LightBox>
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
    paddingBottom : 50
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
