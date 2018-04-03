import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from '../../config/firebase';

class AuthLogin extends Component {
  state = {
    login: '',
    password: '',
    error: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.login || !this.state.password) {
      this.setState({
        error: <div className="alert alert--danger">All fields are required.</div>,
      });

      return;
    }

    fire.auth()
      .signInWithEmailAndPassword(this.state.login, this.state.password)
      .catch(err => {
        this.setState({
          error: <div className="alert alert--danger">{ err.message }</div>,
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  render () {
    return (
      <div className="auth-login">
          
          <header className="auth-header">
            <h2 className="auth-header__title">
              Thanks for coming back.
            </h2>
            <p className="auth-header__subtitle">
              We are updating our site daily for you.
            </p>
          </header>

          <form className="form" onSubmit={this.handleSubmit}>

            { this.state.error }

            <div className="form-group">
              <label htmlFor="login">
                Login
              </label>
              <input type="text" id="login" name="login" onChange={this.handleChange} value={this.state.login} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="d-flex justify-content-between">
                <span>Password</span>
                <Link to="/auth/password-reset" className="form__link">
                  Forgot password?
                </Link>
              </label>
              <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn--reset btn--primary">
                Log In
              </button>
            </div>
          </form>
          
      </div>
    );
  }
}

export default AuthLogin;