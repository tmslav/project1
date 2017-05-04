import React from 'react'
import './HomeView.scss'

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ControlLabel, FormControl, HelpBlock, FormGroup, Checkbox,
Radio, Button, Tabs, Tab } from 'react-bootstrap';
import { createStore } from 'redux'
import PropTypes from 'prop-types'

// a "reducer" that handle some events and return a state
function placementReducer(state = [], action) {
    if (state === undefined) {
        state = [];
    }
    if (action.type === 'ADD_PLACEMENT') {
        var newState = state.concat([action.placement]);
        return newState;
    }
    return state;
}
let selectedPlacementStore = createStore(placementReducer)
selectedPlacementStore.subscribe(() =>
  console.log('selectedPlacementStore updated',
selectedPlacementStore.getState())
)
var placements = [{"status": "matching", "count": 2,"target_da_range": "35 - 40", "company_name": "Rehabs"}, {"status":"matching", "count": 2, "target_da_range": "45-50", "company_name":"Rehabs"}, {"status": "matching", "count": 2, "target_da_range": "30 -35", "company_name": "Rehabs"}, {"status": "matching", "count": 2,"target_da_range": "40 - 45", "company_name": "Rehabs"}, {"status":"matching", "count": 2, "target_da_range": "50-60", "company_name":"Rehabs"}, {"status": "matching", "count": 1, "target_da_range": "41 -50", "company_name": "Dejan SEO"}, {"status": "article-requested","count": 1, "target_da_range": "20 - 30", "company_name": "Siftery"},{"status": "publisher-submitted", "count": 3, "target_da_range": "20 -30", "company_name": "Siftery"}, {"status": "matching", "count": 1,"target_da_range": "40 - 50", "company_name": "Siftery"}, {"status":"matching", "count": 8, "target_da_range": "20 - 30", "company_name":"Siftery"}, {"status": "matching", "count": 11, "target_da_range": "30- 40", "company_name": "Siftery"}, {"status": "article-in-review","count": 5, "target_da_range": "20 - 30", "company_name": "Siftery"},{"status": "article-pending-submission", "count": 1,"target_da_range": "20 - 30", "company_name": "Siftery"}, {"status":"publisher-submitted", "count": 2, "target_da_range": "20 - 30","company_name": "Fantasy Footballers"}, {"status": "publisher-submitted", "count": 4, "target_da_range": "30 - 40", "company_name":"Fantasy Footballers"}, {"status": "matching", "count": 2,"target_da_range": "40 - 50", "company_name": "Fantasy Footballers"},{"status": "matching", "count": 5, "target_da_range": "30 - 40","company_name": "Fantasy Footballers"}, {"status": "matching","count": 7, "target_da_range": "20 - 30", "company_name": "Fantasy Footballers"}, {"status": "publisher-rejected", "count": 1,"target_da_range": "20 - 30", "company_name": "Fantasy Footballers"},{"status": "matching", "count": 7, "target_da_range": "40 - 50","company_name": "Classic Cosmetics"},];

var contributordata = [{"status": "Active Contributor", "url":"http://reallygoodemails.com", "moz_da": 44, "id": 17, "name": "Really Good Emails"}, {"status": "Active Contributor", "url": "http://youknowigotsoul.com/", "moz_da": 38, "id": 115, "name": "You Know I got Soul"}, {"status": "Active Contributor", "url": "http://savvytraveldecisions.com", "moz_da": 11, "id": 336, "name": "Savvy Travel Decisions"}, {"status": "Dead", "url": "http://wymg.com","moz_da": 30, "id": 2252, "name": "100.5 WYMG"}, {"status": "Previous Contributor", "url": "http://neworleansradio.com", "moz_da": 30, "id":1123, "name": "New Orleans Radio"}, {"status": "Dead", "url": "http://bmorons.com", "moz_da": 15, "id": 2629, "name": "Baltimorons"},{"status": "Dead", "url": "http://www.heatherkan.com/", "moz_da": 24,"id": 1887, "name": "Heather Kan"}, {"status": "Payment", "url":"http://jaguda.com", "moz_da": 44, "id": 1607, "name": "Jaguda"},{"status": "Previous Contributor", "url": "http://catecosta.com","moz_da": 23, "id": 1331, "name": "Catecosta"}, {"status": "Payment","url": "http://Homechunk.com", "moz_da": 34, "id": 3050, "name":"Homechunk.com"}, {"status": "Dead", "url": "http://webelieveinstyle.net", "moz_da": 16, "id": 2031, "name": "We BelieveIn Style"}, {"status": "Dead", "url": "http://www.lennysyankees.com/","moz_da": 27, "id": 2102, "name": "lenNY's Yankees"}, {"status":"Legacy Contributor", "url": "http://streethistory.com", "moz_da": 26,"id": 1431, "name": "Street History Blog"}, {"status": "Dead", "url":"http://laurenlindley.com", "moz_da": 35, "id": 2058, "name": "Lauren Lindley Photography"}, {"status": "Previous Contributor", "url":"http://thegolfbiz.com", "moz_da": 16, "id": 1213, "name": "The GolfBiz"}, {"status": "Legacy Contributor", "url": "http://www.milehighhockey.com/", "moz_da": 42, "id": 1530, "name": "Mile HighHockey"}, {"status": "Payment", "url": "http://GizmoChunk.com","moz_da": 31, "id": 3052, "name": "GizmoChunk.com"}, {"status":"Legacy Contributor", "url": "http://www.rawcharge.com/", "moz_da":44, "id": 1408, "name": "Raw Charge"}, {"status": "Dead", "url":"http://subinev.com", "moz_da": 36, "id": 1668, "name": "Subinev"},{"status": "Low Value", "url": "http://djworksmusic.com/", "moz_da":10, "id": 2938, "name": "Djworksmusic"}, {"status": "Dead", "url":"http://tomorrowsverse.com/", "moz_da": 26, "id": 2006, "name":"Tomorrow's Verse"}, {"status": "Low Value", "url": "http://theinhouston.com/", "moz_da": 6, "id": 2791, "name":"Theinhouston"},];
var selected_placements = [];

