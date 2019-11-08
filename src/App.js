import React from 'react';
import { Store } from './Store';
import Network from './components/Network';
import CompanySelectModal from './components/CompanySelectModal';

const App = () => {
  const { state } = React.useContext(Store)

  return (
    <div>
      <h2>Taxidermy</h2>

      <CompanySelectModal activeCategories={state.activeCategories} />

      <Network />
    </div>
  );
}

export default App;
