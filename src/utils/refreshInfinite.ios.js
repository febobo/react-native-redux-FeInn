const React = require('react-native')
const {
    Image,
    View,
    Text,
    StyleSheet,
    ListView,
    Dimensions,
    ActivityIndicatorIOS,
    PropTypes,
    Component,
    ScrollView,
    TouchableHighlight
} = React;
import pull_arrow from '../assets/images/pull_arrow.png'
/*list status change graph
*
*STATUS_NONE->[STATUS_REFRESH_IDLE, STATUS_INFINITE_IDLE, STATUS_INFINITE_LOADED_ALL]
*STATUS_REFRESH_IDLE->[STATUS_NONE, STATUS_WILL_REFRESH]
*STATUS_WILL_REFRESH->[STATUS_REFRESH_IDLE, STATUS_REFRESHING]
*STATUS_REFRESHING->[STATUS_NONE]
*STATUS_INFINITE_IDLE->[STATUS_NONE, STATUS_WILL_INFINITE]
*STATUS_WILL_INFINITE->[STATUS_INFINITE_IDLE, STATUS_INFINITING]
*STATUS_INFINITING->[STATUS_NONE]
*STATUS_INFINITE_LOADED_ALL->[STATUS_NONE]
*
*/
const
STATUS_NONE = 0,
STATUS_REFRESH_IDLE = 1,
STATUS_WILL_REFRESH = 2,
STATUS_REFRESHING = 3,
STATUS_INFINITE_IDLE = 4,
STATUS_WILL_INFINITE = 5,
STATUS_INFINITING = 6,
STATUS_INFINITE_LOADED_ALL = 7,
STATUS_INFINITE_SCROLL_LOAD = 8;

const DEFAULT_PULL_DISTANCE = 60;
const DEFAULT_HF_HEIGHT = 50;
const DEFAULT_SCROLL_LOAD_HEIGHT = 150;

const styles = StyleSheet.create({
    text: {
        fontSize:16,
    },
    image: {
        width:40,
        height:32,
    },
    imageRotate: {
        transform:[{rotateX: '180deg'},],
    }
})

