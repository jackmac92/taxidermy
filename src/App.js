import React from 'react'
import CompanySelectModal from './companySelectModal'
import { Store } from './Store'

const App = () => {
  const { state } = React.useContext(Store)
  return (
    <>
      <CompanySelectModal activeCategories={state.activeCategories} />
    </>
  )
}

export default App
