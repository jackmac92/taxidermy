import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import CompanyAutosuggest from './CompanyAutosuggest';

const CompanySelectModal = ({ activeCategories = [] }) => (
  <Modal trigger={<Button primary fluid>Select Companies</Button>}>
    <Modal.Header>Select a Business</Modal.Header>

    <Modal.Content>
      <Modal.Description>
        <p>Select companies to add to: {activeCategories.join(' ')}</p>
      </Modal.Description>

      <CompanyAutosuggest />
    </Modal.Content>
  </Modal>
);

export default CompanySelectModal;
