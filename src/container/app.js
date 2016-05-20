import React from 'react';
import { Component , Navigator , View , Text , TabBarIOS} from 'react-native';
import { createStore , applyMiddleware , combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import FeInnApp from './index';
import Icon from 'react-native-vector-icons/Ionicons';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }
  
  render (){
    return (
      <Provider store={store}>
        <FeInnApp />
      </Provider>
    )
  }
}
