import React from 'react';

export default class Name extends React.Component {
  render() {
    // console.log(this.props);
    const human = this.props.human;
    const selectedHuman = this.props.selectedHuman;
    return (
      <>
        <span onClick={() => this.props.showInfo(human)}>{human.name}</span>
        {selectedHuman.id && selectedHuman.id === human.id ? (
          <ul>
            <li>phone: {human.phone}</li>
            <li>email: {human.email}</li>
          </ul>
        ) : (
          <></>
        )}
      </>
    );
  }
}
