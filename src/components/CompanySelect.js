import React from 'react';
import { flattenDeep } from 'lodash';
import { Modal, List } from 'semantic-ui-react';
import { Store } from '../Store';
import CompanyAutosuggest from './CompanyAutosuggest';
import { toggleCompaniesModal } from '../actions/network';

const CompanySelectModal = ({ activeCategories = [] }) => {
  const { state, dispatch } = React.useContext(Store);
  let companyList = null;
  const edges = state.edges;
  if (state.modal.activeCategoryId){
    let companies = [];

    let nodes = [state.modal.activeCategoryId];
    let childNodes = [nodes[0]];
    while (nodes.length > 0) {
      let tempNodes = [];
       for (let i = 0; i < nodes.length; i++) {
         for (let j = 0; j < edges.length; j++) {
            if (edges[j].from === nodes[i]) {
              childNodes.push(edges[j].to);
              tempNodes.push(edges[j].to);
            }
          }
       }
       nodes = tempNodes;
    }
    for (let index = 0; index < childNodes.length; index++) {
      if (childNodes[index] in state.companiesInCategory) {
        companies = [...companies, state.companiesInCategory[childNodes[index]]];
      }
    }
    if (companies.length > 0) {
      companyList = flattenDeep(companies).map((company) =>
        <List.Item key={company}>
          <List.Content>
            <List.Header as='a'>{company}</List.Header>
          </List.Content>
        </List.Item>
        );
    }

   }

    const modalStyles = {
      position: 'relative',
      top: '-4rem'
    }

    const headerStyles = {
      background: '#006699',
      color: '#FFF',
      textAlign: 'center'
    }

    return (
      <Modal closeIcon id="add-company" onClose={()=>{dispatch(toggleCompaniesModal({id: state.modal.activeCategoryId, label: state.modal.activeCategory}))}} open={state.modal.open}>
        <Modal.Header style={headerStyles}>Select companies to add to {state.modal.activeCategory}</Modal.Header>

        <Modal.Content>
          <CompanyAutosuggest dispatch={dispatch} category={state.modal.activeCategoryId}/>

          <List>{companyList}</List>
        </Modal.Content>
      </Modal>
    )
};

export default CompanySelectModal;
