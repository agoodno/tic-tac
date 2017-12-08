import React, { Component } from 'react';
import 'Entry.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ServerManager from 'ServerManager';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { query_template: '' };
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleQueryTemplateChange = this.handleQueryTemplateChange.bind(this);
    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  handleServerChange(evt) {
    this.props.onServerChange(evt.target.value);
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
    console.log("Rerendering with: "); console.log(this.state);

    var serverOptions = [<option value="">--Select--</option>];
    var queryOptions = [<option value=""></option>];

    this.props.servers.forEach((server) => {
      if (!server.disabled) {
        var selected = (this.props.server === server.url);
        serverOptions.push(<option value={server.url} selected={selected}>{server.name}</option>);
      }
    });
    this.props.queries.forEach((query) => {
      var selected = (this.state.query_template === query.text);
      queryOptions.push(<option value={query.text} selected={selected}>{query.name}</option>);
    });

    return (
      <Router>
        <div className="Entry">
          <Route path="/servers" component={ServerManager}/>
          <table>
            <thead>
              <tr>
                <th><Link to="/servers">Servers</Link></th>
                <th>Query Templates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                <td colSpan="2">
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
      </Router>
    );
  }
}

export default Entry;
