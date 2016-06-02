import React, {
	Component,
	StyleSheet,
	Dimensions,
	View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Return extends Component {
	_onPress() {
    const { navigator } = this.props
		navigator && navigator.pop && navigator.pop()
	}

	render() {
    console.log(this)
		return (
      <View style={styles.arrow}>
        <TouchableOpacity onPress={this._onPress.bind(this)}>
  				<View style={styles.iconWrapper}>
  					<Icon
  						name='md-arrow-back'
  						size={ 30 }
  						color='rgba(255,255,255,1)'
  						style={ styles.returnIcon }/>
  				</View>
        </TouchableOpacity>
			</View>
		)
	}
}

const returnSize = 45;
const styles = StyleSheet.create({
  arrow : {
    flex : 1,
    position:'absolute',
    left : 20,
    bottom : 25,

  },
	returnIcon: {
		flex: 1,
		textAlign: 'center'
	},
	iconWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
		height: returnSize,
		width: returnSize,
    borderRadius : returnSize/2
	}
});
