/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Navigator,
  TouchableHighlight       
} from 'react-native';

import EventList from './EventList';

class ReligionWithImage extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};
  }

  render() {
	let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
    	<View style={styles.container}>
	    	<Image source={pic.uri+this.props.name} style={{width: 93, height: 110}}/>
	      	<Text>{this.props.text}</Text>
      	</View>
    );
  }
}
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}
export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([  'ds'    ])
    };
	const religionsUrl = 'https://letspray-61eaf.firebaseio.com/religions.json';
	fetch(religionsUrl).then((x)=>x.json())
	.then(y=>this.setState({dataSource: ds.cloneWithRows(y.split(','))})).done();
  }
  render() {
			
		let picUri ='https://firebasestorage.googleapis.com/v0/b/letspray-61eaf.appspot.com/o/religion-christian.png?alt=media';
	    

	    return (
	      <View style={styles.container}>
	        <Text style={styles.welcome}>
	          Welcome to React Native doruk!
	        </Text>
    	    <Blink text='doruk'/>
	        
	        <ListView
	          dataSource={this.state.dataSource}
	          renderRow={(rowData) => {
              return (
  	          	<TouchableHighlight onPress={
                  ()=>{
                     this.props.navigator.push({
                        title:  " details",
                        component: EventList
                      });
                      }
                  }>
  		          	<View style={{alignItems:'center'}}>
  		          		<Image source={{uri: picUri.replace('christian',rowData)}}
  	       					style={{width: 48, height: 48}} />
  			          	<Text>{rowData}</Text>   	    
  		          	</View>
  	          	</TouchableHighlight>       
	          	)}}
        	/>
	      </View>
	    );
	
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
