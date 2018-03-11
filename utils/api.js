import { AsyncStorage } from 'react-native'
const FLASHCARDS_STORAGE_KEY = 'UdaciFitness:flashcards'

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function saveDeckTitle(title) {
  const newDeck = {
    [title]: {
      title: title,
      questions: []
    }
  }
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDeck))
}

export function saveDeckCard(id, question, answer) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((res) => {
      const decks = JSON.parse(res)
      const questions = decks[id].questions
      const newQuestion = { question, answer }

      questions.push(newQuestion)

      decks[id].questions = questions

      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function removeDeck(key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}
