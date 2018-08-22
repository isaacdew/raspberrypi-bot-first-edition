import React from 'react';
import { StyleSheet, View, WebView, TouchableOpacity } from 'react-native';
import { forward, backward, turnLeft, turnRight, fire } from './api';


//I know what you're thinking...Why a new component for every triangle?
//Simply rotating TouchableOpacity component causes the app to crash onPressIn
class TriangleUp extends React.Component {
  render() {
    return (
      <View style={styles.triangle}></View>
    );
  }
}

class TriangleDown extends React.Component {
  render() {
    return (
      <View style={[styles.triangle, styles.triangleDown]}></View>
    );
  }
}

class TriangleLeft extends React.Component {
  render() {
    return (
      <View style={[styles.triangle, styles.triangleLeft]}></View>
    );
  }
}

class TriangleRight extends React.Component {
  render() {
    return (
      <View style={[styles.triangle, styles.triangleRight]}></View>
    );
  }
}

/* 
   For every action on a button or TouchableOpacity, we want that action to loop until the button is released.
   So we use setTimeout(function, execution frequency in ms) to have the function we use in onPressIn to call itself
   until onPressOut stops the timer using clearTimeout. You'll see this method throughout the app.
*/
class RocketLauncher extends React.Component {
  constructor(props) {
    super(props);

    this.timerFire = null;

    this.fireRepeat = this.fireRepeat.bind(this);
    this.stopTimer = this.stopTimer.bind(this);

  }
  fireRepeat() {
    clearTimeout(this.timerFire);
    fire();
    this.timerFire = setTimeout(this.fireRepeat, 400);
  }
  stopTimer() {
    clearTimeout(this.timerFire);
    console.log('Stopped!');
  }

  render() {
    return (
      <View style={{ paddingLeft: 50, paddingRight: 39, marginBottom: 15, height: 60}}>
        <View></View>
        <View style={{marginBottom: 5}}>
            <TouchableOpacity style={[styles.button, styles.buttonRound]} onPressIn={this.fireRepeat} onPressOut={this.stopTimer}>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class TrackControlPad extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;


    this.forwardRepeat = this.forwardRepeat.bind(this);
    this.backwardRepeat = this.backwardRepeat.bind(this);
    this.leftRepeat = this.leftRepeat.bind(this);
    this.rightRepeat = this.rightRepeat.bind(this);

    this.stopTimer = this.stopTimer.bind(this);
    

  }
  forwardRepeat() {
    clearTimeout(this.timer);
    forward();
    this.timer = setTimeout(this.forwardRepeat, 100);
  }
  backwardRepeat() {
    clearTimeout(this.timer);
    backward();
    this.timer = setTimeout(this.backwardRepeat, 100);
  }
  leftRepeat() {
    clearTimeout(this.timer);
    turnLeft();
    this.timer = setTimeout(this.leftRepeat, 100);
  }
  rightRepeat() {
    clearTimeout(this.timer);
    turnRight();
    this.timer = setTimeout(this.rightRepeat, 100);
  }

  stopTimer() {
    clearTimeout(this.timer);
    console.log('Stopped!');
  }

  render() {
    return (
      <View>
        <View style={{width: 65}}>
          <View style={{marginBottom: 5}}>
            <TouchableOpacity style={styles.button} onPressIn={this.forwardRepeat} onPressOut={this.stopTimer}>
              <TriangleUp/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPressIn={this.backwardRepeat} onPressOut={this.stopTimer}>
            <TriangleDown/>
          </TouchableOpacity>
          <View>
            <View style={{marginRight: 110, bottom: 98}}>
              <TouchableOpacity style={styles.button} onPressIn={this.leftRepeat} onPressOut={this.stopTimer}>
                <TriangleLeft/>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 130, bottom: 160}}>
              <TouchableOpacity style={styles.button} onPressIn={this.rightRepeat} onPressOut={this.stopTimer}>
                <TriangleRight/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
/* 
   You may notice we're using WebView to pull our live camera feed. If you're familiar with HTML, WebView is practically an
   iframe.
 */
export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: 'http://192.168.10.123:11000/'}} style={styles.webview} />
        <RocketLauncher/>
        <View style={{flex: 1, flexDirection: 'row', paddingLeft: 50, paddingRight: 50, paddingTop: 5}}>
          <View style={{width:475}}/>
          <TrackControlPad/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#256bca',
    height: 60,
    width: 60,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonRound: {
    borderRadius: 60/2
  },
  webview: {
    flex: 0,
    width: 700,
    height: 410
  },
  triangleDown: {
    transform: [{rotate: '180deg'}]
  },
  triangleLeft: {
    transform: [{rotate: '-90deg'}]
  },
  triangleRight: {
    transform: [{rotate: '90deg'}]
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 35,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    margin: 5
  }
  
});
