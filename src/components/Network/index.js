import React, { useEffect, useState } from 'react';
import vis from 'vis-network';
import './styles.css';
import { Store } from '../../Store';
import { toggleCompaniesModal } from '../../actions/network';

const Network = () => {
  let network = null;

  const { dispatch } = React.useContext(Store);
  const [idInput, setIdInput] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');

  const loadNetwork = () => {
    // if (network !== null) {
    //   network.destroy();
    //   network = null;
    // }

    // Create an array with nodes
    const nodes = new vis.DataSet([
      {id: 0, label: "root", group: 'source'},
      {id: 1, label: "1", group: 'icons'},
      {id: 2, label: "2", group: 'icons'},
      {id: 3, label: "3", group: 'icons'},
      {id: 4, label: "4", group: 'icons'},
      {id: 5, label: "5", group: 'icons'},
      {id: 6, label: "6", group: 'icons'},
      {id: 7, label: "7", group: 'icons'},
      {id: 8, label: "8", group: 'icons'},
      {id: 9, label: "9", group: 'icons'},
      {id: 10, label: "10", group: 'mints'},
      {id: 11, label: "11", group: 'mints'},
      {id: 12, label: "12", group: 'mints'},
      {id: 13, label: "13", group: 'mints'},
      {id: 14, label: "14", group: 'mints'},
      {id: 15, label: "15", group: 'mints'},
      {id: 16, label: "16", group: 'mints'},
      {id: 17, label: "17", group: 'diamonds'},
      {id: 18, label: "18", group: 'diamonds'},
      {id: 19, label: "19", group: 'diamonds'},
      {id: 20, label: "20", group: 'diamonds'},
      {id: 21, label: "21", group: 'diamonds'},
      {id: 22, label: "22", group: 'diamonds'},
      {id: 23, label: "23", group: 'diamonds'},
    ]);

    // Create an array with edges
    const edges = new vis.DataSet([
      {from: 1, to: 0},
      {from: 2, to: 0},
      {from: 4, to: 3},
      {from: 5, to: 4},
      {from: 4, to: 0},
      {from: 7, to: 6},
      {from: 8, to: 7},
      {from: 7, to: 0},
      {from: 10, to: 9},
      {from: 11, to: 10},
      {from: 10, to: 4},
      {from: 13, to: 12},
      {from: 14, to: 13},
      {from: 13, to: 0},
      {from: 16, to: 15},
      {from: 17, to: 15},
      {from: 15, to: 10},
      {from: 19, to: 18},
      {from: 20, to: 19},
      {from: 19, to: 4},
      {from: 22, to: 21},
      {from: 23, to: 22},
      {from: 23, to: 0},
    ]);

    // Create a network
    const container = document.getElementById('industry-network');
    const data = { nodes, edges };
    function saveData(data, callback) {
      setIsEditing(false);
      callback(data);
    }

    function cancelEdit(callback) {
      setIsEditing(false);
      callback(null);
    }
    const options = {
      layout: {
        randomSeed: 1
      },
      manipulation: {
        // gets called immediately when clicking add node button
        addNode(data, callback) {
          // filling in the popup DOM elements
          setCurrentOperation('Add Node');
          setIdInput(data.id);
          setLabelInput(data.label);
          document.getElementById('saveButton').onclick = () => {
            saveData(data, callback);
          };
          setIsEditing(true);
        },
        editNode(data, callback) {
          // filling in the popup DOM elements
          setCurrentOperation('Edit Node');
          setIdInput(data.id);
          setLabelInput(data.label);
          document.getElementById('saveButton').onclick = () => {
            saveData(data, callback);
          };
          document.getElementById('cancelButton').onclick = () => {
            cancelEdit(callback);
          };
          setIsEditing(true);
        },
        addEdge(data, callback) {
          callback(data);
        }
      },
      nodes: {
        shape: 'dot',
        size: 50,
        font: {
          size: 25,
          color: '#000'
        },
        borderWidth: 2
      },
      edges: {
        width: 2
      },
      groups: {
        diamonds: {
          color: {
            background:'red',
            border:'orange'
          },
          shape: 'diamond'
        },
        mints: {
          color:'rgb(0,255,140)'
        },
        icons: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf275',
            size: 50,
            color: 'orange'
          }
        },
        source: {
          color:{border:'white'}
        }
      }
    };

    network = new vis.Network(container, data, options);
    network.enableEditMode();
    network.on('click', function(properties) {
      var nodeID = properties.nodes[0];
      if (nodeID) {
        var clickedNode = this.body.nodes[nodeID];
        dispatch(toggleCompaniesModal(clickedNode.options));
      }
    });
  };

  useEffect(() => loadNetwork(), []);
  network !== null && network.redraw();
  return (
    <>
      <span>{currentOperation}</span> <br />
      <div id="network-popUp" style={{ display: isEditing ? 'block' : 'none' }}>
        <div style={{ margin: 'auto', display: isEditing ? 'block' : 'none' }}>
          <input
            id="node-id"
            value={idInput}
            onChange={e => setIdInput(e.target.value)}
          />
          <input
            id="node-label"
            value={labelInput}
            onChange={e => setLabelInput(e.target.value)}
          />
        </div>
        <input type="button" value="save" id="saveButton" />
        <input type="button" value="cancel" id="cancelButton" />
      </div>
      <div id="industry-network"></div>
    </>
  );
};

export default Network;
