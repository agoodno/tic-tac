/* eslint react/no-deprecated: 0 */

import './fix-prop-types';
import React, { Component, PropTypes } from 'react';
//import PropTypes from 'prop-types';

import { changeEnvironment, changeServerTemplate, changeQueryTemplate } from './actions';
import 'Entry.css';

const envOptions = (environments) => {
  var options = [];
  environments.forEach((environment) => {
    options.push(<option key={environment.code} value={environment.code}>{environment.description}</option>);
  });
  return options;
};


const serverOptions = (serverTemplates) => {
  var options = [<option key="-1" value=""></option>];
  serverTemplates.forEach((server, index) => {
//      if (!server.disabled) {
    options.push(<option key={index} value={server.url} data-county-no={server.countyNo}>{server.name}</option>);
  });
  return options;
};

const queryOptions = (queryTemplates) => {
  var options = [<option key="-1" value=""></option>];
  queryTemplates.forEach((query, index) => {
    options.push(<option key={index} value={query.text}>{query.name}</option>);
  });
  return options;
};

class Entry extends Component {
  constructor(props) {
    super(props);
    this.handleExecuteButtonClick = this.handleExecuteButtonClick.bind(this);
    // this.state = { serverTemplates: [], queryTemplates: [] };

    // this.storeTemplatesForEnv = this.storeTemplatesForEnv.bind(this);
    // this.storesServerTemplatesInState = this.storesServerTemplatesInState.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );

    //console.log(`mount env = ${store.getState().env}`);
    //this.storeTemplatesForEnv(store.getState().env);
  }

  // componentDidUpdate() {
  //   const { store } = this.context;
  //   console.log(`update env = ${store.getState().env}`);
  //   this.storeTemplatesForEnv(store.getState().env);
  // }

  componentWillUnmount() {
    this.unsubscribe();
  }

//   storeTemplatesForEnv(env) {
//     console.log('storing for env'); console.log(env);
//     this.props.fetchServerTemplatesForEnv(env, this.storesServerTemplatesInState);
// //    this.props.fetchQueryTemplatesForEnv(env, this.storesQueryTemplatesInState);
//   }

//   storesServerTemplatesInState(serverTemplates) {
//     // console.log('storing server temps'); console.log(serverTemplates);
//     // const { store } = this.context;
//     //store.dispatch(loadServerTemplates(serverTemplates));
//     //this.setState({ serverTemplates: serverTemplates });
//   }

  handleExecuteButtonClick(evt) {
    // console.log("handling button click"); console.log(evt.target.value);
    const { store } = this.context;
    const state = store.getState();

    console.log(`exec state=${JSON.stringify(state)}`);

    var finalQuery = state.query.replace(/\$countyNo/, state.countyNo);
    this.props.onExecuteButtonClick(state.server, finalQuery);
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    // console.log(`state=${JSON.stringify(state)}`);

    return (
      <div className="Entry">
        <div className="row">
          <div className="form-group col-md-2">
            <label>Environment</label>
            <select
               id="environments"
               value={state.env}
               tabIndex="1"
               className="environments form-control"
               aria-describedby="environmentsHelp"
               onChange={(evt) => store.dispatch(changeEnvironment(evt.target.value))}>
              {envOptions(props.environments)}
            </select>
            <div>
              <small id="environmentsHelp" className="form-text text-muted">Narrows the Servers and Query Templates choices.</small>
            </div>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="serverTemplates">Server Templates</label>
            <select
               id="serverTemplates"
               value={state.serverTemplate}
               className="servers form-control"
               tabIndex="2"
               aria-describedby="serverTemplatesHelp"
               onChange={(evt) => store.dispatch(changeServerTemplate(evt.target.value, evt.target.options[evt.target.selectedIndex].dataset.countyNo))}>
              {serverOptions(state.serverTemplates)}
            </select>
            <small id="serverTemplatesHelp" className="form-text text-muted">Pre-defined servers.</small>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="server">Server</label>
            <input id="server"
                   type="text"
                   value={state.server}
                   className="form-control"
                   tabIndex="0"
                   aria-describedby="serverHelp"
                   placeholder="Enter database url or select one from the dropdown" />
            <small id="serverHelp" className="form-text text-muted">Server to run the query against.</small>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="countyNo">County No</label>
            <input id="countyNo"
                   type="text"
                   value={state.countyNo}
                   size="4"
                   maxLength="2"
                   className="form-control"
                   tabIndex="0"
                   aria-describedby="countyNoHelp"
                   placeholder="Enter countyNo to use with this server" />
            <small id="countyNoHelp" className="form-text text-muted">This will be substituted in wherever the $countyNo variable is found.</small>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-3">
            <label htmlFor="queryTemplates">Query Templates</label>
            <select
               id="queryTemplates"
               value={state.queryTemplate}
               className="queries form-control"
               tabIndex="3"
               onChange={(evt) => store.dispatch(changeQueryTemplate(evt.target.value))}>
              {queryOptions(state.queryTemplates)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <textarea
             id="query"
             value={state.query}
             className="form-control"
             tabIndex="4"
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
};

Entry.contextTypes = {
  store: PropTypes.object
};

export default Entry;
