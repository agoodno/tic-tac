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

    var serverOptions = [<option value="">--Select--</option>];
    var envOptions = [];
    var queryOptions = [<option value=""></option>];

    this.props.servers.forEach((server) => {
      if (!server.disabled) {
        var selected = (this.props.server === server.url);
        serverOptions.push(<option value={server.url} selected={selected} data-county-no={server.countyNo}>{server.name}</option>);
      }
    });
    this.environments.forEach((environment) => {
      var selected = (this.state.environment === environment.code);
      envOptions.push(<option value={environment.code} selected={selected}>{environment.description}</option>);
    });
    this.props.queries.forEach((query) => {
      var selected = (this.state.query_template === query.text);
      queryOptions.push(<option value={query.text} selected={selected}>{query.name}</option>);
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
                <select className="environments" onChange={this.handleEnvChange}>
                  {envOptions}
                </select>
              </td>
              <td>
                <select className="servers" onChange={this.handleServerChange}>
                  {serverOptions}
                </select>
              </td>
              <td>
                <select className="queries" onChange={this.handleQueryTemplateChange}>
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
