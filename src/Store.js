import React from 'react';
import { remove } from 'lodash';
import { TOGGLE_MODAL, UPDATE_COMPANY_IN_CATEGORY, ADD_NODE, ADD_EDGE, DELETE_NODE, DELETE_EDGE } from './actions/network'

export const Store = React.createContext()

const initialState = {
  activeCategories: ['Internet'],
  modal: {
    open: false,
    activeCategory: '',
    activeCategoryId: '1',
  },
  companiesInCategory: {},
  nodes: [
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' }
  ],
  edges: [
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 }
  ],
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
    case ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, {id: action.id, label: action.label}]
      }
    case ADD_EDGE:
      return {
        ...state,
        edges: [...state.edges, {from: action.fromNode, to:action.toNode}]
      }
    case DELETE_NODE:
      return {
        ...state,
        nodes: remove(state.nodes, function(node) {
          return !(node.id === action.nodeId);
        }),
        edges: remove(state.edges, function(edge) {
          return !(edge.id === action.edgeId);
        })
      }
    case DELETE_EDGE:
      return {
        ...state,
        edges: remove(state.edges, function(edge) {
          return !(edge.fromNode === action.fromNode && edge.toNode === action.toNode);
        })
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
