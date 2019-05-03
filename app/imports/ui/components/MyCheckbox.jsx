import React, { Component } from 'react';
import { Button, Checkbox } from 'semantic-ui-react';

export default class MyCheckbox extends Component {
  state = { checked: false };
  toggle = () => this.setState({ checked: !this.state.checked });


  render() {
    return (
        <div>
          <Checkbox label={name} onChange={this.toggle} checked={this.state.checked} />
        </div>
    );
  }
}
