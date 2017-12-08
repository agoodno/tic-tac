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
    this.state = { serverTemplates: [], queryTemplates: [], environment: 'inhouse', server: '', countyNo: '', query: '', results: { columns: [], rows: [] } };
    this.handleEnvChange = this.handleEnvChange.bind(this);
    this.handleServerTemplatesChange = this.handleServerTemplatesChange.bind(this);
    this.handleQueryTemplateChange = this.handleQueryTemplateChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleResultsChange = this.handleResultsChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchChoicesForEnv();
  }

  fetchChoicesForEnv() {
    this.fetchData(`http://localhost:3001/servers?env=${this.state.environment}`, GET_OPTIONS, this.handleServerTemplatesChange);
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

  handleEnvChange(environment) {
    this.setState({ environment: environment }, this.fetchChoicesForEnv);
  }

  handleServerTemplatesChange(serverTemplates) {
    this.setState({ serverTemplates: serverTemplates });
  }

  handleServerChange(server, countyNo) {
    this.setState({ server: server, countyNo: countyNo });
  }

  handleQueryTemplateChange(queryTemplates) {
    this.setState({ queryTemplates: queryTemplates });
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
        connection_string: "postgresql://viewer:viewer@dev6-db:5612/cc", //this.state.server,
        query_text: "SELECT * FROM \"County\" WHERE \"countyNo\" = 12;" //this.queryText()
      }),
      ...POST_OPTIONS
    };

    this.fetchData(
      'http://localhost:3001/results',
      options,
      this.handleResultsChange);
  }

  queryText() {
    return this.state.query;
//    return this.state.query.replace(/\$countyNo/, this.state.countyNo);
  }

  render() {
    console.log("App rendering with: "); console.log(this.state);

    return (
      <div className="App container-fluid">
        <Entry
           environment={this.state.environment}
           serverTemplates={this.state.serverTemplates}
           server={this.state.server}
           countyNo={this.state.countyNo}
           queryTemplates={this.state.queryTemplates}
           query={this.state.query}
           onEnvChange={this.handleEnvChange}
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
