import React from 'react'
import './HomeView.scss'

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ControlLabel, FormControl, HelpBlock, FormGroup, Checkbox,Radio, Button, Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { getInitData, addPlacement, removePlacement,addPublisher,removePublisher} from 'modules/placements'
import { handleArticleSubmit } from 'modules/placements'
import { Provider } from 'react-redux'

const statusType = {
  0: 'matching',
  1: 'publisher-submitted',
  2: 'publisher-rejected'
}

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

class PlacementTable extends React.Component {
  constructor(props) {
    super(props);
    this.selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: 'lightblue',
      onSelect: this.onRowSelect.bind(this),
    }
  }
  isExpandableRow (row) {
    return true
    if (row.id < 3) return true;
    else return false;
  }
  expandComponent (row) {
    return (
      <div data={ row.expand } />
    )
  }
  onRowSelect(row, isSelected, e) {
    if ( isSelected ) {
      this.props.add_placement(row)
    }
    else {
      this.props.remove_placement(row)
    }
  }
  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      expandBy: 'column',  // Currently, available value is row andcolumn, default is row
    }
    if (this.props.data) {
      //TODO remove this id and add in data
      const data = this.props.data
      data.forEach((column, i) => {
              column["id"] = i
      }, this);
      this.selectRowProp.selected = this.props.selected ? this.props.selected.placements : []
      if (this.props.selected)
        this.selectRowProp.selected.map(i => {
          this.onRowSelect({id:i},true)
          return i
        })

      return (
          <div>
            <BootstrapTable
              data = { data || [] }
              options={ options }
              selectRow={ this.selectRowProp }>
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
    this.selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: 'lightblue',
      onSelect: this.onRowSelect.bind(this),
    }
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
  onRowSelect(row, isSelected, e) {
    if ( isSelected ) {
      this.props.add_publisher(row)
    }
    else {
      this.props.remove_publisher(row)
    }
  }
  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      expandBy: 'column',  // Currently, available value is row and column, default is row
    }
    const data = this.props.data
    this.selectRowProp.selected = this.props.selected ? this.props.selected.contributors : []
    if (this.props.selected)
      this.selectRowProp.selected.map(i => {
        this.onRowSelect({id:i},true)
        return i
      })
    return (
        <div>
          <BootstrapTable data={Boolean(data) ? data : []}
            options={ options }
            expandableRow={ this.isExpandableRow }
            expandComponent={ this.expandComponent }
            selectRow={ this.selectRowProp }>
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
                <PlacementTable 
                  data={this.props.data.placements} 
                  selected={this.props.load}
                  add_placement={this.props.data.add_placement}
                  remove_placement={this.props.data.remove_placement}/>
            </Tab>
            <Tab eventKey={2} title="Publishers">
                <ContributorTable 
                  selected={this.props.load}
                  data={this.props.data.contributors}
                  add_publisher={this.props.data.add_publisher}
                  remove_publisher={this.props.data.remove_publisher}/>
            </Tab>
      </Tabs>
    )
  } 
}

class HomeView extends React.Component {
    constructor(props){
      super(props)
      props.fillStore()
    }

    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
    }

    static defaultProps = {
        statusText: '',
        userName: ''
    }
    handleClick(event) {
        event.preventDefault()
        const articleText = this.articleTitleElement.value
        const articleDescriptionText = this.articleDescriptionElement.value 
        this.props.onSubmitClick({ articleTitle:articleText, articleDescription:articleDescriptionText })
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
                      placeholder="Enter article title"
                      inputRef={(input) => {this.articleTitleElement = input; input && this.props.load ? input.value=this.props.load.data.title : null}} />
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Article Description</ControlLabel>
                      <FormControl inputRef={(input) => {this.articleDescriptionElement = input; input && this.props.load ? input.value=this.props.load.data.description : null}}
                         componentClass="textarea" 
                         placeholder="Enter article description" />
                    </FormGroup>
                    <Button type="submit" onClick={this.handleClick.bind(this)} className='btn btn-success'>Submit</Button>
                </form>
                <NavDropdown data={ this.props }  {...this.props} />
            </div>
            );
    } 
}

const mapStateToProps = (state) => {
  return {
    contributors: state.data.contributordata,
    placements: state.data.placements,
    load:state.data.load
  }
}

const mapDispatchPlacementStateToProps = (dispatch) => {
    return bindActionCreators({
        fillStore: getInitData,
        add_placement: addPlacement,
        remove_placement: removePlacement,
        add_publisher:addPublisher,
        remove_publisher: removePublisher,
        onSubmitClick: (article) => handleArticleSubmit(article)
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchPlacementStateToProps)(HomeView)
