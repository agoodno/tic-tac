import React, { Component } from 'react';
import 'Entry.css';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { serverTemplate: '', queryTemplate: '' };
    this.environments = [{"code": "inhouse", "description":"Inhouse"},{"code":"prod", "description":"Production"}];
    this.handleEnvChange = this.handleEnvChange.bind(this);
    this.handleServerTemplateChange = this.handleServerTemplateChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleQueryTemplateChange = this.handleQueryTemplateChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  handleEnvChange(evt) {
    this.props.onEnvChange(evt.target.value);
  }

  handleServerTemplateChange(evt) {
    // console.log("handing server temp change"); console.log(evt.target.value);
    this.setState({ serverTemplate: evt.target.value });
    var countyNo = evt.target.options[evt.target.selectedIndex].dataset.countyNo;
    this.props.onServerChange(evt.target.value, countyNo);
  }

  handleServerChange(evt) {
    // console.log("handing server change"); console.log(evt.target.value);
    this.setState({ serverTemplate: '' });
    this.props.onServerChange(evt.target.value, '');
  }

  handleQueryTemplateChange(evt) {
    // console.log("handing query temp change"); console.log(evt.target.value);
    this.setState({ queryTemplate: evt.target.value });
    this.props.onQueryChange(evt.target.value);
  }

  handleQueryChange(evt) {
    this.setState({ queryTemplate: '' });
    this.props.onQueryChange(evt.target.value);
  }

  handleExecuteButtonClick(evt) {
    console.log("handling button click"); console.log(evt.target.value);
    this.props.onExecuteButtonClick(evt.target.value);
  }

  render() {
    console.log("Entry rendering with: "); console.log(this.state);

    var serverOptions = [<option key="-1" value=""></option>];
    var envOptions = [];
    var queryOptions = [<option key="-1" value=""></option>];

    this.environments.forEach((environment) => {
      envOptions.push(<option key={environment.code} value={environment.code}>{environment.description}</option>);
    });
    this.props.serverTemplates.forEach((server, index) => {
      if (!server.disabled) {
        serverOptions.push(<option key={index} value={server.url} data-county-no={server.countyNo}>{server.name}</option>);
      }
    });
    this.props.queryTemplates.forEach((query, index) => {
      queryOptions.push(<option key={index} value={query.text}>{query.name}</option>);
    });

    return (
      <div className="Entry">
        <div className="row">
          <div className="form-group col-md-3">
            <label>Environment</label>
            <select
               id="environments"
               tabIndex="1"
               value={this.props.environment}
               className="environments form-control"
               aria-describedby="environmentsHelp"
               onChange={this.handleEnvChange}>
              {envOptions}
            </select>
            <div>
              <small id="environmentsHelp" className="form-text text-muted">Narrows the Servers and Query Templates choices.</small>
            </div>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="serverTemplates">Server Templates</label>
            <select
               id="serverTemplates"
               value={this.state.serverTemplate}
               className="servers form-control"
               tabIndex="2"
               aria-describedby="serverTemplatesHelp"
               onChange={this.handleServerTemplateChange}>
              {serverOptions}
            </select>
            <small id="serverTemplatesHelp" className="form-text text-muted">Pre-defined servers.</small>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="server">Server</label>
            <input id="server"
                   type="text"
                   value={this.props.server}
                   className="form-control"
                   tabIndex="0"
                   aria-describedby="serverHelp"
                   placeholder="Enter database url or select one from the dropdown"
                   onChange={this.handleServerChange} />
            <small id="serverHelp" className="form-text text-muted">Server to run the query against.</small>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="countyNo">County No</label>
            <input id="countyNo"
                   type="text"
                   value={this.props.countyNo}
                   size="4"
                   maxLength="2"
                   className="form-control"
                   tabIndex="0"
                   aria-describedby="countyNoHelp"
                   placeholder="Enter countyNo to use with this server" />
            <small id="countyNoHelp" className="form-text text-muted">This will be substituted in wherever the $countyNo variable is found.</small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="queryTemplates">Query Templates</label>
          <select
             id="queryTemplates"
             value={this.state.queryTemplate}
             className="queries form-control"
             tabIndex="3"
             onChange={this.handleQueryTemplateChange}>
            {queryOptions}
          </select>
          <textarea
             id="query"
             className="form-control"
             tabIndex="4"
             value={this.props.query}
             onChange={this.handleQueryChange}
             aria-describedby="queryHelp"
             rows="5"
             cols="100"
             placeholder="Enter your query here or select one of the common query templates."/>
          <small id="queryHelp" className="form-text text-muted">Query to run. You can choose a canned query and then edit it in the text area.</small>
        </div>
        <button
           id="execute"
           className="btn btn-primary"
           tabIndex="5"
           onClick={this.handleExecuteButtonClick}>Execute</button>
      </div>
    );
  }
}

export default Entry;
