import { combineReducers } from 'redux'
import decks from './decksReducer'
import quiz from './quizReducer'
import needRerender from './needUpdateReducer'

export default combineReducers({
  decks,
  quiz,
  needRerender
})