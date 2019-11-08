import React from 'react'
import { TOGGLE_MODAL } from './actions/network'

export const Store = React.createContext()

const initialState = {
  activeCategories: ['Internet'],
  modal: {
    open: false,
    activeCategory: 'Internet',
    activeCategoryId: '1',
  },
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        activeCategories: [...state.activeCategories, action.payload]
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: {open: !state.modal.open, activeCategory: action.activeCategory, activeCategoryId: action.id}
      }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const store = React.useReducer(reducer, initialState)
  window.store = store
  const [state, dispatch] = store
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
