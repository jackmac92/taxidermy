import React from 'react';
import { Modal, List } from 'semantic-ui-react';
import { Store } from '../Store';
import CompanyAutosuggest from './CompanyAutosuggest';
import { toggleCompaniesModal } from '../actions/network';

const CompanySelectModal = ({ activeCategories = [] }) => {
  const { state, dispatch } = React.useContext(Store);
  let companyList = null;

  if (state.modal.activeCategory && state.companiesInCategory[state.modal.activeCategory]){
    companyList = state.companiesInCategory[state.modal.activeCategory].map((company) => 
      <List.Item key={company}>
        <List.Content>
          <List.Header as='a'>{company}</List.Header>
        </List.Content>
      </List.Item>
    );
  }
  return <Modal closeIcon onClose={()=>{dispatch(toggleCompaniesModal({id: state.modal.activeCategoryId, label: state.modal.activeCategory}))}} open={state.modal.open}>
    <Modal.Header>Select a Business</Modal.Header>

    <Modal.Content>
      <Modal.Description>
        <p>Select companies to add to: {state.modal.activeCategory}</p>
      </Modal.Description>

      <CompanyAutosuggest dispatch={dispatch} category={state.modal.activeCategory}/>
      <List>
        {companyList}
      </List>
    </Modal.Content>
  </Modal>
};

export default CompanySelectModal;
