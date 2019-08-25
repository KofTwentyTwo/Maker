import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import LoginButton from "../../components/CustomButtons/LoginButton.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import OktaSignInWidget from '../../components/OKTA/OktaSignInWidget.jsx';
import { withAuth } from '@okta/okta-react';

import loginPageStyle from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const authLoginPage = withAuth(class LoginPage extends React.Component
{
   constructor(props)
   {
      super(props);
      // we use this to make the card to appear after the page has been rendered
      this.state = {
         cardAnimaton: "cardHidden",
         authenticated: null
      };

      this.onSuccess = this.onSuccess.bind(this);
      this.onError = this.onError.bind(this);
      this.checkAuthentication();
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

   onSuccess(res) {
      if (res.status === 'SUCCESS') {
         return this.props.auth.redirect({
            sessionToken: res.session.token
         });
      } else {
         // The user can be in another authentication state that requires further action.
         // For more information about these states, see:
         //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
      }
   }

   onError(err) {
      console.log('error logging in', err);
   }





   componentDidMount()
   {
      // we add a hidden class to the card and after 700 ms we delete it and the transition appears
      this.timeOutFunction = setTimeout(
            function ()
            {
               this.setState({cardAnimaton: ""});
            }.bind(this),
            350
      );
   }

   componentWillUnmount()
   {
      clearTimeout(this.timeOutFunction);
      this.timeOutFunction = null;
   }


   render()
   {
      const {classes} = this.props;
      return (
            <div className={classes.container}>
               <GridContainer justify="center">
                  <GridItem xs={12} sm={6} md={4}>
                     <form>
                        <Card login className={classes[this.state.cardAnimaton]}>
                           <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="rose">
                              <h4 className={classes.cardTitle}>Log in</h4>
                              <div className={classes.socialLine}>
                                 {[
                                    "fab fa-facebook-square",
                                    "fab fa-twitter",
                                    "fab fa-google-plus"
                                 ].map((prop, key) =>
                                 {
                                    return (
                                          <Button
                                                color="transparent"
                                                justIcon
                                                key={key}
                                                className={classes.customButtonClass}
                                          >
                                             <i className={prop}/>
                                          </Button>
                                    );
                                 })}
                              </div>
                           </CardHeader>
                           <CardBody>
                              <CustomInput
                                    labelText="First Name.."
                                    id="firstname"
                                    formControlProps={{
                                       fullWidth: true
                                    }}
                                    inputProps={{
                                       endAdornment: (
                                             <InputAdornment position="end">
                                                <Face className={classes.inputAdornmentIcon}/>
                                             </InputAdornment>
                                       )
                                    }}
                              />
                              <CustomInput
                                    labelText="Email..."
                                    id="email"
                                    formControlProps={{
                                       fullWidth: true
                                    }}
                                    inputProps={{
                                       endAdornment: (
                                             <InputAdornment position="end">
                                                <Email className={classes.inputAdornmentIcon}/>
                                             </InputAdornment>
                                       )
                                    }}
                              />
                              <CustomInput
                                    labelText="Password"
                                    id="password"
                                    formControlProps={{
                                       fullWidth: true
                                    }}
                                    inputProps={{
                                       endAdornment: (
                                             <InputAdornment position="end">
                                                <Icon className={classes.inputAdornmentIcon}>
                                                   lock_outline
                                                </Icon>
                                             </InputAdornment>
                                       ),
                                       type: "password",
                                       autoComplete: "off"
                                    }}
                              />
                           </CardBody>
                           <CardFooter className={classes.justifyContentCenter}>
                              <LoginButton/>
                           </CardFooter>
                        </Card>
                     </form>
                  </GridItem>
               </GridContainer>
            </div>

      );
   }
});

authLoginPage.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(authLoginPage);
