import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import loadResource from 'react-native-local-resource'

import myResource from './src/myMarkdownResource.md'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = { myResourceContent: 'not loaded yet' }
  }

  componentDidMount () {
    loadResource(myResource).then((content) => {
      this.setState({ myResourceContent: content })
    })
  }

  render () {
    const { myResourceContent } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>My Resource Content:</Text>
        <Text style={styles.instructions}>{myResourceContent}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
