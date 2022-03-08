import React from 'react';

export default class AddButton extends React.Component {
  render() {
    return (
      <button id="adder" onClick={this.props.addHuman}>
        Add a Random Human
      </button>
    );
  }
}
