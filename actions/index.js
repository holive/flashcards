import {
  QUIZ_TOTAL,
  CURRENT_POSITION,
  GET_QUESTIONS,
  RIGHT_ANSWER,
  RESET_QUIZ,
  NEW_DECK,
  DELETE_DECK,
  NEW_CARD,
  FETCH_SOTORAGE,
  NEED_RERENDER
} from './types'

export function fetchStorage(decks) {
  return {
    type: FETCH_SOTORAGE,
    payload: decks
  }
}

export function setTotalQuizzes(total) {
  return {
    type: QUIZ_TOTAL,
    payload: total
  }
}

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    payload: questions
  }
}

export function changeCurrentPosition() {
  return {
    type: CURRENT_POSITION
  }
}

export function rightAnswer() {
  return {
    type: RIGHT_ANSWER
  }
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}

export function newDeck(deckName) {
  return {
    type: NEW_DECK,
    payload: deckName
  }
}

export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id
  }
}

export function newCard(card, question, answer) {
  return {
    type: NEW_CARD,
    title: card,
    question,
    answer
  }
}

export function handlerNeedRerender(bool) {
  return {
    type: NEED_RERENDER,
    payload: bool
  }
}