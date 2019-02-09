import React, { Component } from 'react';
import FormsList from './components/FormsList';
import './App.css';

const forms = [
  {
    id: 1,
    name: 'Task Feedback',
    numSubmissions: 0,
  },
  {
    id: 2,
    name: 'Job Application',
    numSubmissions: 152,
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormsList forms={forms}/>
      </div>
    );
  }
}

export default App;
