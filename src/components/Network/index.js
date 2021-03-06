import React, { useEffect, useState, useRef } from 'react';
import vis from 'vis-network';
import './styles.css';
import { toggleCompaniesModal, addNode, deleteNode, addEdge, deleteEdge } from '../../actions/network';

const Network = ({ nodesInStore, edgesInStore, dispatch }) => {
  // const { dispatch } = React.useContext(Store);
  let network = null;

  const labelRef = useRef(null)
  const [idInput, setIdInput] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');

  const loadNetwork = () => {
    const nodes = new vis.DataSet(nodesInStore);
    const edges = new vis.DataSet(edgesInStore);

    // Create a network
    const container = document.getElementById('industry-network');
    const data = { nodes, edges };

    function saveData(data, callback) {
      const realData = {
        ...data,
        label: labelRef.current.value
      }
      callback(realData);
      setIsEditing(false);
    }

    function cancelEdit(callback) {
      setIsEditing(false);
      callback(null);
    }

    const isShowingHeirarchyView = document.location.search.includes('topdown')

    const hierarchical= {
      enabled: isShowingHeirarchyView,
      levelSeparation: 300,
      edgeMinimization: false,
      direction: 'UD',        // UD, DU, LR, RL
      sortMethod: 'directed',  // hubsize, directed
      shakeTowards: 'roots'  // roots, leaves
    }

    const options = {
      layout: {
        randomSeed: 1,
        hierarchical,
      },
      manipulation: {
        // gets called immediately when clicking add node button
        addNode(data, callback) {
          // filling in the popup DOM elements
          setCurrentOperation('Add Node');
          setIdInput(data.id);
          setLabelInput(data.label);
          document.getElementById('saveButton').onclick = () => {
            console.log(data)
            dispatch(addNode({id: data.id, label: data.label}));
            saveData(data, callback);
          }
          setIsEditing(true);
        },
        deleteNode(data, callback) {
          // filling in the popup DOM elements
          setCurrentOperation('delete Node');
          setIdInput(data.id);
          setLabelInput(data.label);
          console.log(data);
          dispatch(deleteNode({edgeId: data.edges[0], nodeId: data.nodes[0]}));
          callback(data)
        },
        editNode(data, callback) {
          // filling in the popup DOM elements
          setCurrentOperation('Edit Node');
          setIdInput(data.id);
          setLabelInput(data.label);
          document.getElementById('saveButton').onclick = () => {
            saveData(data, callback);
            console.log("asdfasf", data)

          }

          document.getElementById('cancelButton').onclick = () => {
            cancelEdit(callback);
          };
          setIsEditing(true);
        },
        addEdge(data, callback) {
          callback(data);
          dispatch(addEdge({fromNode: data.from, toNode: data.to}));
        },
        deleteEdge(data, callback) {
          callback(data);
          console.log(data);
          dispatch(deleteNode({edgeId: data.edges[0], nodeId: data.nodes[0]}));
        }

      },
      nodes: {
        shape: 'dot',
        size: 50,
        font: {
          size: 40,
          color: '#000'
        },
        borderWidth: 2
      },
      edges: {
        width: 3,
        length: isShowingHeirarchyView ? 600 : 2000,
        color: {
          color: '#c2bfbf',
          highlight: '#d772ad',
        }
      },
      groups: {
        red: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf0f7',
            size: 100,
            color: '#ff6633'
          }
        },
        blue: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf1b3',
            size: 75,
            color: '#4cabce'
          },
        },
        green: {
          shape: 'icon',
          icon: {
            face: 'FontAwesome',
            code: '\uf1b2',
            size: 75,
            color: '#70c390'
          },
        },
      },
      physics: {
        repulsion: {
          nodeDistance: 50
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
  if (network !== null) {
    network.redraw()
  }
  return (
    <>
      <span>{currentOperation}</span>
      <div id="network-popUp" style={{ display: isEditing ? 'block' : 'none' }}>
        <div style={{ margin: 'auto', paddingBottom: '20px', display: isEditing ? 'block' : 'none' }}>
          <h3>Enter a new Industry</h3>
          <input
            id="node-id"
            value={idInput}
            style={{ display: 'none' }}
            onChange={e => setIdInput(e.target.value)}
          />
          <input
            id="node-label"
            value={labelInput}
            ref={labelRef}
            onChange={e => { setLabelInput(e.target.value) }}
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
