import React, { Component } from 'react';
import 'App.css';
import Entry from 'Entry';
import ResultsTable from 'ResultsTable';
//import fetchData from 'utils';
//import { loadServerTemplates } from './actions';

// const GET_OPTIONS = {
//   method: 'GET',
//   headers: {
//     'Accept': 'application/json'
//   }
// };

const POST_OPTIONS = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

var ccap_environments = [
  {"code": "inhouse", "description":"Inhouse"},
  {"code":"prod", "description":"Production"}
];



class App extends Component {

  constructor(props) {
    super(props);
    this.state = { results: { columns: [], rows: [] } };
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  handleResultsChange(results) {
    this.setState({ results: results });
  }

  handleExecuteButtonClick(server, query) {
    var options = {
      body: JSON.stringify({
        connection_string: server,
        query_text: query
      }),
      ...POST_OPTIONS
    };

    this.fetchData(
      'http://localhost:3001/results',
      options,
      this.handleResultsChange);
  }

  render() {
    return (
      <div className="App container-fluid">
        <Entry
           environments={ccap_environments}
           onExecuteButtonClick={this.handleExecuteButtonClick} />
        <ResultsTable
           data={this.state.results} />
      </div>
    );
  }
};

export default App;
