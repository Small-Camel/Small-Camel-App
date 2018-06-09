import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

export default function configStore () {
  const store = createStore(rootReducer)
  return store
}