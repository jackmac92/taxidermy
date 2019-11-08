export const TOGGLE_MODAL = 'network/TOGGLE_MODAL';

export const toggleCompaniesModal = ({id, label}) => {
  return {
    type: TOGGLE_MODAL,
    activeCategory: label,
    activeCategoryId: id,
  };
};
