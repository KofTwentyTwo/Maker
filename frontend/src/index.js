import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Redirect } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";


import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";

const hist = createBrowserHistory();

const config = {
   issuer: 'https://dev-998476.okta.com/oauth2/default',
   redirect_uri: window.location.origin + '/implicit/callback',
   client_id: '0oa16rj1osLTpbWTE357',
   pkce: true,
   scopes: ["openid","profile","email"]
}

ReactDOM.render(
  <Router history={hist}>

     <Security issuer={config.issuer} client_id={config.client_id} redirect_uri={config.redirect_uri} >
        <Route path="/auth" component={AuthLayout} />
        <SecureRoute path="/admin" component={AdminLayout} />
        <Route path='/implicit/callback' component={ImplicitCallback}/>
        <Redirect from="/" to="/admin" />
     </Security>
  </Router>,
  document.getElementById("root")
);
