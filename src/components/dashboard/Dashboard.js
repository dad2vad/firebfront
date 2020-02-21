import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";

import Posts from "../posts/Posts";
import PostForm from "../posts/PostForm";

import Navbar from "../layout/Navbar";
//edit profile
//profiles
//post
//notfound

export class Dashboard extends Component {
  addDefaultSrc(ev) {
    ev.target.src =
      "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png";
  }
  render() {
    // const { user, isAuthenticated } = this.props.auth;
    const { user } = this.props.auth;
    return (
      <React.Fragment>
        <Navbar user={user} />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Posts />
            </div>
            <div className="col-md-4">
              <div className="row mt-5">
                <div className="col-md-2">
                  <Link to={`/profile/${user.username}`}>
                    <img
                      onError={this.addDefaultSrc}
                      src={user.avatar}
                      className="img-responsive rounded-circle"
                      height="50"
                    />
                  </Link>
                </div>
                <div className="col-md-10 text-left">
                  <Link to={`/profile/${user.username}`}>
                    <strong>{user.username}</strong>
                  </Link>
                  <p>{user.name}</p>
                </div>
              </div>
              <p>Stories</p>
              <p>Suggestions</p>
              <PostForm />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
