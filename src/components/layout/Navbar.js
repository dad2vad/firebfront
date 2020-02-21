import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions/AuthActions";

import SearchInputGroup from "../common/SearchInputGroup";

export class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props;
    console.log(user);

    return (
      <nav className="navbar navbar-bottom navbar-expand-sm navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-camera-retro fa-lg" /> | InstaPro
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobilenav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {
                  <SearchInputGroup
                    placeholder="Search..."
                    name="search"
                    icon="fas fa-search"
                    type="text"
                    value={this.state.search}
                    onChange={this.onChange}
                    errors={errors.search}
                  />
                }
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-2 text-dark">
                <Link className="nav-link" to="/explore">
                  <i className="far fa-compass fa-lg text-dark" />
                </Link>
              </li>
              <li className="nav-item mx-2">
                {/* recent activity */}
                <span className="nav-link">
                  <i className="far fa-heart fa-lg text-dark" />
                </span>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to={`/profile/${user.username}`}>
                  <i className="far fa-user fa-lg text-dark" />
                </Link>
                <a href="/" className="nav-link" onClick={this.onLogout}>
                  Logout
                </a>
                {/* <Link className="nav-link" to="/profile" /> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  // errors: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
