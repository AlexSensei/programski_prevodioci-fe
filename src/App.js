import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';

class App extends Component {
  state = { plants: [], visible: false, name: '' };

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/plants').then(res => this.setState({ plants: res.data }));
  }

  testPlant = {
    plantingMonth: 'December',
    harvestingMonth: 'January',
    plantingPlace: 'tu',
    plantingDepth: 10,
    light: 2,
    water: 3,
    tips: 'Samo posadi i uzivaj'
  };

  addPlant = () => {
    axios
      .post('http://127.0.0.1:8000/api/plants', { ...this.testPlant, name: this.state.name })
      .then(res => this.setState({ plants: [...this.state.plants, res.data] }));
  };

  renderUsers() {
    let plants = [];
    let index = 0;
    if (this.state.plants.length) {
      this.state.plants.forEach(plant => {
        plants.push(this.renderPerson(plant, index));
        index++;
      });
    }
    return plants;
  }

  openModal = () => {
    this.setState({ visible: true });
  };

  renderPerson = (plant, index) => {
    return (
      <tr key={index} onClick={this.openModal}>
        <td>{plant.name}</td>
        <td>{plant.planting_month}</td>
        <td>{plant.harvesting_month}</td>
        <td>{plant.plantingPlace}</td>
        <td>{plant.plantingDepth}</td>
        <td>{plant.light}</td>
        <td>{plant.water}</td>
      </tr>
    );
  };

  render() {
    return (
      <div className="App">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>name</th>
              <th>planting_month</th>
              <th>harvesting_month</th>
              <th>plantingPlace</th>
              <th>plantingDepth</th>
              <th>light</th>
              <th>water</th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>

          <tbody>
            <tr>
              <th>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                />
              </th>
              <th>planting_month</th>
              <th>harvesting_month</th>
              <th>plantingPlace</th>
              <th>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ plantingDepth: event.target.value })}
                />
              </th>
              <th>light</th>
              <Button onClick={this.addPlant}>Add</Button>
            </tr>
          </tbody>
        </Table>
        <Modal isOpen={this.state.visible}>
          <div>
            <p>Poyy</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
