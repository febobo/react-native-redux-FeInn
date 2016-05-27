
import React from 'react';
import {
  Component ,
  Navigator ,
  View ,
  Text,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  ListView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

import Article from './Article'

export default class Essence extends Component {
  constructor (props){
    super(props);
  }

  componentWillMount (){
    const { getList } = this.props.essence;
    getList()
  }

  to(){
    const { navigator } = this.props;
    console.log(this)
    navigator.push({
      name : '文章',
      component : Article,
    })
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    console.log(rowData, sectionID, rowID, highlightRow)
    return (
      <View style={[styles.rows]} key={rowData.id}>
        <Image
          style={styles.article}
          source={{uri: rowData.author.avatar_url}}
        />
        <View
          style={styles.content}
        >
          <Text
            style={[styles.articleTitle]}
            numberOfLines={1}
          >
            {rowData.title}
          </Text>
          <View style={[styles.articleDec]}>
            <Text style={{flex:1}}>131/3133</Text>
            <View style={{flex:2,flexDirection:'row',alignItems : 'center'}}>
              <Text style={[styles.tag]}>{rowData.tab}</Text>
              {
                rowData.good ?
                <Text style={[styles.tag]}>精华</Text> : null
              }
              {
                rowData.top ?
                <Text style={[styles.tag]}>置顶</Text> : null
              }
            </View>
            <Text style={{flex:1,textAlign:'right'}}>3天前</Text>
          </View>
        </View>
      </View>
    )
  }
  render (){
    const { data } = this.props.Essence;
    return (
      <View style={[styles.container]}>
        {
          data ?
          <ListView
            dataSource={ds.cloneWithRows(data)}
            renderRow={this._renderRow.bind(this)}
          /> :
          null
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    // alignItems : 'center',
    // justifyContent : 'center',
    // backgroundColor : 'yellow',
    paddingTop:65,
    paddingVertical : 5
  },
  flex1 : {
    flex : 1
  },
  rows : {
    padding : 10,
    borderBottomWidth : 1,
    borderStyle : 'solid',
    borderBottomColor : '#eee',
    flexDirection : 'row',
    height : 80
  },
  tag : {
    marginRight : 4
  },
  article : {
    width : 50,
    height : 50,
    borderRadius : 25
  },
  articleTitle : {
    fontSize : 16,
    flex : 1
  },
  articleDec : {
    flexDirection : 'row',
    alignItems : 'center',
    flex : 1
  },
  content : {
    flex : 1,
    paddingLeft : 8
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

// <View style={[styles.rows]} key={rowData.id}>
//   <Image
//     style={styles.article}
//     source={{uri: rowData.author.avatar_url}}
//   />
//   <View
//     style={styles.content}
//   >
//     <Text
//       style={[styles.articleTitle]}
//       numberOfLines={1}
//     >
//       {rowData.title}
//     </Text>
//     <View style={[styles.articleDec]}>
//       <Text style={{flex:1}}>131/3133</Text>
//       <Text style={{flex:1 }}>
//         <Text style={[styles.flex1]}>{rowData.tab}</Text>
//         {
//           rowData.good ?
//           <Text style={[styles.flex1]}>精华</Text> : null
//         }
//         {
//           rowData.top ?
//           <Text style={[styles.flex1]}>置顶</Text> : null
//         }
//       </Text>
//       <Text style={{flex:1,textAlign:'right'}}>3天前</Text>
//     </View>
//   </View>
// </View>
