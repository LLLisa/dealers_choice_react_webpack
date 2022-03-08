import React from 'react';
import DeleteButton from './DeleteButton';

export default class Name extends React.Component {
  render() {
    const human = this.props.human;
    const selectedHuman = this.props.selectedHuman;
    return (
      <>
        <span onClick={() => this.props.showInfo(human)}>{human.name}</span>
        <DeleteButton human={human} destroyHuman={this.props.destroyHuman} />
        {selectedHuman.id && selectedHuman.id === human.id ? (
          <ul>
            <li className="phone">phone: {human.phone}</li>
            <li className="email">email: {human.email}</li>
          </ul>
        ) : (
          <></>
        )}
      </>
    );
  }
}
