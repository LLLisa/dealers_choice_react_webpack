import React from 'react';
import { ReactDOM } from 'react';
import PersonalInfo from './PersonalInfo';

export default class Name extends React.Component {
  render() {
    console.log(this.props);
    const human = this.props.human;
    const persInfo = this.props.persInfo;
    return (
      <>
        <span onClick={() => this.props.showInfo(human)}>{human.name}</span>
        {persInfo.length ? (
          <ul>
            <li>phone: {persInfo[0]}</li>
            <li>email: {persInfo[1]}</li>
          </ul>
        ) : (
          <></>
        )}
      </>
    );
  }
}
