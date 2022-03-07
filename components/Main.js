import React from 'react';
import axios from 'axios';
import Name from './Name';
import AddButton from './AddButton';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      humanList: [],
      persInfo: [],
      selectedHuman: {},
    };
    this.showInfo = this.showInfo.bind(this);
    this.addHuman = this.addHuman.bind(this);
  }

  async componentDidMount() {
    const humanList = await axios.get('/api/humans');
    this.setState({ humanList: humanList.data });
  }

  async addHuman() {
    const newHuman = await axios.post('/api/humans');
    this.setState({
      humanList: this.state.humanList.concat([newHuman.data]),
    });
  }

  showInfo(human) {
    this.setState({
      selectedHuman: human,
    });
  }

  render() {
    return (
      <>
        <h1 style={{ marginBottom: '0' }}>List of Random Humans</h1>
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          click random human for their fake contact info
        </p>
        <AddButton addHuman={this.addHuman} />
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
