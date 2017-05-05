import { combineReducers } from 'redux'
import locationReducer from './location'
import fetchReducer from '../redux/modules/placements'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    placements: fetchReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
