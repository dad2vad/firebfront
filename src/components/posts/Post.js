import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import checkDate from "../../utils/checkDate";
//like post, flat post, add comment, actions(report innappropritate, unfoolow, go to post, cancel)
import { likePost, addComment } from "../../actions/PostActions";
import { followUser } from "../../actions/UserActions";

import Tooltip from "../common/Tooltip";
import Comments from "./Comments";

export class Post extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      postID: "",
      errors: {}
    };
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleCheckLike = this.handleCheckLike.bind(this);
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png";
  }

  onChange(id, e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ postID: id });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { errors } = this.props.errors;

    const newComment = {
      text: this.state.text
    };
    this.props.addComment(this.state.postID, newComment);
  }

  handleLike(id, e) {
    this.props.likePost(id);
  }

  handleCheckLike(likes, e) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  handleCheckBookmark(bookmarks) {
    const { auth } = this.props;
    // if (bookmarks.filter(like => like.user === auth.user.id).length > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  handleFollow = user => {
    // user.following;
    this.props.followUser(user);

    console.log(this.props.auth);
    // this.props.get
    // console.log("this.props.auth");
    // console.log(this.props.auth.user);
    // console.log("this.props.auth");
  };

  render() {
    const { post, error } = this.props;
    const { user } = this.props.auth;

    //add auth here to check if the user is blocked? idk
    // console.log(user);
    let likes;
    let likesList;

    if (post.likes !== null && post.likes !== undefined) {
      if (post.likes.length > 0) {
        likes = <span>{post.likes.length} likes</span>;
        likesList = post.likes.map(like => {
          // console.log(this.props);
          like.button =
            user.following.filter(follower => follower.user === like.user)
              .length > 0
              ? "Unfollow"
              : "Follow";
          return (
            <li
              key={like._id}
              className="list-group-item list-group-item-action"
            >
              <Link to={`/profile/${like.name}`}>{like.name}</Link>
              <button onClick={this.handleFollow.bind(this, like.user)}>
                {like.button}
              </button>
            </li>
          );
        });
      }
    }

    return (
      <div className="post card mt-5 card-body">
        <div className="row border-bottom py-2">
          <div className="col-md-1">
            <img //post avatar
              src={post.avatar}
              onError={this.addDefaultSrc}
              alt={<i className="fas fa-user-circle" />}
              className="img-responsive"
              height="25"
            />
          </div>

          <div className="col-md-9 text-left font-weight-bold">{post.name}</div>
          <div className="col-md-2 text-right">
            <i className="fas fa-ellipsis-h" />
          </div>
        </div>
        <div className="row m-auto mb-3">
          <img
            onError={this.addDefaultSrc} //make this show iamge not loading
            src={post.image}
            alt={post.image}
            height="500"
            className="mx-auto d-block postimg"
          />
        </div>
        <div className="row py-3">
          <i
            onClick={this.handleLike.bind(this, post._id)}
            className={
              this.handleCheckLike(post.likes)
                ? "fas fa-heart fa-lg ml-3 text-danger"
                : "far fa-heart fa-lg ml-3"
            }
          />
          <i className="far fa-comment fa-lg ml-3" />
          <i className="far fa-paper-plane fa-lg ml-3" />
          <i
            className={classnames("far fa-bookmark fa-lg ml-auto", {
              fas: this.handleCheckBookmark()
            })}
          />
        </div>
        <div className="row">
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-left pl-3">
              <img
                onError={this.addDefaultSrc}
                src={post.comments.avatar}
                className="img-responsive"
                alt={post.comments.name}
                height="25"
              />
              <strong>{post.comments[post.comments.length - 1].name}</strong>{" "}
              {post.comments[post.comments.length - 1].text}
            </li>
          </ul>
        </div>
        {likes ? (
          <Tooltip
            message={
              <ul className="list-group list-group-flush">{likesList}</ul>
            }
            position={"top"}
            className="text-left font-weight-bold"
          >
            {likes}
          </Tooltip>
        ) : null}
        <div className="row">
          <Comments comments={post.comments} postID={post._id} />
        </div>{" "}
        <small className="text-left mb-2">{checkDate(post.date)}</small>
        <div className="row border-top py-3">
          <input
            placeholder="Add a comment..."
            name="text"
            type="text"
            onChange={this.onChange.bind(this, post._id)}
            value={this.state.text}
            className="col-md-10 border-0"
          />
          <button
            type="button"
            onClick={this.onSubmit}
            className="btn btn-default text-info col-md-2 font-weight-bold"
          >
            Post
          </button>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = { likePost, addComment, followUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
