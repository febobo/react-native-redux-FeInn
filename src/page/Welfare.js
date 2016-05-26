
import React from 'react';
import {
  Component ,
  Navigator ,
  View ,
  Text,
  StyleSheet
} from 'react-native';

export default class Welfare extends Component {
  constructor (props){
    super(props);
  }

  render (){
    return (
      <View style={[styles.container]}>
        <Text style={{fontSize:30,color:'#fff'}}>Hello React-native</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : '#730'
  }
})
