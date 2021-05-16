import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
//Redux Stuffs
import { connect } from 'react-redux';
import { postScream } from '../../redux/actions/dataActions';
//MUI Stuffs
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
//MUI Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
    loading: false,
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.UI.errors && !props.UI.loading) {
      return {
        errors: props.UI.errors,
        loading: false,
      };
    }
    if (!props.UI.errors && !props.UI.loading && state.loading) {
      return {
        open: false,
        errors: {},
        loading: false,
        body: '',
      };
    }
    return null;
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      errors: {},
      body: '',
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {},
    });
  };

  handleSubmit = (event) => {
    this.setState({
      loading: true,
      errors: {},
    });
    event.preventDefault();
    this.props.postScream({
      body: this.state.body,
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton tip="Post a new Scream!" onClick={this.handleOpen}>
          <AddIcon />
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
            btnClass={classes.buttonClose}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Scream!</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream!"
                multiline
                rows="3"
                placeholder="Scream your new scream"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              fullWidth
              disabled={loading}
              onClick={this.handleSubmit}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progessSpinner}
                />
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  screams: state.screams,
});

const mapActionsToProps = {
  postScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScream));
