import React,{Component} from 'react';
import { Navigator , View , Text} from 'react-native';
import { bindActionCreators } from 'redux';
import Essence from '../page/Essence';

import * as EssenceActions from '../actions/EssenceActions';
import { connect } from 'react-redux';

class FeInnApp extends Component {
  constructor (props){
    super(props);
  }

  render (){
    return (
      <Essence />
    )
  }
}


        // <Essence {...this.props} />
export default connect ( state => ({
  essence : state.essence,
}),
  (dispatch) => ({
    essence : bindActionCreators(EssenceActions , dispatch)
  })
)(FeInnApp)
