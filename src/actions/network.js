export const TOGGLE_MODAL = 'network/TOGGLE_MODAL';
export const UPDATE_COMPANY_IN_CATEGORY = 'network/UPDATE_COMPANY_IN_CATEGORY';

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
