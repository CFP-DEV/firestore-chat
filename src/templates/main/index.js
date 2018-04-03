import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { authRefresh } from '../../store/actions/auth';

// Templates
import Auth from '../auth/index';
import Client from '../client/index';

// 404
import NotFound from '../../pages/not-found/index';

class Main extends Component {
  componentDidMount() {
    const { authRefresh } = this.props;

    authRefresh();
  }

  render () {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <Switch>
        <Route exact path="/404" component={NotFound} />
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Client} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    isLoading: auth.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    authRefresh,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);