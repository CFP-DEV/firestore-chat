import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fire } from '../../config/firebase';

class Home extends Component {
  render () {
    const { user } = this.props;

    return (
      <div className="home">
        Home
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    user: auth.user,
  }
}

export default connect(mapStateToProps)(Home);