export default class RefreshInfiniteListView extends Component{
  constructor(props){
    super(props)
    this.state = {
      status: STATUS_NONE,
      isLoadedAllData: false,
    }
    this.renderRow = this.renderRow.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.handleResponderGrant = this.handleResponderGrant.bind(this)
    this.hideHeader = this.hideHeader.bind(this)
    this.hideFooter = this.hideFooter.bind(this)
    this.handleResponderRelease = this.handleResponderRelease.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  renderRow(text) {
      if (this.dataSource) {
          return this.props.renderEmptyRow(text);
      } else {
          return this.props.renderRow(text);
      }
  }
  renderHeader() {
      var status = this.state.status;
      if (status === STATUS_REFRESH_IDLE) {
          return this.props.renderHeaderRefreshIdle();
      }
      if (status === STATUS_WILL_REFRESH) {
          return this.props.renderHeaderWillRefresh();
      }
      if (status === STATUS_REFRESHING) {
          return this.props.renderHeaderRefreshing();
      }
      return null;
  }
  renderFooter() {
      var status = this.state.status;
      this.footerIsRender = true;
      if (status === STATUS_INFINITE_IDLE) {
          return this.props.renderFooterInifiteIdle();
      }
      if (status === STATUS_WILL_INFINITE) {
          return this.props.renderFooterWillInifite();
      }
      //添加数据加载完后的footer
      if(!this.props.isMoreData){
        return this.props.renderFooterNoData();
      }

      if (status === STATUS_INFINITING) {
          return this.props.renderFooterInifiting();
      }
      if (status === STATUS_INFINITE_LOADED_ALL) {
          return this.props.renderFooterInifiteLoadedAll();
      }
      this.footerIsRender = false;
      return null;
  }
  handleResponderGrant(event) {
      var nativeEvent = event.nativeEvent;
      if (!nativeEvent.contentInset || this.state.status!==STATUS_NONE) {
          return;
      }
      var y0 = nativeEvent.contentInset.top + nativeEvent.contentOffset.y;
      if (y0 < 0) {
          this.setState({status:STATUS_REFRESH_IDLE});
          return;
      }
      y0 = nativeEvent.contentInset.top + nativeEvent.contentOffset.y +
      nativeEvent.layoutMeasurement.height-nativeEvent.contentSize.height;
      //增加滚动加载.
      if(!this.props.enableScrollLoad && y0 > 0){
        if (!this.props.loadedAllData()) {
            this.initialInfiniteOffset = (y0>0?y0:0);
            this.setState({status:STATUS_INFINITE_IDLE});
        } else {
            this.setState({status:STATUS_INFINITE_LOADED_ALL});
        }
      }
  }
  hideHeader() {
      this.setState({status:STATUS_NONE});
  }
  hideFooter() {
      this.setState({status:STATUS_NONE});
  }
  handleResponderRelease(event) {
      var status = this.state.status;
      if (status === STATUS_REFRESH_IDLE) {
          this.setState({status:STATUS_NONE});
      } else if (status === STATUS_WILL_REFRESH) {
          this.setState({status:STATUS_REFRESHING});
          this.props.onRefresh();
      } else if (status === STATUS_INFINITE_IDLE) {
          this.setState({status:STATUS_NONE});
      } else if (status === STATUS_WILL_INFINITE) {
          this.setState({status:STATUS_INFINITING});
          this.props.onInfinite();
      } else if (status === STATUS_INFINITE_LOADED_ALL) {
          this.setState({status:STATUS_NONE});
      }else if (status === STATUS_INFINITE_SCROLL_LOAD) {
        //增加无限滚动加载.
          this.setState({status:STATUS_INFINITING});
          this.props.onInfinite();
      }
  }
  handleScroll(event) {
      var nativeEvent = event.nativeEvent;
      var status = this.state.status;
      if (status===STATUS_REFRESH_IDLE || status===STATUS_WILL_REFRESH) {
          var y = nativeEvent.contentInset.top + nativeEvent.contentOffset.y
          if (status!==STATUS_WILL_REFRESH && y<-this.props.pullDistance) {
              this.setState({status:STATUS_WILL_REFRESH});
          } else if (status===STATUS_WILL_REFRESH && y>=-this.props.pullDistance) {
              this.setState({status:STATUS_REFRESH_IDLE});
          }
          return;
      }

      if (status===STATUS_INFINITE_IDLE || status===STATUS_WILL_INFINITE) {
          var y = nativeEvent.contentInset.top + nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height
          -nativeEvent.contentSize.height-this.initialInfiniteOffset;
          if (this.footerIsRender) {
              y += this.props.footerHeight;
          }
          if (status!==STATUS_WILL_INFINITE && y>this.props.pullDistance) {
              this.setState({status:STATUS_WILL_INFINITE});
          } else if (status===STATUS_WILL_INFINITE && y<=this.props.pullDistance) {
              this.setState({status:STATUS_INFINITE_IDLE});
          }
      }

      let y0 = nativeEvent.contentInset.top + nativeEvent.contentOffset.y +
      nativeEvent.layoutMeasurement.height-nativeEvent.contentSize.height;
      //增加滚动加载.
      if(this.props.enableScrollLoad && this.props.isMoreData && Math.abs(y0) < this.props.scrollLoadHeight){
        this.setState({status:STATUS_INFINITE_SCROLL_LOAD});
      }
  }

  render() {
      this.dataSource = null;
      if (!this.props.dataSource.getRowCount()) {
          var DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.dataSource = DataSource.cloneWithRows([""]);

      }
      return (
          <ListView
              {...this.props}
              onResponderGrant={this.handleResponderGrant}
              onResponderRelease={this.handleResponderRelease}
              dataSource={this.dataSource?this.dataSource:this.props.dataSource}
              renderRow={this.renderRow}
              renderHeader={this.renderHeader}
              renderFooter={this.renderFooter}
              onScroll={this.handleScroll}
              />
      )
  }
}

RefreshInfiniteListView.propTypes = {
  footerHeight : PropTypes.number,
  pullDistance : PropTypes.number,
  scrollLoadHeight: PropTypes.number,
  renderEmptyRow : PropTypes.func,
  renderHeaderRefreshIdle : PropTypes.func,
  renderHeaderWillRefresh : PropTypes.func,
  renderHeaderRefreshing : PropTypes.func,
  renderFooterInifiteIdle : PropTypes.func,
  renderFooterWillInifite : PropTypes.func,
  renderFooterInifiting : PropTypes.func,
  renderFooterInifiteLoadedAll : PropTypes.func,
  enableScrollLoad: PropTypes.bool,
  renderFooterNoData: PropTypes.func,
  isMoreData: PropTypes.bool,
}

RefreshInfiniteListView.defaultProps = {
  footerHeight: DEFAULT_HF_HEIGHT,
  pullDistance: DEFAULT_PULL_DISTANCE,
  scrollLoadHeight: DEFAULT_SCROLL_LOAD_HEIGHT,
  enableScrollLoad:false,
  renderEmptyRow: () => {
    return (
        <View style={{height:Dimensions.get('window').height*2/3, justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:40, fontWeight:'800', color:'red'}}>
                正在加载...
            </Text>
        </View>
    )
  },
  renderHeaderRefreshIdle: () => {return (
      <View style={{flex:1, height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.text}>
              下拉加载最新...
          </Text>
          <Image
              source={pull_arrow}
              resizeMode={Image.resizeMode.stretch}
              style={styles.image}
              />
      </View>
  )},
  renderHeaderWillRefresh: () => {return (
      <View style={{height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.text}>
              松开刷新...
          </Text>
          <Image
              source={pull_arrow}
              resizeMode={Image.resizeMode.stretch}
              style={[styles.image, styles.imageRotate]}
              />
      </View>
  )},
  renderHeaderRefreshing: () => {return (
      <View style={{height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.text}>
              刷新中...
          </Text>

          <ActivityIndicatorIOS
              size='small'
              animating={true}/>
      </View>
  )},
  renderFooterInifiteIdle: () => {return (
      <View style={{height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Image
              source={pull_arrow}
              resizeMode={Image.resizeMode.stretch}
              style={[styles.image, styles.imageRotate]}
              />
          <Text style={styles.text}>
              上拉加载更多...
          </Text>
      </View>
  )},
  renderFooterWillInifite: () => {return (
      <View style={{height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Image
              source={pull_arrow}
              resizeMode={Image.resizeMode.stretch}
              style={styles.image}
              />
          <Text style={styles.text}>
              松开加载更多...
          </Text>
      </View>
  )},
  renderFooterInifiting: () => {return (
      <View style={{height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicatorIOS
              size='small'
              animating={true}/>
          <Text style={styles.text}>
              正在加载...
          </Text>
      </View>
  )},
  renderFooterInifiteLoadedAll: () => { return (
      <View style={{height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.text}>
              加载全部数据
          </Text>
      </View>
  )},
  renderFooterNoData:() => {
    return (
      <View style={{height:DEFAULT_HF_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.text}>
              没有更多文章了...
          </Text>
      </View>
    )
  },
  loadedAllData: () => {
      return false;
  },
  onRefresh: () => {
      console.log("onRefresh");
  },
  onInfinite: () => {
      console.log("onInfinite");
  },
}
