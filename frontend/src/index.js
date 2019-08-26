import {
   ImplicitCallback,
   SecureRoute,
   Security
}                             from '@okta/okta-react';
import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";
import {createBrowserHistory} from "history";
import AdminLayout            from "layouts/Admin.jsx";
import AuthLayout             from "layouts/Auth.jsx";
import React                  from "react";
import ReactDOM               from "react-dom";
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


ReactDOM.render(
      <Router history={hist}>
         <Security issuer={config.issuer} client_id={config.client_id} redirect_uri={config.redirect_uri} onAuthRequired={onAuthRequired}>
            <SecureRoute path="/admin" component={AdminLayout}/>
            <SecureRoute path='/' exact={true} component={AdminLayout} />
            <Route path="/auth" component={AuthLayout}/>
            <Route path='/implicit/callback' component={ImplicitCallback}/>
         </Security>
      </Router>,

      document.getElementById("root")
);
