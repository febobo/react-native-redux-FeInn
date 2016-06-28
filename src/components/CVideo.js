
import React , { Component } from 'react';
import  {
	PropTypes,
	View,
	StyleSheet,
	Text,
	Dimensions,
	Animated,
  TouchableOpacity,
	Image
} from 'react-native';

import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
class CVideo extends Component {

  constructor (props){
    super(props);
    this.state = {
      paused : true,
    }
  }

  renderStopIcon (){
      return (
        <Icon
          name='ios-pause'
          size={iconWidth}
          color='#000'
          style={styles.stopIcon}
        />
      )
  }

  renderStartIcon (){
      return (
        <Icon
          name='md-arrow-dropright-circle'
          size={iconWidth}
          color='#000'
          style={styles.stopIcon}
        />
      )
  }
  render (){
    const { row } = this.props;
    return(
      <TouchableOpacity style={styles.backgroundVideo} onPress={() => {this.setState({paused: !this.state.paused})}}>
				<Image style={styles.backgroundVideo} source={{uri: row.video_uri}} >
        <Video source={{uri: row.video_uri}}
               rate={1.0}
               volume={1.0}
               muted={false}
               paused={this.state.paused}
               resizeMode="cover"
               repeat={true}
               playInBackground={false}
               playWhenInactive={false}
               style={styles.backgroundVideo}
               onEnd={() => { console.log('done') }}
         />
				 </Image>
         {
            this.state.paused ?
            this.renderStartIcon() :
            this.renderStopIcon()
         }
      </TouchableOpacity>
    )
  }
}
const { width , height } = Dimensions.get('window');
const iconWidth = 40;
const paddingW = 20;
const styles = StyleSheet.create({
  backgroundVideo : {
    width : width - paddingW ,
    height : 200,
    position : 'relative',
    alignItems : 'center'
  },
  stopIcon : {
    position: 'absolute',
    top : 200/2,
    left : width/2 - paddingW,
    marginTop : -iconWidth/2,
    marginLeft : -iconWidth/2,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
export default CVideo;
