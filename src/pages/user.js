import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Scream from '../components/scream/Scream';
import PublicProfile from '../components/profile/PublicProfile';
import Grid from '@material-ui/core/Grid';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserPublicData } from '../redux/actions/dataActions';

export class user extends PureComponent {
  state = {
    openScreamId: '',
  };
  constructor(props) {
    super(props);
    const handle = props.match.params.handle;
    props.getUserPublicData({ userHandle: handle });
    this.state = {
      openScreamId: props.match.params.screamId,
    };
  }

  checkScreamOpen = (screamId) => {
    if (this.state.openScreamId === screamId) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { screams, loading } = this.props.data;

    let profileMarkup = !loading ? <PublicProfile /> : <ProfileSkeleton />;
    let ScreamsMarkup = !loading ? (
      !screams ? (
        <p>User not create a scream yet</p>
      ) : (
        screams.map((scream) => (
          <Scream
            key={scream.screamId}
            scream={scream}
            openDialog={this.checkScreamOpen(scream.screamId)}
          ></Scream>
        ))
      )
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={3} justify="center">
        <Grid item sm={4} xs={12}>
          {profileMarkup}
        </Grid>
        <Grid item sm={6} xs={12}>
          {ScreamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

user.propType = {
  getUserPublicData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserPublicData })(user);
