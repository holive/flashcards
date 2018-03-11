import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, gray } from '../utils/colors'

class Deck extends Component {
  render() {
    const { navigation, deckInfo } = this.props

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => this.props.navigation
            .navigate('DeckDetail', { key: deckInfo.key })}
        >
          <Text style={styles.title}>{deckInfo.key}</Text>
          <Text style={styles.cards}>{deckInfo.cards} card
                  {deckInfo.cards === 1 ? "" : "s"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    marginBottom: 2,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  cards: {
    textAlign: 'center',
    color: gray
  }
})

export default Deck