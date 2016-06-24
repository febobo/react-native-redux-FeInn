import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import Video from 'react-native-video';
class Welfare extends Component {
  constructor (props){
    super(props);
  }

  componentWillMount (){
    const { actions , Welfare } = this.props;
    actions.getVideo({
      page : Welfare.page,
      limit: Welfare.limit
    })
  }

  render (){
    const { Welfare } = this.props;
    return (
      <View style={[styles.container]}>
        <View>
          <View style={styles.dirRow}>
            <Image
              style={styles.userImg}
              resizeMode="contain"
              source={{ uri: 'http://tp1.sinaimg.cn/1737662980/50/5673138160/1' }}
            />
            <View>
              <Text>Amy</Text>
              <Text>2016-08-19</Text>
            </View>
          </View>
          <View>
            <Text>
              讲真，大下雨天的，瘦子就别出门了。如果出门也要把好你身旁那个胖子！
            </Text>
          </View>
          <Video source={{uri: "http://mvideo.spriteapp.cn/video/2016/0623/576bcd3687d59_wpc.mp4"}}
                 rate={1.0}
                 volume={1.0}
                 muted={false}
                 paused={true}
                 resizeMode="cover"
                 repeat={true}
                 playInBackground={false}
                 playWhenInactive={false}
                 style={styles.backgroundVideo}
                 onEnd={() => { console.log('done') }}
           />
        </View>
      </View>
    )
  }
}

const userImg = 40;
const { width , height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  userImg : {
    width : userImg,
    height :userImg,
    borderRadius : userImg/2
  },
  dirRow : {
    flexDirection : 'row'
  },
  backgroundVideo : {
    width : width ,
    height : 200
  }
})

export const LayoutComponent = Welfare;
export function mapStateToProps(state){
  return {
    Welfare : state.Welfare,
  }
}
