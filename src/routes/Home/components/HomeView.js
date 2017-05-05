import React from 'react'
import './HomeView.scss'

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ControlLabel, FormControl, HelpBlock, FormGroup, Checkbox,Radio, Button, Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types'
import {getPlacements} from '../../../redux/modules/placements'
import { Provider } from 'react-redux'

var selected_placements = [];

const statusType = {
  0: 'matching',
  1: 'publisher-submitted',
  2: 'publisher-rejected'
};

class SelectedPlacements extends React.Component {
  constructor(props){
    super(props);
  }
    static defaultProps = {
        selected_placements: []
  }
  render() {
    var i = 1;
    if ( this.props.placements.placements) {
        let list = this.props.selected_placements.map( (placement) => {
          return <div key={i++}>{placement.company_name}</div>;
          }
        )
        return <div>{list}</div>;
      }
    return <div></div>
    }
}
function onRowSelect(row, isSelected, e) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': "' + row[prop] + '"';
  }
    selectedPlacementStore.dispatch({
        type: 'ADD_PLACEMENT',
        placement: row
})}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  bgColor: 'lightblue',
  onSelect: onRowSelect,
}

class PlacementTable extends React.Component {
  constructor(props) {
    super(props);
  }
  isExpandableRow(row) {
    return true
    if (row.id < 3) return true;
    else return false;
  }
  expandComponent(row) {
    return (
      <div data={ row.expand } />
    )
  }
  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      expandBy: 'column',  // Currently, available value is row andcolumn, default is row
    }
    const data = this.props.data.placements
    if (data) {
      data.forEach((column, i) => {
              column["id"] = i
      }, this);

      return (
          <div>
            <BootstrapTable
              data = { data }
              options={ options }
              selectRow={ selectRowProp }>
              <TableHeaderColumn dataField='id' isKey={ true }hidden>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='company_name' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>Company Name</TableHeaderColumn>
              <TableHeaderColumn dataField='target_da_range' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>DA Range</TableHeaderColumn>
              <TableHeaderColumn dataField='status' dataSort={ true } filterFormatted expandable={ false }>Status</TableHeaderColumn>
              <TableHeaderColumn dataField='count' dataSort={ true }>Count</TableHeaderColumn>
            </BootstrapTable>
        </div>
      ) 
    }
    else
      return (<div></div>)
  }
}

class ContributorTable extends React.Component {
  constructor(props) {
    super(props);
  }
  isExpandableRow(row) {
    if (row.id < 3) return true;
    else return false;
  }
  expandComponent(row) {
    return (
      <div data={ row.expand } />
    );
  }
  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      expandBy: 'column',  // Currently, available value is row and column, default is row
    };
    const data = this.props.data.contributordata
    return (
        <div>
          <BootstrapTable data={Boolean(data) ? data : []}
            options={ options }
            expandableRow={ this.isExpandableRow }
            expandComponent={ this.expandComponent }
            selectRow={ selectRowProp }>
            <TableHeaderColumn dataField='id' isKey={ true } hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort={ false } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>Publisher</TableHeaderColumn>
            <TableHeaderColumn dataField='url' dataSort={ false } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>URL</TableHeaderColumn>
            <TableHeaderColumn dataField='moz_da' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>DA</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>Status</TableHeaderColumn>
          </BootstrapTable>
      </div>)
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

class NavDropdown extends React.Component {
  constructor(props) {
    super(props)
  }
  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }
  render() {
    return (
      <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Placements">
                <PlacementTable data={this.props.data}/>
            </Tab>
            <Tab eventKey={2} title="Publishers">
                <ContributorTable data={this.props.data}/>
            </Tab>
      </Tabs>
    )
  } 
}

class HomeView extends React.Component {
    constructor(props){
      super(props)
      props.selected_placements()
    }
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string
    }
    static defaultProps = {
        statusText: '',
        userName: ''
    }
    handleClick(event) {
        event.preventDefault()
        var el = event.target
    }
    render() {
        return (
            <div className="container">
                <div className="margin-top-medium text-center"></div>
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>:null }
            </div>
                <form>
                    <FieldGroup
                      id="article_title"
                      type="text"
                      label="Article Title"
                      placeholder="Enter article title"/>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Article Description</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Enter article description" />
                    </FormGroup>
                    <Button type="submit" onClick={this.handleClick.bind(this)} className='btn btn-success'>Submit</Button>
                </form>
                <SelectedPlacements placements={ this.props.placements } />
                <NavDropdown data={this.props.placements }/>
            </div>
            );
    } 
}

const mapStateToProps = (state) => {
  return {
    placements:state.placements,

  }
};

const mapDispatchPlacementStateToProps = (dispatch) => {
    return bindActionCreators({
        selected_placements: getPlacements,
    },dispatch);
};

export default connect(mapStateToProps,mapDispatchPlacementStateToProps)(HomeView)
