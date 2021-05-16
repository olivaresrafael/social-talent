import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//Redux Stuffs
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';
//MUI suff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class CommentForm extends Component {
  state = {
    body: '',
    errors: {},
    loading: false,
  };

  static getDerivedStateFromProps = (props, state) => {
    const { errors } = props.UI;
    const loading = props.loading;
    if (errors) {
      return {
        errors: errors,
        loading: loading,
      };
    } else if (!errors && state.loading) {
      return {
        errors: {},
        body: '',
        loading: loading,
      };
    } else return null;
  };

  handleSubmit = (event) => {
    this.setState({
      loading: true,
      errors: {},
    });
    event.preventDefault();
    this.props.submitComment({
      screamId: this.props.screamId,
      commentData: { body: this.state.body },
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { authenticated, classes } = this.props;
    const { errors, loading } = this.state;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} className={classes.gridForm}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment"
            error={errors.body ? true : false}
            helperText={errors.body}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={this.props.loading}
          >
            Submit
            {loading && (
              <CircularProgress
                className={classes.circular}
                color="secondary"
                size={30}
              />
            )}
          </Button>
        </form>
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.data.scream.loading,
  authenticated: state.user.authenticated,
  UI: state.UI,
});

const mapActionsToProps = {
  submitComment,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));
