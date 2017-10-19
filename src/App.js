import React, { Component } from 'react';
import 'App.css';
import Entry from 'Entry';
import ResultsTable from 'ResultsTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { servers: [], query_templates: [], server: '', query_text: '' };
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchServers(this);
    this.fetchQueryTemplates(this);
  }

  handleServerChange(server) {
    this.setState({ server: server });
  }

  handleQueryTextChange(query_text) {
    this.setState({ query_text: query_text });
  }

  handleExecuteButtonClick(evt) {
    console.log("Executing with: "); console.log(this.state);

  }

  fetchServers(c) {
    fetch('http://localhost:3001/servers')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        c.setState({ servers: json });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  };

  fetchQueryTemplates(c) {
    fetch('http://localhost:3001/query_templates')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        c.setState({ query_templates: json });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  };

  render() {
    console.log("App rendering with: "); console.log(this.state);

    return (
      <div className="App">
        <Entry
           servers={this.state.servers}
           queries={this.state.query_templates}
           server={this.state.server}
           query_text={this.state.query_text}
           onServerChange={this.handleServerChange}
           onQueryTextChange={this.handleQueryTextChange}
           onExecuteButtonClick={this.handleExecuteButtonClick} />
        <ResultsTable
           server={this.state.server}
           query_text={this.state.query_text} />
      </div>
    );
  }
}

export default App;
