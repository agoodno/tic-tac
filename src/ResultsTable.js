//https://github.com/adazzle/react-data-grid/issues/744
// Only need to do this once.
//import './fix-create-class';
import './fix-prop-types';

import React, { Component } from 'react';
import 'ResultsTable.css';
import ReactDataGrid from 'react-data-grid';


class ResultsTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { columns: [], rows: [] };
  }

  componentDidMount() {
    console.log('did this');
    this.fetchResults(this);
  }

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  fetchResults(c) {
    function makeCols(coldata) {
      //make coldata shape match the shape of a column that the widget expects
      return coldata.reduce(function(result, item, index) {
        var obj = { key: item, name: item, resizable: true };
        result.push(obj);
        return result;
      }, []);
    };

    function makeRows(rowdata) {
      //rowdata shape matches the shape that the widget expects
      return rowdata;
    };

    fetch('http://localhost:3001/results')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        c.setState({ columns: makeCols(json.columns), rows: makeRows(json.rows) });
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  };

  render() {
    return  (
      <ReactDataGrid
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        minColumnWidth={120}
      />);
  }
}

export default ResultsTable;
