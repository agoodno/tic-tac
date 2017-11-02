//https://github.com/adazzle/react-data-grid/issues/744
// Only need to do this once.
//import './fix-create-class';
import './fix-prop-types';

import React, { Component } from 'react';
import 'ResultsTable.css';
import ReactDataGrid from 'react-data-grid';

class NoResultsTable extends React.Component {
  render() {
    return (<h4>No Results Currently Available</h4>);
  }
}

class ResultsTable extends Component {
  rowGetter = (i) => {
    return this.props.data.rows[i];
  };

  //make coldata shape match the shape of a column that the widget expects
  makeCols(coldata) {
    return coldata.reduce(function(result, item, index) {
      var obj = { key: item, name: item, resizable: true };
      result.push(obj);
      return result;
    }, []);
  };

  // rowdata already matches the shape that the widget expects
  // makeRows(rowdata) {
  //   return rowdata;
  // };

  render() {
    // console.log("Results rendering with: "); console.log(this.data);

    return  (
      <div className="ResultsTable">
        <ReactDataGrid
           columns={this.makeCols(this.props.data.columns)}
           rowGetter={this.rowGetter}
           rowsCount={this.props.data.rows.length}
           minHeight={500}
           minColumnWidth={120}
           emptyRowsView={NoResultsTable} />
      </div>
    );
  }
}

export default ResultsTable;
