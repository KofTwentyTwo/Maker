import React from "react";
import ReactDOM from "react-dom";
import {createHashHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";

import indexRoutes from "routes/index.jsx"

import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";

const hist = createHashHistory();


ReactDOM.render(
   <Router history={hist}>
      <Switch>
         {indexRoutes.map((prop, key) =>
         {
            return <Route path={prop.path} component={prop.component} key={key}/>;
         })}
      </Switch>
   </Router>,
   document.getElementById("root")
);
