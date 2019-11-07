import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import CompanyAutosuggest from './CompanyAutosuggest'

export default function({ activeCategories = [] }) {
  return (
    <Modal trigger={<Button>Select Companies</Button>}>
      <Modal.Header>Pick a bizness</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>
            Select companies to add to {activeCategories.join(' ')}
          </Header>
        </Modal.Description>
        <CompanyAutosuggest />
      </Modal.Content>
    </Modal>
  )
}
