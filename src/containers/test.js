import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'

const propTypes = {
};

class Test extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

Test.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
