import {Component} from 'React'
import React, {
	PropTypes,
	View,
	StyleSheet,
	Text,
	Dimensions,
	Animated
} from 'react-native';

class Toast extends Component {

  constructor (props){
    super(props);
    this.state = {
      fadeAnim : new Animated.Value(1),
      show : true,
      defaultText : '系统异常',
      defaultDely : 3000
    }
  }

  show (){
    Animated.timing(this.state.fadeAnim, {
			toValue: 0,
			duration: this.state.defaultDely
		}).start();
  }

  render (){
		console.log(222222222)
    return(
      <Animated.View
        style={[styles.toastWrap,{opacity: this.state.fadeAnim}]}
      >
        <Text style={styles.toastText}>{this.state.defaultText}</Text>
      </Animated.View>
    )
  }
}
const { width , height } = Dimensions.get('window');
const styles = StyleSheet.create({
  toastWrap : {
    position : 'absolute',
    bottom : 80,
    left : (width - (width - 150))/2,
    width : width - 150,
    height : 50,
    borderRadius : 25,
    backgroundColor : '#333',
    flex : 1,
    alignItems: 'center',
    justifyContent : 'center',
    opacity : .7
  },
  toastText : {
    backgroundColor : 'transparent',
    fontSize : 16,
    color : '#fff'
  }
})
export const LayoutComponent = Toast;
export function mapStateToProps(state){
  return {
		Utils : state && state.Utils
  }
}
