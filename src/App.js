import React from 'react';
import { Store } from './Store';
import { Container, Header, Icon } from 'semantic-ui-react';
import Network from './components/Network';
import CompanySelectModal from './components/CompanySelectModal';

const App = () => {
  const { state } = React.useContext(Store)

  return (
    <Container>
      <Header as='h2' icon textAlign='center'>
        <Icon name='sitemap' circular />
        Taxidermy of Taxonomies
      </Header>

      <Network />

      <CompanySelectModal activeCategories={state.activeCategories} />
    </Container>
  );
}

export default App;
