import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handlerNeedRerender } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { gray, white, purple } from '../utils/colors'

class NewDeck extends Component {
  state = {
    text: ''
  }

  handleSubmit = () => {
    const { text } = this.state

    if (text !== '') {
      saveDeckTitle(text)
        .then(() => {
          this.props.handlerNeedRerender(true)
          this.setState({ text: '' })
          this.props.navigation.navigate('DeckDetail', { key: text })
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>

        <TextInput
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="Deck Title"
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
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
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
  btnText: {
    color: white,
    textAlign: 'center'
  }
})

function mapDispatchToProps(dispatch) {
  return {
    handlerNeedRerender: (bool) => dispatch(handlerNeedRerender(bool))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
