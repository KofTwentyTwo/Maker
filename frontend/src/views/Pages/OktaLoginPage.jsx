import React from "react";
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import OktaSignInWidget from '../../components/OKTA/OktaSignInWidget.jsx';
import {withAuth} from '@okta/okta-react';
import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const authOktaLoginPage = withAuth(class OktaLoginPage extends React.Component
{
   constructor(props)
   {
      super(props);
      this.onSuccess = this.onSuccess.bind(this);
      this.onError = this.onError.bind(this);
      this.state =
            {
               authenticated: null
            };

      this.checkAuthentication();
   }

   async checkAuthentication()
   {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated)
      {
         this.setState({authenticated});
      }
   }

   componentDidUpdate()
   {
      this.checkAuthentication();
   }

   onSuccess(res)
   {
      if (res.status === 'SUCCESS')
      {
         return this.props.auth.redirect({sessionToken: res.session.token});
      }
      else
      {
         alert("onSuccess - Error logging in - something has happened - we dont know what...");
         // The user can be in another authentication state that requires further action.
         // For more information about these states, see:
         //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
      }
   }

   onError(err)
   {
      console.log('error logging in', err);
      alert("onError - Error logging in - something has happened - we dont know what...");
   }

   render()
   {
      if (this.state.authenticated === null)
      {
         return null;
      }
      if (this.state.authenticated)
      {
         return (
               <Redirect to={{pathname: '/admin/projects'}}/>
         );
      }
      else
      {
         const {classes} = this.props;
         return (
               <div className={classes.container}>
                  <GridContainer justify="center">
                     <GridItem xs={12} sm={6} md={4}>
                        <OktaSignInWidget baseUrl="https://dev-998476.okta.com/" onSuccess={this.onSuccess}
                                          onError={this.onError}/>
                     </GridItem>
                  </GridContainer>
               </div>
         );
      }
   }
});

authOktaLoginPage.propTypes =
      {
         classes: PropTypes.object.isRequired
      };

export default withStyles(loginPageStyle)(authOktaLoginPage);
