import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MultiPhoneInput from './multi-tel-input';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: [{num: '121445', type: 'Work'}]
    }

    this.handlePhonesChange = this.handlePhonesChange.bind(this);
  }

  handlePhonesChange(phones) {
    this.setState({phones: phones});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">InfoLob React Test</h1>
        </header>
        <MultiPhoneInput
          phones={ this.state.phones } 
          types={["Home", "Mobile", "Work", "Other"]} 
          onPhonesChange={ this.handlePhonesChange } />
      </div>
    );
  }
}

export default App;
