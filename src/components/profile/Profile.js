import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { getProfile } from "../../actions/ProfileActions";
import { getPosts } from "../../actions/PostActions";
import { Navbar } from "../layout/Navbar";

export class Profile extends Component {
  //if profile id == req.user / auth.upser id then show actions

  async componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfile(this.props.match.params.username);
      this.props.getPosts();
    }
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png";
  }

  render() {
    const { profile, loading, posts } = this.props;
    // if (this.props.auth) {
    //   const { user } = this.props.auth;
    //   console.log(user);
    // }
    let content;
    let postContent;
    if (posts === null || posts === undefined || loading) {
      postContent = <div>Loading</div>;
    } else {
      postContent = posts.posts.map(post => (
        <img
          key={post._id}
          className="img-responsive col-md-4 my-3"
          style={{ objectFit: "contain" }}
          height="250"
          src={post.image}
          alt={post._id}
        />
      ));
    }

    if (profile === null || profile === undefined || loading) {
      console.log("loading");
      content = <div>Loading</div>;
    } else {
      content = (
        <div className="row mt-5 py-5">
          <div className="col-md-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              onError={this.addDefaultSrc}
              className="img-responsive rounded-circle"
              height="150"
            />
          </div>
          <div className="col-md-8">
            <div className="row">
              <h3 className="font-weight-normal">{profile.username} </h3>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm mx-3"
              >
                Edit Profile
              </button>
              <i className="fas fa-cog fa-2x" />
            </div>
            <div className="row my-3">
              <div>
                <strong>243</strong> posts
              </div>
              <div className="mx-5">
                <strong>578</strong> followers
              </div>
              <div>
                <strong>1,139</strong> following
              </div>
            </div>
            <div className="row">
              <strong>Grafto Thomas</strong>
            </div>
            <div className="row text-left">
              Alex. Software Developer. <br /> Sc: Graft0
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Navbar user={this.props.auth.user} />
        <div className="container">
          {content}
          <hr />
          <div className="row">
            <button type="button" className="btn btn-default btn-sm mx-auto">
              <i className="fas fa-th mr-1" />
              POSTS
            </button>
            <button type="button" className="btn btn-default btn-sm mx-auto">
              <i className="fas fa-tv mr-1" />
              IGTV
            </button>
            <button type="button" className="btn btn-default btn-sm mx-auto">
              <i className="far fa-bookmark mr-1" />
              SAVED
            </button>
            <button type="button" className="btn btn-default btn-sm mx-auto">
              <i className="fas fa-id-card-alt mr-1" />
              TAGGED
            </button>
          </div>
          <div className="row">
            {/* <small>Only you can see what you've saved</small> */}
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profiles.profile,
  posts: state.posts
});
const mapDispatchToProps = {
  getProfile,
  getPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
