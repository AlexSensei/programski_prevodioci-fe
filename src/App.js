import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';
import 'react-dropdown/style.css';
import {
  plantingPlaceConvertor,
  monthConvertor,
  lightConvertor,
  waterConvertor
} from './converter';
import CreatePlant from './CreatePlant';
import Filter from './Filter';

class App extends Component {
  state = {
    plants: [],
    visible: false,
    name: '',
    tips: '',
    plant: {},
    filter: {
      name: '',
      plantingMonthFrom: '',
      plantingMonthTo: '',
      harvestingMonthFrom: '',
      harvestingMonthTo: '',
      plantingPlace: '',
      plantingDepth: '',
      lightNeeded: '',
      waterNeeded: ''
    }
  };

  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/plants', { filter: this.state.filter })
      .then(res => this.setState({ plants: res.data }));
  }

  appendPlant = plant => {
    this.setState({ plants: [...this.state.plants, plant] });
  };

  filterPlants = plants => {
    this.setState({ plants });
  };

  openInfo = plant => {
    if (plant.tips !== '' && plant.tips !== null) {
      this.setState({ visible: true, plant });
    }
  };

  renderPlants() {
    let plants = [];
    let index = 0;
    if (this.state.plants.length) {
      this.state.plants.forEach(plant => {
        plants.push(this.renderPlant(plant, index));
        index++;
      });
    }
    return plants;
  }

  renderPlant = (plant, index) => {
    return (
      <tr key={index} onClick={() => this.openInfo(plant)}>
        <td>{plant.name}</td>
        <td>{monthConvertor(plant.planting_month)}</td>
        <td>{monthConvertor(plant.harvesting_month)}</td>
        <td>{plantingPlaceConvertor(plant.plantingPlace)}</td>
        <td>{plant.plantingDepth}</td>
        <td>{lightConvertor(plant.light)}</td>
        <td>{waterConvertor(plant.water)}</td>
      </tr>
    );
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header" />
            <div class="collapse navbar-collapse">
              <h2 class="navbar-brand">Programski Prevodioci</h2>
            </div>
          </div>
        </nav>
        <div class="container-fluid text-center">
          <div class="row content">
            <div class="col-sm-2 sidenav border-2 flex-grow nopadding divborderright">
              <Filter filterPlants={plants => this.filterPlants(plants)} />
            </div>
            <div class="col-sm-8 text-left table-responsive nopadding ">
              <table class="table table-responsive table-striped border border-dark border-3">
                <thead class="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Planting month</th>
                    <th>Harvesting month</th>
                    <th>Planting place</th>
                    <th>Planting depth</th>
                    <th>Light needed</th>
                    <th>Water needed</th>
                  </tr>
                </thead>
                <tbody>{this.renderPlants()}</tbody>
              </table>
            </div>
            <div class="col-sm-2 sidenav nopadding divborderleft">
              <CreatePlant appendPlant={plant => this.appendPlant(plant)} />
            </div>
          </div>

          <Modal
            onRequestClose={() => this.setState({ visible: false })}
            isOpen={this.state.visible}
            style={{
              overlay: {
                position: 'fixed',
                top: 5,
                left: 5,
                right: 5,
                bottom: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
              },
              content: {
                position: 'absolute',
                top: '40px',
                left: '40px',
                right: '40px',
                bottom: '40px',
                border: '3px solid #000000',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'
              }
            }}
          >
            <div>
              <h3>Plant tips:</h3>
              <p>{this.state.plant.tips}</p>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
