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
    this.state = { servers: [], query_templates: [], environment: 'inhouse', server: '', countyNo: null, query_text: '', results: { columns: [], rows: [] } };
    this.handleServersChange = this.handleServersChange.bind(this);
    this.handleQueryTemplateChange = this.handleQueryTemplateChange.bind(this);
    this.handleEnvChange = this.handleEnvChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchChoicesForEnv();
  }

  fetchChoicesForEnv() {
    this.fetchData(`http://localhost:3001/servers?env=${this.state.environment}`, GET_OPTIONS, this.handleServersChange);
    this.fetchData(`http://localhost:3001/query_templates?env=${this.state.environment}`, GET_OPTIONS, this.handleQueryTemplateChange);
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

  handleServersChange(servers) {
    this.setState({ servers: servers });
  }

  handleQueryTemplateChange(query_templates) {
    this.setState({ query_templates: query_templates });
  }

  handleEnvChange(environment) {
    this.setState({ environment: environment }, this.fetchChoicesForEnv);
  }

  handleServerChange(server, countyNo) {
    this.setState({ server: server, countyNo: countyNo });
  }

  handleQueryTextChange(query_text) {
    this.setState({ query_text: query_text });
  }

  handleResultsChange(results) {
    this.setState({ results: results });
  }

  handleExecuteButtonClick(evt) {
    // console.log("Executing with: "); console.log(this.state);

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
    return this.state.query_text.replace(/\$countyNo/, this.state.countyNo);
  }

  render() {
    // console.log("App rendering with: "); console.log(this.state);

    return (
      <div className="App">
        <Entry
           servers={this.state.servers}
           queries={this.state.query_templates}
           server={this.state.server}
           environment={this.state.environment}
           query_text={this.state.query_text}
           onEnvChange={this.handleEnvChange}
           onServerChange={this.handleServerChange}
           onQueryTextChange={this.handleQueryTextChange}
           onExecuteButtonClick={this.handleExecuteButtonClick} />
        <ResultsTable
           data={this.state.results} />
      </div>
    );
  }
}

export default App;
