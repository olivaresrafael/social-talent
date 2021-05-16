import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//MUI STUFF
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//MUI Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//Redux
import { connect } from 'react-redux';
import { markNotificationRead } from '../../redux/actions/userActions';

export class Notifications extends Component {
  state = {
    anchorEl: null,
  };
  handleClose = (event) => {
    this.setState({
      anchorEl: null,
    });
  };
  handleOpen = (event) => {
    this.setState({
      anchorEl: event.target,
    });
  };
  onMenuOpened = () => {
    let unreadNotificationsId = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => {
        return not.notificationId;
      });
    if (unreadNotificationsId.length > 0) {
      this.props.markNotificationRead(unreadNotificationsId);
    }
  };
  render() {
    const { notifications } = this.props;
    const anchorEl = this.state.anchorEl;
    dayjs.extend(relativeTime);

    let notificationsIcon;
    let notificationMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="primary"
                variant="body1"
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You dont have a notificatios
        </MenuItem>
      );

    if (notifications && notifications.length > 0) {
      let readNot = notifications.filter((not) => {
        return not.read === false;
      });
      notificationsIcon =
        readNot.length > 0 ? (
          <Badge badgeContent={readNot.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        ) : (
          <NotificationsIcon />
        );
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationRead: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationRead })(
  Notifications
);