placements.forEach((column, i) => {
      column["id"] = i
}, this);

const statusType = {
  0: 'matching',
  1: 'publisher-submitted',
  2: 'publisher-rejected'
};
//function onRowSelect(row, isSelected, e) {
//  if (isSelected && row.id >= 3) {
//    alert('The selection only work on key which less than 3');
//    return false;
//  }
//}
class SelectedPlacements extends React.Component {
  constructor(props){
    super(props);
  }
    static defaultProps = {
        selected_placements: []
};

  render() {
    var i = 1;
    console.log('inside render of SelectedPlacements', this.props);
    var list = this.props.selected_placements.map( (placement) => {
      return <div key={i++}>{placement.company_name}</div>;
    });
    return <div>{list}</div>;
  }
}

function onRowSelect(row, isSelected, e) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': "' + row[prop] + '"';
  }
    console.log('row:', row);
    selectedPlacementStore.dispatch({
        type: 'ADD_PLACEMENT',
        placement: row
});
  //alert(`is selected: ${isSelected}, ${rowStr}`);
}
const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  bgColor: 'lightblue',
  onSelect: onRowSelect,
};
class PlacementTable extends React.Component {
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
      expandBy: 'column',  // Currently, available value is row andcolumn, default is row
};
    return (
        <div>
          <BootstrapTable data={ placements }
            options={ options }
            selectRow={ selectRowProp }
            >
            <TableHeaderColumn dataField='id' isKey={ true }hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='company_name' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>Company Name</TableHeaderColumn>
            <TableHeaderColumn dataField='target_da_range' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>DA Range</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataSort={ true } filterFormatted expandable={ false }>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='count' dataSort={ true }>Count</TableHeaderColumn>
          </BootstrapTable>
      </div>
); }
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
    return (
        <div>
          <BootstrapTable data={ contributordata }
            options={ options }
            expandableRow={ this.isExpandableRow }
            expandComponent={ this.expandComponent }
            selectRow={ selectRowProp }
>
            <TableHeaderColumn dataField='id' isKey={ true } hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort={ false } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>Publisher</TableHeaderColumn>
            <TableHeaderColumn dataField='url' dataSort={ false } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>URL</TableHeaderColumn>
            <TableHeaderColumn dataField='moz_da' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>DA</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataSort={ true } filter={ { type: 'TextFilter', delay: 10 } } expandable={ false }>Status</TableHeaderColumn>
          </BootstrapTable>
      </div>
); }
}
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class NavDropdown extends React.Component {
  handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  }
  render() {
    return (
      <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Placements">
                <PlacementTable />
            </Tab>
            <Tab eventKey={2} title="Publishers">
                <ContributorTable />
            </Tab>
      </Tabs>
);
} 
};
class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string
    };
    static defaultProps = {
        statusText: '',
        userName: ''
    };
    handleClick(event) {
        event.preventDefault()
        var el = event.target
        console.log(el)
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
    <SelectedPlacements />
    <NavDropdown />
</div> );
} }
const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};
const mapPlacementStateToProps = (state) => {
    return {
        selected_placements: state,
    };
};
//export default connect(mapPlacementStateToProps)
//(SelectedPlacements);
//export default connect(mapStateToProps)(HomeView);
//export { HomeView as HomeViewNotConnected };
//export const HomeView = () => (
//  <div>
//    <h4>Welcome!</h4>
//    <img
//      alt='This is a duck, because Redux!'
//      className='duck'
//      src={DuckImage} />
//  </div>
//)

export default HomeView
