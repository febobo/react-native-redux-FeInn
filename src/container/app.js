import React , { Component } from 'react';
import {  Navigator , View , Text , TabBarIOS} from 'react-native';
import { createStore , applyMiddleware , combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import asyncActionCallbackMiddleware from '../utils/asyncActionCallbackMiddleware';
import promiseMiddleware from '../utils/promiseMiddleware'
import reduxPromiseMiddleware from 'redux-promise';
import * as reducers from '../reducers';
import * as FeInnAppPage from './index';
import connectComponent from '../utils/connectComponent';
const FeInnApp = connectComponent(FeInnAppPage);
import Icon from 'react-native-vector-icons/Ionicons';
// var WeChat=require('react-native-wechat');
import * as WeChat from "react-native-wechat"

const logger = createLogger({
	predicate: (getState, action) => false,
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
  promiseMiddleware,
	reduxPromiseMiddleware,
  asyncActionCallbackMiddleware,
  logger,
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

	async componentDidMount (){
    try {
      await WeChat.registerApp('wxb3b6cb97e4c0afbf');
      this.apiVersion = await WeChat.getApiVersion();
      this.wxAppInstallUrl = await WeChat.getWXAppInstallUrl();
      this.isWXAppSupportApi = await WeChat.isWXAppSupportApi();
      this.isWXAppInstalled = await WeChat.isWXAppInstalled();
      console.log(this)
    } catch (e) {
      console.error(e);
    }
  }

  render (){
    return (
      <Provider store={store}>
        <FeInnApp />
      </Provider>
    )
  }
}
