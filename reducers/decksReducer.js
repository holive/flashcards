import _ from 'lodash'
import {
  NEW_DECK,
  DELETE_DECK,
  NEW_CARD,
  FETCH_SOTORAGE
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SOTORAGE:
      return action.payload

    case NEW_DECK:
      const newDeck = {
        [action.payload]: {
          title: action.payload,
          questions: []
        }
      }
      return { ...state, ...newDeck }

    case NEW_CARD:
      const questions = [...state[action.title].questions]
      questions.push({ question: action.question, answer: action.answer })

      const deck = {
        [action.title]: {
          title: action.title,
          questions: questions
        }
      }
      return { ...state, ...deck }

    case DELETE_DECK:
      return _.omit(state, action.id)

    default:
      return state
  }
}