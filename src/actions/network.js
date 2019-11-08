export const TOGGLE_MODAL = 'network/TOGGLE_MODAL';
export const UPDATE_COMPANY_IN_CATEGORY = 'network/UPDATE_COMPANY_IN_CATEGORY';
export const ADD_NODE = 'network/ADD_NODE';
export const DELETE_NODE = 'network/DELETE_NODE';
export const ADD_EDGE = 'network/ADD_EDGE';
export const DELETE_EDGE = 'network/DELETE_EDGE';

export const toggleCompaniesModal = ({id, label}) => {
  return {
    type: TOGGLE_MODAL,
    activeCategory: label,
    activeCategoryId: id,
  };
};

export const addCompanyInCategory = (company, category) => {
  return {
    type: UPDATE_COMPANY_IN_CATEGORY,
    category,
    company,
  };
};

export const addNode = ({id, label}) => {
  console.log(id, label)
  return {
    type: ADD_NODE,
    id,
    label,
  };
};

export const addEdge = ({fromNode, toNode}) => {
  console.log(fromNode, toNode)
  return {
    type: ADD_EDGE,
    fromNode,
    toNode,
  };
};

export const deleteNode = ({id, label}) => {
  return {
    type: DELETE_NODE,
    id,
    label
  };
};

export const deleteEdge = ({fromNode, toNode}) => {
  return {
    type: DELETE_EDGE,
    fromNode,
    toNode,
  };
};
