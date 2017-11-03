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
    this.state = { server: '', countyNo: '', query: '', results: { columns: [], rows: [] } };
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
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
        console.error('parsing failed', ex);
      });
  };

  handleServerChange(server, countyNo) {
    this.setState({ server: server, countyNo: countyNo });
  }

  handleQueryChange(query) {
    this.setState({ query: query });
  }

  handleResultsChange(results) {
    this.setState({ results: results });
  }

  handleExecuteButtonClick(evt) {
    console.log("Executing with: "); console.log(this.state);

    var options = {
      body: JSON.stringify({
        connection_string: this.state.server,
        query_text: this.queryText()
      }),
      ...POST_OPTIONS
    };

    this.fetchData(
      'http://localhost:3001/results',
      options,
      this.handleResultsChange);
  }

  queryText() {
    return this.state.query.replace(/\$countyNo/, this.state.countyNo);
  }

  render() {
    console.log("App rendering with: "); console.log(this.state);

    return (
      <div className="App container-fluid">
        <Entry
           fetchServerTemplatesForEnv={this.fetchServerTemplatesForEnv}
           fetchQueryTemplatesForEnv={this.fetchQueryTemplatesForEnv}
           server={this.state.server}
           countyNo={this.state.countyNo}
           query={this.state.query}
           onServerChange={this.handleServerChange}
           onQueryChange={this.handleQueryChange}
           onExecuteButtonClick={this.handleExecuteButtonClick} />
        <ResultsTable
           data={this.state.results} />
      </div>
    );
  }
}

export default App;
