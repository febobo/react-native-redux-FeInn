import React , { Component } from 'react';
import { Navigator , View , Text , Image , StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import Essence from '../page/Essence';
import * as EssenceActions from '../actions/EssenceActions';
import * as TabActions from '../actions/TabActions';
import { connect } from 'react-redux';
import navigationBar from './navigationBar'
import TabView from './tabview'

class FeInnApp extends Component {
  constructor (props){
    super(props);
  }

  render (){
    const { state , actions } = this.props;
    let defaultName = '精选';
    let defaultComponent = TabView;
    return (
      <Image
				style={styles.bg}>
        <Navigator
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.FloatFromRight;
            }}
            renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...this.props} {...route.params} navigator={navigator} />
            }}
        />
      </Image>
    )
  }
}

            // navigationBar={navigationBar}
const styles = StyleSheet.create({
	bg: {
		flex: 1,
		backgroundColor: 'transparent'
	}
});

const mapActionCreators = (dispatch) => ({
  essence : bindActionCreators(EssenceActions , dispatch),
  tab : bindActionCreators(TabActions , dispatch)
})

const mapStateToProps = (state)=>
({
  Essence : state.Essence,
  Tab : state.Tab
})

export default connect (mapStateToProps , mapActionCreators)(FeInnApp)
