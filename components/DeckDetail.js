import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { HeaderBackButton } from "react-navigation"
import { connect } from 'react-redux'
import { removeDeck } from '../utils/api'
import { resetQuiz, deleteDeck } from '../actions'
import { gray, purple, white, red } from '../utils/colors'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { key } = navigation.state.params
    return {
      title: key,
      headerLeft: (
        <HeaderBackButton
          tintColor={white}
          onPress={() => navigation.navigate('Home')
          }
        />
      )
    }
  }
  state = {
    true: false
  }

  componentDidMount() {
    this.props.resetQuiz()
  }

  excludeDeck() {
    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel', onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'OK', onPress: () => {
            removeDeck(this.props.navigation.state.params.key)
              .then(() => {
                this.setState({ true: true })
                this.props.navigation.navigate('Decks')
              })
          }
        }
      ]
    )
  }

  render() {
    const { key } = this.props.navigation.state.params

    if (!this.props.decks[key])
      return <View />

    const cards = this.props.decks[key].questions.length

    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>{key}</Text>

          <Text style={styles.cards}>{cards} card
            {cards === 1 ? "" : "s"}
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.StartQuizBtn, { backgroundColor: 'transparent', borderColor: purple }]}
            onPress={() => this.props.navigation.navigate('NewCard', { id: key })}
          >
            <Text style={[styles.BtnText, { color: purple }]}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.StartQuizBtn}
            onPress={() => this.props.navigation.navigate('Quiz', { id: key })}
          >
            <Text style={styles.BtnText}>Start Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.excludeDeck()}
          >
            <Text style={styles.deleteText}>delete deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 17,
    justifyContent: 'space-around',
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cards: {
    textAlign: 'center',
    color: gray
  },
  StartQuizBtn: {
    borderWidth: 1,
    borderColor: purple,
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 220
  },
  BtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
  deleteText: {
    textAlign: 'center',
    color: red,
    marginTop: 20
  }
})

function mapStateToProps({ decks }) {
  return { decks }
}

function mapDispatchToProps(dispatch) {
  return {
    resetQuiz: () => dispatch(resetQuiz()),
    deleteDeck: (id) => dispatch(deleteDeck(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)