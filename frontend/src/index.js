import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router} from "react-router-dom";
import {ImplicitCallback, SecureRoute, Security} from '@okta/okta-react';
import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";
import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";

const history = createBrowserHistory();

const config =
      {
         issuer: 'https://dev-998476.okta.com/oauth2/default',
         redirect_uri: window.location.origin + '/implicit/callback',
         client_id: '0oa16rj1osLTpbWTE357'
      }

function onAuthRequired({auth, history})
{
   history.push('/auth/login');
}

ReactDOM.render(
      <Router history={history}>

         <Security issuer={config.issuer} client_id={config.client_id} redirect_uri={config.redirect_uri}
                   onAuthRequired={onAuthRequired}>
            <SecureRoute path="/admin" component={AdminLayout}/>
            <Route path="/auth" component={AuthLayout}/>
            <Route path='/implicit/callback' component={ImplicitCallback}/>
            <Redirect from="/" to="/admin/projects"/>
         </Security>
      </Router>,

      document.getElementById("root")
);
