import React from 'react'
import { TOGGLE_MODAL, UPDATE_COMPANY_IN_CATEGORY } from './actions/network'

export const Store = React.createContext()

const initialState = {
  activeCategories: ['Internet'],
  modal: {
    open: false,
    activeCategory: '',
    activeCategoryId: '1',
  },
  companiesInCategory: {},
}

const addCompanyToCategory = (categories, category, company) => {
  console.log(categories)
  if (category in categories){
    return {...categories, [category]: [...categories[category], company]};
  } else {
    return {...categories, [category]: [company]};
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        activeCategories: [...state.activeCategories, action.payload]
      }
    case UPDATE_COMPANY_IN_CATEGORY:
      return {
        ...state,
        companiesInCategory: addCompanyToCategory(state.companiesInCategory, action.category, action.company),
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: {open: !state.modal.open, activeCategory: action.activeCategory, activeCategoryId: action.activeCategoryId}
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
