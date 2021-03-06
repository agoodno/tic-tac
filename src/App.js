import React, { Component } from 'react';
import 'App.css';
import Entry from 'Entry';
import ResultsTable from 'ResultsTable';
//import fetchData from 'utils';

const GET_OPTIONS = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const POST_OPTIONS = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { results: { columns: [], rows: [] }, resultsLoading: false };
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
    this.fetchServerTemplatesForEnv = this.fetchServerTemplatesForEnv.bind(this);
    this.fetchQueryTemplatesForEnv = this.fetchQueryTemplatesForEnv.bind(this);
  }

  fetchServerTemplatesForEnv(env, storesServerTemplates) {
    this.fetchData(`http://localhost:3001/server_templates?env=${env}`, GET_OPTIONS, storesServerTemplates);
  }

  fetchQueryTemplatesForEnv(env, storesQueryTemplates) {
    this.fetchData(`http://localhost:3001/query_templates?env=${env}`, GET_OPTIONS, storesQueryTemplates);
  }

  fetchData(url, options, handler) {
    fetch(url, options)
      .then(function(response) {
        return response.json();
      })
      .then(handler)
      .catch(function(ex) {
        console.error(`Something went wrong: ${ex}`);
      });
  };

  handleResultsChange(results) {
    this.setState({ results: results, resultsLoading: false });
  }

  handleExecuteButtonClick(server, query) {
    this.setState({ resultsLoading: true });

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
    console.log("App rendering with: "); console.log(this.state);
    var spinner = this.state.resultsLoading ? <div class="loader loading"></div> : <div class="loader"></div>;
    return (
      <div className="App container-fluid">
        {spinner}
        <Entry
           fetchServerTemplatesForEnv={this.fetchServerTemplatesForEnv}
           fetchQueryTemplatesForEnv={this.fetchQueryTemplatesForEnv}
           onExecuteButtonClick={this.handleExecuteButtonClick} />
        <ResultsTable
           data={this.state.results} />
      </div>
    );
  }
}

export default App;
