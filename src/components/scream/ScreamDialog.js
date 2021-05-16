import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
//Redux Stuffs
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
//MUI Stuffs
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//MUI Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

export class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.openDialog && !this.state.open);
    if (nextProps.openDialog && !this.state.open) {
      console.log('perro');
      this.handleUpdate();
    }
  }

  handleClose = () => {
    this.props.clearErrors();
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({
      open: false,
    });
  };

  handleUpdate = () => {
    const { screamId, userHandle } = this.props;
    let oldPath = `/users/${userHandle}/`;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    this.setState({
      open: true,
      oldPath: oldPath,
      newPath: newPath,
    });
    this.props.getScream(this.props.screamId);
  };

  handleOpen = () => {
    const { screamId, userHandle } = this.props;
    let oldPath = `/users/${userHandle}/`;

    const newPath = `/users/${userHandle}/scream/${screamId}`;
    window.history.pushState(null, null, newPath);
    this.setState({
      open: true,
      oldPath: oldPath,
      newPath: newPath,
    });
    this.props.getScream(this.props.screamId);
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={4} />
      </div>
    ) : (
      <Grid container className={classes.dialogContent}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {`@${userHandle}`}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          onClose={this.handleClose}
          tip="Expand Scream"
          tipClass={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClass={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
