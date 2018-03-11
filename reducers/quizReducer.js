import {
  QUIZ_TOTAL,
  CURRENT_POSITION,
  GET_QUESTIONS,
  RIGHT_ANSWER,
  RESET_QUIZ
} from '../actions/types'

const initialState = {
  total: null,
  currentPosition: 1,
  questions: [],
  rightAnswers: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case QUIZ_TOTAL:
      return { ...state, total: action.payload }

    case GET_QUESTIONS:
      return { ...state, questions: action.payload }

    case CURRENT_POSITION:
      return { ...state, currentPosition: state.currentPosition + 1 }

    case RIGHT_ANSWER:
      return { ...state, rightAnswers: state.rightAnswers + 1 }

    case RESET_QUIZ:
      return initialState

    default:
      return state
  }
}