import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Button from "./Button";

class LoginButton extends Component {
   constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
   }

   async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
         this.setState({ authenticated });
      }
   }

   componentDidUpdate() {
      this.checkAuthentication();
   }

   async login() {
      // Redirect to '/' after login
      this.props.auth.login('/');
   }

   async logout() {
      // Redirect to '/' after logout
      this.props.auth.logout('/');
   }

   render() {
      if (this.state.authenticated === null)
      {
         return null;
      }

      if(this.state.authenticated)
      {
         return(<Button color="rose" simple size="lg" block onClick={this.logout}>Logout</Button>);
      }
      else
      {
         return(<Button color="rose" simple size="lg" block onClick={this.login}>Login</Button>);
      }
   }
}

export default withAuth(LoginButton);
