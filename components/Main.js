import React from 'react';
import { ReactDOM } from 'react';
import axios from 'axios';
import Name from './Name';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      humanList: [],
      persInfo: [],
      selectedHuman: {},
    };
    this.showInfo = this.showInfo.bind(this);
  }

  async componentDidMount() {
    const humanList = await axios.get('/api/humans');
    this.setState({ humanList: humanList.data });
  }

  showInfo(human) {
    this.setState({
      selectedHuman: human,
    });
  }

  render() {
    // console.log(this.state.humanList);

    return (
      <>
        <h1>List of Random Humans</h1>
        <ul>
          {this.state.humanList.map((human) => {
            return (
              <li key={human.id}>
                <Name
                  human={human}
                  showInfo={this.showInfo}
                  selectedHuman={this.state.selectedHuman}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
