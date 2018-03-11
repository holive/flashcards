import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchStorage, handlerNeedRerender } from '../actions'
import Deck from './Deck'
import { getDecks } from '../utils/api'
import almostWhite from '../utils/colors'

class Decks extends Component {

  state = {
    decks: []
  }

  componentDidMount() {
    this.fetchDecks()
  }

  fetchDecks = () => {
    getDecks()
      .then(res => {
        let newDecks = []

        _.forOwn(JSON.parse(res), (value, key) =>
          newDecks.push({ key, cards: value.questions.length }))

        this.props.fetchStorage(JSON.parse(res))
        this.setState({ decks: newDecks })
        this.props.handlerNeedRerender(false)
      })
  }

  //erase storage
  //componentDidMount() { AsyncStorage.clear() }

  render() {
    if(this.props.needRerender) {
      this.fetchDecks()
      return <View />
    }

    const { decks } = this.state

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <Deck
              navigation={this.props.navigation}
              deckInfo={item}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: almostWhite,
    paddingTop: 10
  }
})

function mapStateToProps({ decks, needRerender }) {
  return { decks, needRerender }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStorage: (decks) => dispatch(fetchStorage(decks)),
    handlerNeedRerender: (bool) => dispatch(handlerNeedRerender(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)