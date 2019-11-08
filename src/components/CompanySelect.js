import React from 'react';
import { Modal } from 'semantic-ui-react';
import { Store } from '../Store';
import CompanyAutosuggest from './CompanyAutosuggest';
import { toggleCompaniesModal } from '../actions/network';

const CompanySelectModal = ({ activeCategories = [] }) => {
  const { state, dispatch } = React.useContext(Store);

  return <Modal closeIcon onClose={()=>{dispatch(toggleCompaniesModal({id: null, label: null}))}} open={state.modal.open}>
    <Modal.Header>Select a Business</Modal.Header>

    <Modal.Content>
      <Modal.Description>
        <p>Select companies to add to: {activeCategories.join(' ')}</p>
      </Modal.Description>

      <CompanyAutosuggest />
    </Modal.Content>
  </Modal>
};

export default CompanySelectModal;
