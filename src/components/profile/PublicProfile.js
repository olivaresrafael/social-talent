import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
//Redux Stuff
import { connect } from 'react-redux';
//MUI Stuffs

import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LinkIcon from '@material-ui/icons/Link';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class PublicProfile extends Component {
  render() {
    const {
      classes,
      data: {
        loading,
        profile: { handle, createdAt, imageUrl, bio, website, location },
      },
    } = this.props;

    //Profile Card Markup
    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
          </div>
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span> <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {'  '}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <hr />
        </div>
      </Paper>
    ) : (
      <p>Loading...</p>
    );
    return profileMarkup;
  }
}
PublicProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(PublicProfile));
