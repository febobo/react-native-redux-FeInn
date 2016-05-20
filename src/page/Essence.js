
import React from 'react';
import {
  Component ,
  Navigator ,
  View ,
  Text,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Article from './Article'

export default class Essence extends Component {
  constructor (props){
    super(props);
  }

  to(){
    const { navigator } = this.props;
    console.log(this)
    navigator.push({
      name : '文章',
      component : Article,
    })
  }

  render (){
    return (
      <View style={[styles.container]}>
        <Text style={{fontSize:30,color:'#837'}}>Hello React-native</Text>
        <TouchableHighlight onPress={ () => this.to() }>
            <Text style={[styles.link]}>Go</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'yellow'
  },
  link : {
    padding : 10,
    paddingHorizontal: 20,
    borderRadius : 3,
    borderColor: 'blue',
    borderWidth : 1,
    marginTop:20,
    // color : '#fff'
  }
})
