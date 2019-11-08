import React, { useEffect, useState } from 'react'
import vis from 'vis-network'
import './styles.css'
import { Store } from '../../Store';
import { toggleCompaniesModal } from '../../actions/network';

const Network = () => {
  const { dispatch } = React.useContext(Store)
  let network = null
  const [selectedNode, setSelectedNode] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [currentOperation, setCurrentOperation] = useState('')
  const loadNetwork = () => {
    if (network !== null) {
      network.destroy()
      network = null
    }

    // Create an array with nodes
    const nodes = new vis.DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ])

    // Create an array with edges
    const edges = new vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }
    ])

    // Create a network
    const container = document.getElementById('industry-network')
    const data = { nodes, edges }

    function saveData(data, callback) {
      setIsEditing(false)
      callback(selectedNode)
    }

    function cancelEdit(callback) {
      setIsEditing(false)
      callback(null)
    }
    const options = {
      layout: {
        randomSeed: 1
      },
      manipulation: {
        addNode(data, callback) {
          // filling in the popup DOM elements
          setCurrentOperation('Add Node')
          setSelectedNode({
            id: data.id,
            label: data.label
          })
          document.getElementById('saveButton').onclick = () =>
            saveData(data, callback)
          setIsEditing(true)
        },
        editNode(data, callback) {
          // filling in the popup DOM elements
          setCurrentOperation('Edit Node')
          setSelectedNode({
            id: data.id,
            label: data.label
          })
          document.getElementById('saveButton').onclick = () =>
            saveData(data, callback)

          document.getElementById('cancelButton').onclick = () => {
            cancelEdit(callback)
          }
          setIsEditing(true)
        },
        addEdge(data, callback) {
          callback(data)
        }
      }
    }


    network = new vis.Network(container, data, options);
    network.enableEditMode();
    network.on('click', function (properties) {
      var nodeID = properties.nodes[0];
      if (nodeID) {
        var clickedNode = this.body.nodes[nodeID];
        dispatch(toggleCompaniesModal(clickedNode.options));
      }
    });
  }

  useEffect(() => loadNetwork());

  return (
    <>
      <span>{currentOperation}</span> <br />

      <div id="network-popUp" style={{ display: isEditing ? 'block' : 'none' }}>
        <table style={{ margin: 'auto', display: 'none' }}>
          <tbody>
            <tr>
              <td>id</td>
              <td>
                <input id="node-id" value="new value" onChange={() => {}}/>
              </td>
            </tr>
            <tr>
              <td>label</td>
              <td>
                <input id="node-label" value="new value" onChange={() => {}} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="button" value="save" id="saveButton" />
        <input type="button" value="cancel" id="cancelButton" />
      </div>
      <div id="industry-network"></div>
    </>
  )
}

export default Network
