import React from 'react';
import { remove } from 'lodash';
import { TOGGLE_MODAL, UPDATE_COMPANY_IN_CATEGORY, ADD_NODE, ADD_EDGE, DELETE_NODE, DELETE_EDGE } from './actions/network'

export const Store = React.createContext()

const initialState = {
  activeCategories: ['Internet'],
  modal: {
    open: false,
    activeCategory: '',
    activeCategoryId: '1'
  },
  companiesInCategory: {},
  nodes: [
    { id: 1, label: 'Healthcare', group: 'red' },
    { id: 2, label: 'health monitoring', group: 'blue' },
    { id: 3, label: 'wearables' , group: 'green'},
    { id: 4, label: 'sensors', group: 'green' },
    { id: 5, label: 'Medical facilities', group: 'blue' },
    { id: 6, label: 'Hospital', group: 'green' },
    { id: 7, label: 'lab' , group: 'green'},
    { id: 8, label: 'homecare' , group: 'green'},
    { id: 9, label: 'hospice', group: 'green' },
    { id: 10, label: 'Rehab', group: 'green' },
    { id: 11, label: 'Health IT', group: 'blue' },
    { id: 12, label: 'Appointment Booking', group: 'green' },
    { id: 13, label: 'EHR', group: 'green' },
    { id: 14, label: 'Drug R+D', group: 'blue' },
    { id: 15, label: 'Retail', group: 'red' },
    { id: 16, label: 'OTC' , group: 'green'},
    { id: 17, label: 'Generic', group: 'green' },
    { id: 18, label: 'Vaccines', group: 'green' },
    { id: 20, label: 'Pharmacy', group: 'blue' },
    { id: 21, label: 'Online pharmacy', group: 'green' },
    { id: 22, label: 'Insurance', group: 'red' },
    { id: 23, label: 'Health Insurance', group: 'blue' },
    { id: 24, label: 'Med Device', group: 'blue' },
    { id: 25, label: 'Surgical' , group: 'green'},
    { id: 27, label: 'Medical Robot', group: 'blue' },
    { id: 28, label: 'Robotics', group: 'red' },
    { id: 29, label: 'Prosthetics', group: 'green' },
    { id: 30, label: 'Parts & Supplies', group: 'green' },
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
  ]
};

const addCompanyToCategory = (categories, category, company) => {
  console.log(categories)
  if (category in categories){
    return {...categories, [category]: [...categories[category], company]};
  } else {
    return {...categories, [category]: [company]};
  }
}

const updateNode = (nodes, edges, fromNode) => {
  let rootNode = true;
  let leafNode = true;
  let group = "mints";
  for (let index = 0; index < edges.length; index++) { 
    if (edges[index].to === fromNode) {
      rootNode = false;
    }
    if (edges[index].from === fromNode) {
      leafNode = false;
    }
  }
  if (rootNode) {
    group = "diamonds";
  } else if (leafNode) {
    group = "icons";
  }
  let newNodes = [];
  for (let index = 0; index < nodes.length; index++) {
    if (nodes[index].id === fromNode) {
       newNodes.push({id: fromNode, label: nodes[index].label, group: group})
    } else {

      newNodes.push(nodes[index]);
    }
  }
  return newNodes;
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
        nodes: updateNode(state.nodes, state.edges, action.fromNode),
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
