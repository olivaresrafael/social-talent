import React, { Component } from 'react';
import AppIcon from '../images/logo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {},
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.UI.errors) {
      return {
        errors: nextProps.UI.errors,
      };
    } else {
      return null;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          <img src={AppIcon} className={classes.icon} alt="profile" />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={this.state.errors.email}
              error={this.state.errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={this.state.errors.password}
              error={this.state.errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              helperText={this.state.errors.confirmPassword}
              error={this.state.errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Nickname"
              helperText={this.state.errors.handle}
              error={this.state.errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress
                  className={classes.circular}
                  color="secondary"
                  size={30}
                />
              )}
            </Button>

            <br />
            <small>
              Already have an account? login <Link to="/login">here</Link>
            </small>
            {this.state.errors.general && (
              <Typography variant="body2" className={classes.errors}>
                {this.state.errors.general}
              </Typography>
            )}
          </form>
        </Grid>
        <Grid item sm={4}></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
