
import React , { Component } from 'react';
import  {
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
      defaultText : '欢迎回来',
      defaultDely : 1500
    }
  }

	componentWillMount (){
		this.show('',5000);
	}

  show (text,dely){
		if(text) this.setState({defaultText:text});
		if(dely) this.setState({defaultDely:dely});

		this.setState({
			show : true,
		})

    Animated.timing(this.state.fadeAnim, {
			toValue: 0,
			duration: this.state.defaultDely
		}).start(()=>{
			this.setState({
	      fadeAnim : new Animated.Value(1),
	      show : false,
	      defaultText : '欢迎回来',
	      defaultDely : 1500
	    })
		});
  }

  render (){
		if(!this.state.show) return null;
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
export default Toast;
