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
    { id: 1, label: 'Healthcare' },
    { id: 2, label: 'health monitoring' },
    { id: 3, label: 'wearables' },
    { id: 4, label: 'sensors' },
    { id: 5, label: 'Medical facilities' },
    { id: 6, label: 'Hospital' },
    { id: 7, label: 'lab' },
    { id: 8, label: 'homecare' },
    { id: 9, label: 'hospice' },
    { id: 10, label: 'Rehab' },
    { id: 11, label: 'Health IT' },
    { id: 12, label: 'Appointment Booking' },
    { id: 13, label: 'EHR' },
    { id: 14, label: 'Drug R+D' },
    { id: 15, label: 'Retail' },
    { id: 16, label: 'OTC' },
    { id: 17, label: 'Generic' },
    { id: 18, label: 'Vaccines' },
    { id: 20, label: 'Pharmacy' },
    { id: 21, label: 'Online pharmacy' },
    { id: 22, label: 'Insurance' },
    { id: 23, label: 'Health Insurance' },
    // connections needed below
    { id: 24, label: 'Med Device' },
    { id: 25, label: 'Surgical' },

    { id: 27, label: 'Medical Robot' },
    { id: 28, label: 'Robotics' },
    { id: 29, label: 'Prosthetics' },
    { id: 30, label: 'Parts & Supplies' },
  ],
  edges: [
    { from: 28, to: 27 },
    { from: 1, to: 2 },
    { from: 1, to: 24 },
    { from: 1, to: 23 },
    { from: 22, to: 23 },
    { from: 1, to: 5 },
    { from: 1, to: 11 },
    { from: 1, to: 14 },
    { from: 1, to: 20 },
    { from: 15, to: 20 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 5, to: 6 },
    { from: 5, to: 7 },
    { from: 5, to: 8 },
    { from: 5, to: 9 },
    { from: 5, to: 10 },
    { from: 11, to: 12 },
    { from: 11, to: 13 },
    { from: 14, to: 16 },
    { from: 14, to: 17 },
    { from: 14, to: 18 },
    { from: 20, to: 21 },
    { from: 24, to: 30 },
    { from: 24, to: 29 },
    { from: 24, to: 25 },
    { from: 28, to: 24 },
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
