import {
   ImplicitCallback,
   SecureRoute,
   Security
}                             from '@okta/okta-react';
import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";
import {createBrowserHistory} from "history";
import ApplicationHandler     from "makers4/handlers/ApplicationHandler";
import PublicPageHandler      from "makers4/handlers/PublicPageHandler";
import React                  from "react";
import {
   Route,
   Router
}                             from "react-router-dom";


const hist = createBrowserHistory();

const config =
            {
               issuer:       'https://dev-998476.okta.com/oauth2/default',
               redirect_uri: window.location.origin + '/implicit/callback',
               client_id:    '0oa16rj1osLTpbWTE357'
            }


function onAuthRequired({auth, history})
{
   history.push('/auth/login');
}


function Makers4App()
{
   return (
         <Router history={hist}>
            <Security issuer={config.issuer} client_id={config.client_id} redirect_uri={config.redirect_uri} onAuthRequired={onAuthRequired}>
               <SecureRoute path="/admin" component={ApplicationHandler}/>
               <SecureRoute path="/" exact={true} component={ApplicationHandler}/>
               <Route path="/auth" component={PublicPageHandler}/>
               <Route path="/implicit/callback" component={ImplicitCallback}/>
            </Security>
         </Router>
   );
}


export default Makers4App;
