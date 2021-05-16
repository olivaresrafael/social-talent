import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

//Redux Stuff
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    let screams = [];
    const { loading } = this.props.data;
    screams = this.props.data.screams;
    let profileMarkup = !loading ? <Profile /> : <ProfileSkeleton />;

    let recientScreamsMarkup = !loading ? (
      screams.map((scream) => (
        <Scream
          key={scream.screamId}
          scream={scream}
          openDialog={this.props.match.params.screamId === scream.screamId}
        ></Scream>
      ))
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={3} justify="center">
        <Grid item sm={4} xs={12}>
          {profileMarkup}
        </Grid>
        <Grid item sm={6} xs={12}>
          {recientScreamsMarkup}
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
