import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { connect } from 'react-redux'
import { resetQuiz } from '../actions'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { gray, purple, white, red, green, almostWhite } from '../utils/colors'

class QuizResult extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz Result',
      headerLeft: (
        <HeaderBackButton
          tintColor={white}
          onPress={() => navigation.navigate('DeckDetail',
            { key: navigation.state.params.id })
          }
        />
      )
    }
  }

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  handleRestartQuiz = () => {
    this.props.resetQuiz()
    this.props.navigation.navigate('Quiz', { id: this.props.navigation.state.params.id })
  }

  render() {
    const { total, rightAnswers } = this.props.quiz
    const { id } = this.props.navigation.state.params

    if (!total)
      return <View />

    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.mainText}>Your answers are</Text>
          <Text style={styles.mainText}>{Math.round(rightAnswers / total * 100)}%</Text>
          <Text style={styles.mainText}>correct!</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.StartQuizBtn, { backgroundColor: white }]}
            onPress={() => this.handleRestartQuiz()}
          >
            <Text style={{ color: purple }}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.StartQuizBtn}
            onPress={() => this.props.navigation.navigate('DeckDetail', { key: id })}
          >
            <Text style={styles.btnText}>Return to deck</Text>
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
  mainText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 5
  },
  btnText: {
    color: white,
    textAlign: 'center'
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
  }
})

function mapStateToProps({ quiz }) {
  return { quiz }
}

function mapDispatchToProps(dispatch) {
  return {
    resetQuiz: () => dispatch(resetQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizResult)