import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ListView,
  RefreshControl,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabShow from '../components/TabShow';
export default class About extends Component {
  constructor (props){
    super(props);
    this.renderBackIcon = this.renderBackIcon.bind(this);
  }

  openSource (url){
    Linking.openURL(url)
    .catch(err => console.error('An error occurred', err));
  }

  renderBackIcon (){
    return (
      <Icon
        name='md-close'
        size={ 30 }
        color='rgba(255,255,255,1)'
      />
    )
  }

  render (){
    return (
      <View style={[styles.container]}>
        <View style={[styles.logo]}>
          <TouchableOpacity style={styles.flexRow}
            onPress={ () => {this.openSource('https://github.com/febobo/react-native-redux-FeInn')}}
          >
            <Icon
              name='logo-nodejs'
              size={ 45 }
              color='#fff'
            />
          </TouchableOpacity>
          <View style={styles.flexRow}>
            <Text style={styles.aboutText}>FeInn   v0.1.0</Text>
          </View>
        </View>
        <View style={[styles.githubSource]}>
          <TouchableOpacity style={styles.flexRow}
            onPress={ () => {this.openSource('https://github.com/febobo/react-native-redux-FeInn')}}
          >
            <Icon
              name='logo-github'
              size={ 45 }
              color='#fff'
            />
          </TouchableOpacity>
          <View style={styles.flexRow}>
            <Text style={styles.aboutText}>@febobo(十三把刀)</Text>
          </View>
        </View>
        <View style={[styles.flexRow,styles.pack]}>
          <TouchableOpacity
            onPress={ () => {this.openSource('https://github.com/facebook/react-native')}}
          >
            <Text style={{width : width , textAlign : 'center',color:'#fff'}}>Powered by ReactNativ v^0.28.0</Text>
          </TouchableOpacity>
        </View>
        <TabShow {...this.props}
          content={this.renderBackIcon()}
          wrapStyle={styles.wrapStyle}
          appStyle={styles.appStyle}
         />
      </View>
    )
  }
}

const { width , height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingBottom : 15,
    backgroundColor : '#515151'
  },
  logo : {
    paddingTop : height / 5,
  },
  flexRow : {
    flexDirection : 'row',
    justifyContent : 'center'
  },
  githubSource : {
    paddingTop : 20
  },
  pack : {
    position : 'absolute',
    bottom : 8
  },
  wrapStyle : {
    flex : 1,
    position:'absolute',
    right : 20,
    top : 25,
  },
  appStyle : {
    backgroundColor : 'transparent'
  },
  aboutText : {
    color : '#fff'
  }
})
