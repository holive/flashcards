import { NEED_RERENDER } from '../actions/types'

export default function (state = false, action) {
  switch (action.type) {
    case NEED_RERENDER:
      return action.payload

    default:
      return state
  }
}