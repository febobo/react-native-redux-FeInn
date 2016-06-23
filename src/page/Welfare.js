import React , { Component } from 'react';
import {
  Navigator ,
  View ,
  Text,
  StyleSheet
} from 'react-native';

class Welfare extends Component {
  constructor (props){
    super(props);
  }

  componentWillMount (){
    const { actions , Welfare } = this.props;
    console.log(actions)
    actions.getVideo({
      page : Welfare.page,
      limit: Welfare.limit
    })
  }

  render (){
    return (
      <View style={[styles.container]}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  }
})

export const LayoutComponent = Welfare;
export function mapStateToProps(state){
  return {
    Welfare : state.Welfare,
  }
}
