import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Pages
import AuthLogin from '../../pages/auth-login/index';
import AuthRegister from '../../pages/auth-register/index';

class Auth extends Component {
  renderMenu = () => {
    if (this.props.location.pathname === '/auth/register') {
      return (
        <div className="auth-menu">
          <span>
            Already have an account?
          </span>
          <Link to="/auth/login" className="btn btn--reset btn--outline-primary">
            SIGN IN
          </Link>
        </div>
      );
    }

    return (
      <div className="auth-menu">
        <span>
          Don't have an account?
        </span>
        <Link to="/auth/register" className="btn btn--reset btn--outline-primary">
          SIGN UP
        </Link>
      </div>
    );
  }

  render () {
    const { shouldRedirect } = this.props;

    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="auth">

        { this.renderMenu() }

        <div className="wrapper">
          <Switch>
            <Route exact path="/auth/register" component={AuthRegister} />
            <Route exact path="/auth/login" component={AuthLogin} />
            <Redirect to="/404" />
          </Switch>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    shouldRedirect: auth.user ? true : false,
  }
}

export default connect(mapStateToProps)(Auth);