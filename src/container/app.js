import React , { Component } from 'react';
import {  Navigator , View , Text , TabBarIOS} from 'react-native';
import { createStore , applyMiddleware , combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import asyncActionCallbackMiddleware from '../utils/asyncActionCallbackMiddleware';
import * as reducers from '../reducers';
import FeInnApp from './index';
import Icon from 'react-native-vector-icons/Ionicons';

const logger = createLogger({
	predicate: (getState, action) => true,
	collapsed: true,
	duration: true,
  colors: {
    prevState: () => `#FFEB3B`,
    nextState: () => `#4CAF50`,
  },
  diff: true,
});

let middlewares = [
  thunk,
  asyncActionCallbackMiddleware,
  logger
]
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
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
