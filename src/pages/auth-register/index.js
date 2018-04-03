import React, { Component } from 'react';
import { fire, database } from '../../config/firebase';

class AuthRegister extends Component {
  state = {
    login: '',
    email: '',
    password: '',
    passwordRepeat: '',
    error: [],
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    if (!this.state.login || !this.state.email || !this.state.password || !this.state.password) {
      errors.push('All fields are required.');
    }

    if (this.state.password !== this.state.passwordRepeat) {
      errors.push('Please, confirm your password.');
    }

    if (errors.length !== 0) {
      this.setState({
        error: errors,
      });

      return;
    }

    database.collection('usernames')
      .doc(this.state.login)
      .get()
      .then(doc => {
        if (!doc.exists) {
          fire.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
              let userID = res.uid;

              database.collection('usernames')
                .doc(this.state.login)
                .set({
                  uid: userID,
                })
                .then(res => {
                  database.collection('users')
                    .doc(userID)
                    .set({
                      login: this.state.login,
                      email: this.state.email,
                    })
                    .catch(err => {
                      this.setState({
                        error: [err.message]
                      });
                    });
                })
                .catch(err => {
                  this.setState({
                    error: [err.message]
                  });
                });
            })
            .catch(err => {
              this.setState({
                error: [err.message]
              });
            })
        } else {
          this.setState({
            error: ['This username is already taken.']
          });   
        }
      })
      .catch(err => {
        this.setState({
          error: [err.message]
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
      <div className="auth-register">

        <header className="auth-header">
          <h2 className="auth-header__title">
            Join today.
          </h2>
          <p className="auth-header__subtitle">
            Manage your school stuff in easy way.
          </p>
        </header>

        <form className="form" onSubmit={this.handleSubmit}>

          { 
            this.state.error.map(err => 
              <div key={err} className="alert alert--danger">{ err }</div>
            ) 
          }

          <div className="form-group">
            <label htmlFor="login">
              Login
            </label>
            <input type="text" id="login" name="login" onChange={this.handleChange} value={this.state.login} />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              E-mail Address
            </label>
            <input type="email" id="email" name="email" onChange={this.handleChange} value={this.state.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>
            <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordRepeat">
              Confirm Password
            </label>
            <input type="password" id="passwordRepeat" name="passwordRepeat" onChange={this.handleChange} value={this.state.passwordRepeat} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn--reset btn--primary">
              Create Account
            </button>
          </div>
        </form>

      </div>
    )
  }
}


export default AuthRegister;