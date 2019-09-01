import withStyles       from "@material-ui/core/styles/withStyles";
import {withAuth}       from '@okta/okta-react';
import loginPageStyle   from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import GridContainer    from "components/Grid/GridContainer";
import GridItem         from "components/Grid/GridItem";
import OktaSignInWidget from 'makers4/components/Widgets/OktaSignInWidget';
import PropTypes        from "prop-types";
import React            from "react";
import {Redirect}       from 'react-router-dom';


const authOktaLoginPage = withAuth(class OktaLoginPage extends React.Component
{
   constructor(props)
   {
      super(props);
      this.onSuccess = this.onSuccess.bind(this);
      this.onError   = this.onError.bind(this);
      this.state     =
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
         console.warn("Successful Login - But Unhandled Status Code Returned [" + res.status + "]", res);
      }
   }


   onError(err)
   {
      console.warn('Error logging in - Unsure Why', err);
   }


   render()
   {
      if (this.state.authenticated === null)
      {
         return null;
      }
      else if (this.state.authenticated)
      {
         return (<Redirect to={{pathname: '/admin/projects'}}/>);
      }
      else
      {
         const {classes} = this.props;

         // TODO: Clean up this Base URL - Get it into the core Okta config somewhere...
         return (
               <div className={classes.container}>
                  <GridContainer justify="center">
                     <GridItem xs={12} sm={6} md={4}>
                        <OktaSignInWidget baseUrl="https://dev-998476.okta.com/" onSuccess={this.onSuccess} onError={this.onError}/>
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
