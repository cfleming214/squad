import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnLogin = this.handleOnLogin.bind(this);
  }

  handleKeyPress(e){
      if(e.key === 'Enter') {
        this.handleOnLogin();
      }
    }

  handleOnLogin() {
        this.refs.username.value = '';
        this.refs.password.value = '';
        this.props.userVerify();
    }

  render() {
    return (
      <div id='auth'>
        <img className='logo' src={ require('./../assets/logo.png') } />
        <h2></h2>
        <h5 id='message'>{this.props.message}</h5>
        <h4>Log in!</h4>
          <input
            className='username'
            type='text'
            placeholder='username'
            ref="username"
            onKeyPress={this.handleKeyPress}
            value={this.props.username}
            onChange={ (e) => {this.props.usernameChange(e)}}>
          </input>
          <input
            className='password'
            type='password'
            placeholder='Password'
            ref="password"
            onKeyPress={this.handleKeyPress}
            value={this.props.password}
            onChange={ (e) => {this.props.passwordChange(e)}}>
          </input>
          <button onClick={ () => {this.props.userVerify()}} >Log in</button>
        <p>New User? <a onClick={this.props.newRegistration}>Sign up here.</a></p>
      </div>
    )
  }
}

export default Login;