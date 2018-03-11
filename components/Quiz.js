import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from "react-navigation"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from 'react-redux'
import { gray, purple, white, red, green } from '../utils/colors'
import {
  setTotalQuizzes,
  getQuestions,
  changeCurrentPosition,
  rightAnswer
} from '../actions'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz',
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

  state = {
    showAnswer: false
  }

  componentDidMount() {
    !this.props.quiz.total &&
      this.startQuiz()
  }

  startQuiz = () => {
    const { id } = this.props.navigation.state.params
    const { questions } = this.props.decks[id]

    this.props.setTotalQuizzes(questions.length)
    this.props.getQuestions(questions)
  }

  showAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    })
  }

  nextQuiz = (option) => {
    const { total, currentPosition } = this.props.quiz
    const { id } = this.props.navigation.state.params

    option && this.props.rightAnswer()

    if (currentPosition === total) {
      this.props.navigation.navigate('QuizResult', { id })
      return
    } else {
      this.props.navigation.navigate('Quiz', { id })
    }

    this.props.changeCurrentPosition()
  }

  render() {
    if (!this.props.quiz.total)
      return <View />

    const { currentPosition, total, questions } = this.props.quiz
    const { showAnswer } = this.state

    return (
      <View style={styles.item}>
        <Text style={styles.counter}>
          {currentPosition} / {total}
        </Text>

        <View>
          <Text style={styles.mainText}>
            {showAnswer
              ? questions[currentPosition - 1].answer
              : questions[currentPosition - 1].question
            }
          </Text>

          <TouchableOpacity onPress={() => this.showAnswer()}>
            <Text
              style={[styles.answerBtn, { color: showAnswer ? green : red }]}
            >
              show {showAnswer ? 'question' : 'answer'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ opacity: showAnswer ? 1 : 0, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => this.nextQuiz(true)}
            style={styles.correctBtn}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.nextQuiz(false)}
            style={[styles.correctBtn, { backgroundColor: red }]}
          >
            <Text style={styles.btnText}>Incorrect</Text>
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
    justifyContent: 'space-between',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 1
  },
  counter: {
    fontSize: 12,
    color: gray
  },
  mainText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 10
  },
  answerBtn: {
    textAlign: 'center'
  },
  correctBtn: {
    backgroundColor: green,
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
    color: white
  }
})

function mapStateToProps({ decks, quiz }) {
  return { decks, quiz }
}

function mapDispatchToProps(dispatch) {
  return {
    setTotalQuizzes: (total) => dispatch(setTotalQuizzes(total)),
    getQuestions: (questions) => dispatch(getQuestions(questions)),
    changeCurrentPosition: () => dispatch(changeCurrentPosition()),
    rightAnswer: () => dispatch(rightAnswer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)