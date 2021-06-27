/*
** Author: Jeremy Colameo - 06-2021
** Benedict.ch / School of Business
*/

import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import { SchuettelnEvent } from './SchuettelnEvent';

export default class MyProject extends Component {

  constructor() {
    super();
    this.state = {
      uri: require('./img/wurf1.png'),
      // Dies ist die Defaultzahl
      numHolder: 1
    }
  }

  generateRandomNumber() {
    let randNum = Math.floor(Math.random() * 6) + 1;
    console.log('randNum: ' + randNum);
    this.setState({
      numHolder: randNum
    })
    return randNum;
  }

  setWuerfel(randNum) {
    switch (randNum) {
      case 1:
        this.setState({
          uri: require('./img/wurf1.png')
        })
        break;
      case 2:
        this.setState({
          uri: require('./img/wurf2.png')
        })
        break;
      case 3:
        this.setState({
          uri: require('./img/wurf3.png')
        })
        break;
      case 4:
        this.setState({
          uri: require('./img/wurf4.png')
        })
        break;
      case 5:
        this.setState({
          uri: require('./img/wurf5.png')
        })
        break;
      case 6:
        this.setState({
          uri: require('./img/wurf6.png')
        })
        break;
      default:
    }
  }

  /**
   * Aktivieren
   */
  componentDidMount() {
    SchuettelnEvent.addListener(() => {
      var zufallzahl = this.generateRandomNumber(); // generate random number
      // SchuettelnEvent.number
      this.setWuerfel(zufallzahl);
      console.log("Shake " + this.state.numHolder);
    });
  }

  /**
   * Deaktivieren
   */
  componentWillUnmount() {
    SchuettelnEvent.removeListener();
  }

  render() {
    return (
      <View style={styles.MainContainer} >
        <Text style={styles.Titel}>Bitte fest Schütteln!</Text>
        <Image
          style={{ width: 200, height: 200 }}
          source={this.state.uri}
        />
        <Text style={styles.Text}>{this.state.numHolder}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Text: {
      marginTop: 20,
      paddingVertical: 8,
      borderWidth: 7,
      borderColor: "#20232a",
      borderRadius: 5,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 50,
      fontWeight: "bold"
    },
    Titel: {
      marginTop: 20,
      fontSize: 80,
      fontWeight: "bold"
    }
  });