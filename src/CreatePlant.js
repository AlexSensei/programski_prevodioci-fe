import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';

import { waterNeeded, lightNeeded, plantingPlace, months } from './constants';

class CreatePlant extends Component {
  state = {
    name: '',
    tips: ''
  };

  addPlant = () => {
    if (this.validate()) {
      axios
        .post(this.props.API, {
          plantingMonth: this.state.plantingMonth,
          harvestingMonth: this.state.harvestingMonth,
          plantingPlace: this.state.plantingPlace,
          plantingDepth: this.state.plantingDepth,
          light: this.state.lightNeeded,
          water: this.state.waterNeeded,
          tips: this.state.tips,
          name: this.state.name
        })
        .then(res => this.props.appendPlant(res.data));
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  };

  validate = () => {
    if (
      !this.state.name ||
      !this.state.plantingMonth ||
      !this.state.harvestingMonth ||
      !this.state.plantingPlace ||
      !this.state.plantingDepth ||
      !this.state.lightNeeded ||
      !this.state.waterNeeded
    ) {
      return false;
    }
    return true;
  };

  render() {
    return (
      <table class="table table-striped table-sm border border-dark content-justify-center">
        <thead class="thead-dark">
          <tr>
            <th>Filter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Name</th>
          </tr>
          <tr>
            <th>
              <input
                class="input-block-level "
                maxLength="25"
                type="text"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </th>
          </tr>
          <tr>
            <th>Planting Month</th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={months}
                value={this.state.plantingMonth}
                onChange={value => this.setState({ plantingMonth: value.value })}
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th>Harvesting Month</th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={months}
                value={this.state.harvestingMonth}
                onChange={value => this.setState({ harvestingMonth: value.value })}
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th>Planting Place</th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={plantingPlace}
                value={this.state.plantingPlace}
                onChange={value => this.setState({ plantingPlace: value.value })}
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th>Planting Depth</th>
          </tr>
          <tr>
            <th>
              <input
                maxLength="2"
                class="input-block-level "
                type="text"
                pattern="\d*"
                value={this.state.plantingDepth}
                onChange={event =>
                  this.setState({
                    plantingDepth: event.target.value > 25 ? 25 : event.target.value
                  })
                }
              />
            </th>
          </tr>
          <tr>
            <th>Light Needed</th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={lightNeeded}
                value={this.state.lightNeeded}
                onChange={value => this.setState({ lightNeeded: value.value })}
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th>Water Needed</th>
          </tr>
          <tr>
            <th>
              <Dropdown
                options={waterNeeded}
                value={this.state.waterNeeded}
                onChange={value => this.setState({ waterNeeded: value.value })}
                placeholder="Select an option"
              />
            </th>
          </tr>
          <tr>
            <th>Tips</th>
          </tr>
          <tr>
            <th>
              <input
                maxLength="250"
                type="text"
                class="input-block-level "
                value={this.state.tips}
                onChange={event => this.setState({ tips: event.target.value })}
              />
            </th>
          </tr>

          <tr>
            <td>
              <button class="btn btn-success px-5 input-block-level " onClick={this.addPlant}>
                Add
              </button>
            </td>
          </tr>
          {this.state.validate && (
            <tr>
              <td class="text-danger">All fields are required</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default CreatePlant;
