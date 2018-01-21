import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MultiPhoneInput from './multi-tel-comp/multi-tel-input';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: [{ num: '(999) 315-4885', type: 'Mobile' }],
    };

    this.handlePhonesChange = this.handlePhonesChange.bind(this);
  }

  handlePhonesChange(newPhones) {
    this.setState({ phones: newPhones });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Multi Phone Input Component</h1>
        </header>
        <MultiPhoneInput
          phones={this.state.phones}
          types={['Home', 'Mobile', 'Work', 'Other']}
          onPhonesChange={this.handlePhonesChange}
        />
      </div>
    );
  }
}

export default App;
