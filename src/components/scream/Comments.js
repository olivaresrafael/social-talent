import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
//import styles from '../../util/theme';
//MUI stuffs
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.spreadThis,
  commentImage: {
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container>
        <hr className={classes.visibleSeparator} />
        {comments.map((comment) => {
          const { createdAt, userHandle, userImage, body } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to={`/users/${userHandle}`}
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <hr className={classes.visibleSeparator} />
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
