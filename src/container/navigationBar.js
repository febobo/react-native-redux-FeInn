import React , { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  base : {
    flex : 1
  },
  back : {
    color : '#fff',
    lineHeight:30,
    padding :10,
    paddingTop:0
  }
})

let NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.back }>返回</Text>
        </TouchableHighlight>)
    }
    else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress) return (
      <TouchableHighlight
         onPress={ () => route.onPress() }>
         <Text style={ styles.rightNavButtonText }>
              { route.back || 'Right Button' }
         </Text>
       </TouchableHighlight>)
  },
  Title(route, navigator, index, navState) {
    // console.log(route , navigator , index , navState)
    return <Text numberOfLines={1} style={{width:250,textAlign:'center',fontSize:18 , lineHeight:30 , color : '#fff'}}>{route.name}</Text>
  }
};

export default (
  <Navigator.NavigationBar
    routeMapper={NavigationBarRouteMapper}
  />
)
