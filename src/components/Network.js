import React, { useEffect } from 'react';
import vis from 'vis-network';

const Network = () => {

  // Create an array with nodes
  const loadNetwork = () => {
    const nodes = new vis.DataSet([
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ]);

    // Create an array with edges
    const edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5},
      {from: 3, to: 3}
    ]);

    // Create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes: nodes,
      edges: edges
    };
    const options = {};
    const network = new vis.Network(container, data, options);
  }

  useEffect(() => {
    // Update the document title using the browser API
    loadNetwork();
  });

  return(
    <div id="mynetwork"></div>
  );
}

export default Network;
