import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { newCard, handlerNeedRerender } from '../actions'
import { saveDeckCard } from '../utils/api'
import { gray, white, purple } from '../utils/colors'

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return { title: 'Add Card' }
  }

  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    const { id } = this.props.navigation.state.params
    const { question, answer } = this.state

    if (question !== '' && answer !== '') {
      this.props.newCard(id, question, answer)

      saveDeckCard(id, question, answer)
        .then(() => this.props.handlerNeedRerender(true))

      this.props.navigation.navigate('DeckDetail', { key: id })
      this.setState({ question: '', answer: '' })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder="Type your new question"
          style={styles.input}
        />

        <TextInput
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder="Type the answer"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={this.handleSubmit}
          style={styles.submitBtn}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  input: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 5,
    marginBottom: 20,
    width: '100%'
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 40,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnText: {
    color: white,
    textAlign: 'center'
  }
})

function mapStateToProps({ decks }) {
  return { decks }
}

function mapDispatchToProps(dispatch) {
  return {
    newCard: (card, question, answer) => dispatch(newCard(card, question, answer)),
    handlerNeedRerender: (bool) => dispatch(handlerNeedRerender(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
