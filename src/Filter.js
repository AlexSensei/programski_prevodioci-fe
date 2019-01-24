import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';

import { waterNeeded, lightNeeded, plantingPlace, months } from './constants';

class Filter extends Component {
  state = {
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

  filter = () => {
    axios
      .get(this.props.API, { params: { filter: this.state.filter } })
      .then(res => this.props.filterPlants(res.data));
  };

  render() {
    return (
      <table class="table table-striped table-lg border border-dark">
        <thead class="thead-dark">
          <tr>
            <th>Filter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  filter: { ...this.state.filter, name: '' }
                })
              }
            >
              Name
            </th>
          </tr>
          <tr>
            <th>
              <input
                maxLength="25"
                type="text"
                class="input-block-level "
                value={this.state.filter.name}
                onChange={event =>
                  this.setState({
                    filter: { ...this.state.filter, name: event.target.value }
                  })
                }
              />
            </th>
          </tr>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  filter: { ...this.state.filter, plantingMonthFrom: '', plantingMonthTo: '' }
                })
              }
            >
              Planting Month
            </th>
          </tr>
          <tr>
            <th>
              From
              <Dropdown
                options={months}
                value={this.state.filter.plantingMonthFrom}
                onChange={value =>
                  this.setState({
                    filter: { ...this.state.filter, plantingMonthFrom: value.value }
                  })
                }
                placeholder="Select an option"
              />
              To
              <Dropdown
                options={months}
                value={this.state.filter.plantingMonthTo}
                onChange={value =>
                  this.setState({
                    filter: { ...this.state.filter, plantingMonthTo: value.value }
                  })
                }
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  filter: { ...this.state.filter, harvestingMonthFrom: '', harvestingMonthTo: '' }
                })
              }
            >
              Harvesting Month
            </th>
          </tr>
          <tr>
            <th>
              From
              <Dropdown
                options={months}
                value={this.state.filter.harvestingMonthFrom}
                onChange={value =>
                  this.setState({
                    filter: { ...this.state.filter, harvestingMonthFrom: value.value }
                  })
                }
                placeholder="Select an option"
              />
              To
              <Dropdown
                options={months}
                value={this.state.filter.harvestingMonthTo}
                onChange={value =>
                  this.setState({
                    filter: { ...this.state.filter, harvestingMonthTo: value.value }
                  })
                }
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  filter: { ...this.state.filter, plantingPlace: '' }
                })
              }
            >
              Planting place
            </th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={plantingPlace}
                value={this.state.filter.plantingPlace}
                onChange={value =>
                  this.setState({
                    filter: { ...this.state.filter, plantingPlace: value.value }
                  })
                }
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  filter: { ...this.state.filter, plantingDepth: '' }
                })
              }
            >
              Max Planting Depth
            </th>
          </tr>
          <tr>
            <th>
              <input
                max="2"
                class="input-block-level "
                type="text"
                pattern="\d*"
                value={this.state.plantingDepth}
                onChange={event =>
                  this.setState({
                    filter: { ...this.state.filter, plantingDepth: event.target.value }
                  })
                }
              />
            </th>
          </tr>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  filter: { ...this.state.filter, lightNeeded: '' }
                })
              }
            >
              Light Needed
            </th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={lightNeeded}
                value={this.state.filter.lightNeeded}
                onChange={value =>
                  this.setState({
                    filter: { ...this.state.filter, lightNeeded: value.value }
                  })
                }
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  filter: { ...this.state.filter, waterNeeded: '' }
                })
              }
            >
              Water Needed
            </th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={waterNeeded}
                value={this.state.filter.waterNeeded}
                onChange={value =>
                  this.setState({
                    filter: { ...this.state.filter, waterNeeded: value.value }
                  })
                }
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <td>
              <button class="btn btn-success px-5 input-block-level" onClick={this.filter}>
                Filter
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Filter;
