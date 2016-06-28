
import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Vibration,
  Platform
} from 'react-native';
import TabShow from '../components/TabShow';
import Camera from 'react-native-camera';
import BarcodeScanner from 'react-native-barcodescanner';
import Icon from 'react-native-vector-icons/Ionicons';
import { randomBg } from '../utils';


class QrCode extends Component {
  constructor (props){
    super(props);
    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };
    this.succesed = false;
  }

  componentWillMount (){
    // const { navigator , actions } = this.props;
    //
    // actions.checkToken('89f37401-8659-4535-9f16-b31068495928' || data.data , ()=>{
    //   setTimeout( () => {
    //     navigator.pop();
    //     actions.toast('登陆成功',3000)
    //   },100)
    //
    // })
  }


  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  _onBarCodeRead (data){
    if (this.succesed) return;
		this.succesed = true;
    const { navigator , actions } = this.props;
    Vibration.vibrate()
    actions.checkToken('89f37401-8659-4535-9f16-b31068495928' || data.data , ()=>{
      navigator.pop();
      actions.toast('登陆成功',3000)
    })

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
    })
    // for android
		if (Platform.OS === 'android') {
			return (
				<View style={styles.container}>
					<BarcodeScanner
						onBarCodeRead={this._onBarCodeRead.bind(this)}
						style={styles.cameraViewWrap}/>
          <TabShow {...this.props}
            content={pointContent}
            wrapStyle={styles.wrapStyle}
           />
				</View>
			)
		}

    return (
      <View style={[styles.container]}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this._onBarCodeRead.bind(this)}
        >
          <View style={styles.cameraViewWrap}>
  					<View style={styles.cameraView}>
  						<View key="1" style={[styles.borderLeftTop,styles.borderBox]}/>
  						<View key="2" style={[styles.borderRightTop,styles.borderBox]}/>
  						<View key="3" style={[styles.borderLeftBottom,styles.borderBox]}/>
  						<View key="4" style={[styles.borderRightBottom,styles.borderBox]}/>
  					</View>
  					<Text style={styles.infoText}>
  						请将二维码放到框内
  					</Text>
  				</View>
        </Camera>
        <TabShow {...this.props}
          content={pointContent}
          wrapStyle={styles.wrapStyle}
         />
      </View>
    )
  }
}


const {height, width} = Dimensions.get('window');
const cameraSize = 250;
const borderColor = 'rgba(255,255,255,0.6)';
const borderBoxSize = 35;
const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  preview : {
    flex : 1,
    alignItems:'center',
    justifyContent : 'center'
  },
  cameraViewWrap: {
		height: 350,
    alignItems:'center',
    justifyContent : 'center'
	},
  cameraView: {
		height: cameraSize,
		width: cameraSize,
	},
	borderBox: {
		position: 'absolute',
		borderWidth: 2,
		height: borderBoxSize,
		width: borderBoxSize
	},
	borderLeftTop: {
		borderColor: 'transparent',
		borderLeftColor: borderColor,
		borderTopColor: borderColor,
		left: 0,
		top: 0
	},
	borderRightTop: {
		borderColor: 'transparent',
		borderRightColor: borderColor,
		borderTopColor: borderColor,
		right: 0,
		top: 0
	},
	borderLeftBottom: {
		borderColor: 'transparent',
		borderLeftColor: borderColor,
		borderBottomColor: borderColor,
		left: 0,
		bottom: 0
	},
	borderRightBottom: {
		borderColor: 'transparent',
		borderRightColor: borderColor,
		borderBottomColor: borderColor,
		right: 0,
		bottom: 0
	},
  infoText: {
		color: 'rgba(255,255,255,0.7)',
		textAlign: 'center',
		marginTop: 40,
		fontSize: 24
	},
  wrapStyle : {
    flex : 1,
    position:'absolute',
    left : 20,
    bottom : Platform.OS == 'ios' ? 25 : 50,
  },
})

export const LayoutComponent = QrCode;
export function mapStateToProps(state){
  return {
    User : state && state.User
  }
}
