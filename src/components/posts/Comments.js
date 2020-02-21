import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import checkDate from "../../utils/checkDate";
import { likeComment } from "../../actions/PostActions";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      commentID: "",
      errors: {}
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleCheckLike = this.handleCheckLike.bind(this);
  }

  handleLike(postID, commentID, e) {
    this.props.likeComment(postID, commentID);
  }

  handleCheckLike(likes, e) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let { comments, auth, postID } = this.props;

    if (comments === null || comments === undefined) {
      comments = "";
    } else {
      comments.length > 1
        ? (comments = comments = comments.slice(0).map(comment => (
            <li key={comment._id} className="list-group-item text-left pl-3">
              <img
                onError={this.addDefaultSrc}
                src={comment.avatar}
                className="img-responsive"
                alt={<i className="fas fa-user-circle" />}
                height="25"
              />
              <span className="mr-auto">
                <strong>{comment.name}</strong> {comment.text}
              </span>
              <i
                className={
                  this.handleCheckLike(comment.likes)
                    ? "fas fa-heart text-right ml-auto float-right text-danger"
                    : "far fa-heart text-right ml-auto float-right"
                }
                onClick={this.handleLike.bind(this, comment._id, postID)}
              />
            </li>
          )))
        : (comments = null);
    }
    return <ul className="list-group list-group-flush w-100">{comments}</ul>;
  }
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postID: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  likeComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = { likeComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
