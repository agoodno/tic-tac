import React, { Component } from 'react';
import 'Entry.css';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { serverTemplates: [], queryTemplates: [], serverTemplate: '', queryTemplate: '', environment: 'inhouse', server: '', countyNo: '', query: '' };
    this.environments = [{"code": "inhouse", "description":"Inhouse"},{"code":"prod", "description":"Production"}];

    this.storeTemplatesForEnv = this.storeTemplatesForEnv.bind(this);

    this.storesServerTemplatesInState = this.storesServerTemplatesInState.bind(this);
    this.storesQueryTemplatesInState = this.storesQueryTemplatesInState.bind(this);

    this.handleEnvChange = this.handleEnvChange.bind(this);
    this.handleServerTemplateChange = this.handleServerTemplateChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleCountyNoChange = this.handleCountyNoChange.bind(this);
    this.handleQueryTemplateChange = this.handleQueryTemplateChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
  }

  componentDidMount() {
    this.storeTemplatesForEnv();
  }

  storeTemplatesForEnv() {
    this.props.fetchServerTemplatesForEnv(this.state.environment, this.storesServerTemplatesInState);
    this.props.fetchQueryTemplatesForEnv(this.state.environment, this.storesQueryTemplatesInState);
  }

  handleEnvChange(evt) {
    // console.log('handling change to env'); console.log(evt.target.value);
    this.setState({ environment: evt.target.value }, this.storeTemplatesForEnv);
  }

  storesServerTemplatesInState(serverTemplates) {
    // console.log('storing server temps'); console.log(serverTemplates);
    this.setState({ serverTemplates: serverTemplates });
  }

  storesQueryTemplatesInState(queryTemplates) {
    // console.log('storing query temps'); console.log(queryTemplates);
    this.setState({ queryTemplates: queryTemplates });
  }

  handleServerTemplateChange(evt) {
    var server = evt.target.value;
    var countyNo = evt.target.options[evt.target.selectedIndex].dataset.countyNo;
    console.log("handing server temp change"); console.log(server);
    console.log("handing server temp change c"); console.log(countyNo);
    this.setState({ serverTemplate: server, server: server, countyNo: countyNo });
  }

  handleServerChange(evt) {
    // console.log("handing server change"); console.log(evt.target.value);
    this.setState({ serverTemplate: '', server: evt.target.value, countyNo: '' });
  }

  handleCountyNoChange(evt) {
    // console.log("handing server change"); console.log(evt.target.value);
    this.setState({ countyNo: evt.target.value });
  }

  handleQueryTemplateChange(evt) {
    // console.log("handing query temp change"); console.log(evt.target.value);
    this.setState({ query: evt.target.value, queryTemplate: evt.target.value });
  }

  handleQueryChange(evt) {
    this.setState({ query: evt.target.value, queryTemplate: '' });
  }

  handleExecuteButtonClick(evt) {
    // console.log("handling button click"); console.log(evt.target.value);
    var finalQuery = this.state.query.replace(/\$countyNo/, this.state.countyNo);
    this.props.onExecuteButtonClick(this.state.server, finalQuery);
  }

  render() {
    console.log("Entry rendering with: "); console.log(this.state);

    var serverOptions = [<option key="-1" value=""></option>];
    var envOptions = [];
    var queryOptions = [<option key="-1" value=""></option>];

    this.environments.forEach((environment) => {
      envOptions.push(<option key={environment.code} value={environment.code}>{environment.description}</option>);
    });
    this.state.serverTemplates.forEach((server, index) => {
      if (!server.disabled) {
        serverOptions.push(<option key={index} value={server.url} data-county-no={server.countyNo}>{server.name}</option>);
      }
    });
    this.state.queryTemplates.forEach((query, index) => {
      queryOptions.push(<option key={index} value={query.text}>{query.name}</option>);
    });

    return (
      <div className="Entry">
        <div className="row">
          <div className="form-group col-md-2">
            <label>Environment</label>
            <select
               id="environments"
               tabIndex="1"
               value={this.state.environment}
               className="environments form-control"
               aria-describedby="environmentsHelp"
               onChange={this.handleEnvChange}>
              {envOptions}
            </select>
            <div>
              <small id="environmentsHelp" className="form-text text-muted">Narrows the Servers and Query Templates choices.</small>
            </div>
          </div>
          <div className="form-group col-md-2">
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
                   value={this.state.server}
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
                   value={this.state.countyNo}
                   size="4"
                   maxLength="2"
                   className="form-control"
                   tabIndex="0"
                   aria-describedby="countyNoHelp"
                   placeholder="Enter countyNo to use with this server"
                   onChange={this.handleCountyNoChange} />
            <small id="countyNoHelp" className="form-text text-muted">This will be substituted in wherever the $countyNo variable is found.</small>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-3">
            <label htmlFor="queryTemplates">Query Templates</label>
            <select
               id="queryTemplates"
               value={this.state.queryTemplate}
               className="queries form-control"
               tabIndex="3"
               onChange={this.handleQueryTemplateChange}>
              {queryOptions}
            </select>
          </div>
        </div>
        <div className="form-group">
          <textarea
             id="query"
             className="form-control"
             tabIndex="4"
             value={this.state.query}
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
