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
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
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
          <img src={AppIcon} className={classes.icon} alt="logo" />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
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
              dont have an account? singup <Link to="/signup">here</Link>
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

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
