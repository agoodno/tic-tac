import React, { Component } from 'react';
import 'Entry.css';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { query_template: '' };
    this.environments = [{"code": "inhouse", "description":"Inhouse"},{"code":"prod", "description":"Production"}];
    this.handleEnvChange = this.handleEnvChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleQueryTemplateChange = this.handleQueryTemplateChange.bind(this);
    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  handleEnvChange(evt) {
    this.props.onEnvChange(evt.target.value);
  }

  handleServerChange(evt) {
    var countyNo = evt.target.options[evt.target.selectedIndex].dataset.countyNo;
    this.props.onServerChange(evt.target.value, countyNo);
  }

  handleQueryTemplateChange(evt) {
    this.setState({ query_template: evt.target.value });
    this.props.onQueryTextChange(evt.target.value);
  }

  handleQueryTextChange(evt) {
    this.setState({ query_template: '' });
    this.props.onQueryTextChange(evt.target.value);
  }

  handleExecuteButtonClick(evt) {
    this.props.onExecuteButtonClick(evt.target.value);
  }

  render() {
    // console.log("Entry rendering with: "); console.log(this.state);

    var serverOptions = [<option key="-1" value="">--Select--</option>];
    var envOptions = [];
    var queryOptions = [<option key="-1" value=""></option>];

    this.props.servers.forEach((server, index) => {
      if (!server.disabled) {
        serverOptions.push(<option key={index} value={server.url} data-county-no={server.countyNo}>{server.name}</option>);
      }
    });
    this.environments.forEach((environment) => {
      envOptions.push(<option key={environment.code} value={environment.code}>{environment.description}</option>);
    });
    this.props.queries.forEach((query, index) => {
      queryOptions.push(<option key={index} value={query.text}>{query.name}</option>);
    });

    return (
      <div className="Entry">
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>Servers</th>
              <th>Query Templates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select value={this.state.environment} className="environments" onChange={this.handleEnvChange}>
                  {envOptions}
                </select>
              </td>
              <td>
                <select value={this.state.server} className="servers" onChange={this.handleServerChange}>
                  {serverOptions}
                </select>
              </td>
              <td>
                <select value={this.state.query_text} className="queries" onChange={this.handleQueryTemplateChange}>
                  {queryOptions}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <textarea
                  value={this.props.query_text}
                  onChange={this.handleQueryTextChange}
                  rows="5"
                  cols="100"
                  placeholder="Type your query here or select one of the common query templates."/>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleExecuteButtonClick}>Execute</button>
      </div>
    );
  }
}

export default Entry;
