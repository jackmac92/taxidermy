import React from 'react';
import { Store } from './Store';
import { Container, Header, Icon } from 'semantic-ui-react';
import Network from './components/Network';
import CompanySelect from './components/CompanySelect';

const App = () => {
  const { state, dispatch } = React.useContext(Store);

  return (
    <Container>
      <Header id='site-id' as='h2' icon textAlign='center'>
        <Icon name='sitemap' circular />
        Taxidermy of Taxonomies
      </Header>

      <Network edgesInStore={state.edges} nodesInStore={state.nodes} dispatch={dispatch}/>

      <CompanySelect activeCategories={state.activeCategories} modal={state.modal} />
    </Container>
  );
}

export default App;
