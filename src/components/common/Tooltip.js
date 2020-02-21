import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./styles/Tooltip.css";
//import link to go to user

export class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTooltip: false
    };
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  hideTooltip() {
    this.setState({ displayTooltip: false });
  }
  showTooltip() {
    this.setState({ displayTooltip: true });
  }

  render() {
    const message = this.props.message;
    const position = this.props.position;

    return (
      <span
        className="tooltip font-weight-bold"
        onMouseLeave={this.hideTooltip}
      >
        {this.state.displayTooltip && (
          <div className={`tooltip-bubble tooltip-${position}`}>
            <div className="tooltip-message">{message}</div>
          </div>
        )}
        <span className="tooltip-trigger" onMouseOver={this.showTooltip}>
          {this.props.children}
        </span>
      </span>
    );
  }
}

Tooltip.propTypes = {
  message: PropTypes.object.isRequired,
  children: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tooltip);
