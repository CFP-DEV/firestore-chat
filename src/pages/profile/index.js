import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render () {
    return (
      <section className="profile">
      
        <header className="section-header">
          <h1>Profile Page</h1>
          <p>Edit your profile informations.</p>
        </header>

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth: auth,
  }
}

export default connect(mapStateToProps)(Profile);