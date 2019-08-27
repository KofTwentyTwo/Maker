import withStyles               from "@material-ui/core/styles/withStyles";
import registerBG               from 'makers4/assets/img/woodworker-2-web.jpg';
import loginBG                  from 'makers4/assets/img/woodworker-2-web.jpg';
import errorBG                  from 'makers4/assets/img/woodworker-2-web.jpg';
import pagesStyle               from "assets/jss/material-dashboard-pro-react/layouts/authStyle";
import Footer                   from "makers4/components/Footer/Footer";
import AuthNavbar               from "makers4/components/Navbars/AuthNavbar";
import {PublicRoutes as routes} from "makers4/Makers4Routes";
import PropTypes                from "prop-types";
import React                    from "react";
import {
   Redirect,
   Route,
   Switch
}                               from "react-router-dom";


class Pages extends React.Component
{
   wrapper = React.createRef();


   componentDidMount()
   {
      document.body.style.overflow = "unset";

      ///////////////////////////////////////////
      // Set out Title Tag for the Application //
      ///////////////////////////////////////////
      document.title = "Makers4 - " + this.getActiveRoute(routes);
   }


   async componentDidUpdate(e)
   {
      ///////////////////////////////////////////
      // Set out Title Tag for the Application //
      ///////////////////////////////////////////
      document.title = "Makers4 - " + this.getActiveRoute(routes);
   }


   getRoutes = routes =>
   {
      ////////////////////////////////////////////////////////////////////////////////
      // Only return the routes that we care about that are part of the auth layout //
      ////////////////////////////////////////////////////////////////////////////////
      return routes.map((prop, key) =>
      {
         if (prop.collapse)
         {
            return this.getRoutes(prop.views);
         }
         if (prop.layout === "/auth")
         {
            return (<Route path={prop.layout + prop.path} component={prop.component} key={key}/>);
         }
         else
         {
            return null;
         }
      });
   };

   getBgImage = () =>
   {
      if (window.location.pathname.indexOf("/auth/signup") !== -1)
      {
         return registerBG;
      }
      else if (window.location.pathname.indexOf("/auth/login") !== -1)
      {
         return loginBG;
      }
      else
      {
         return errorBG;
      }
   };

   getActiveRoute = routes =>
   {
      let activeRoute = "Default Brand Text";

      for (let i = 0; i < routes.length; i++)
      {
         if (routes[i].collapse)
         {
            let collapseActiveRoute = this.getActiveRoute(routes[i].views);
            if (collapseActiveRoute !== activeRoute)
            {
               return collapseActiveRoute;
            }
         }
         else
         {
            if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1)
            {
               return routes[i].name;
            }
         }
      }
      return activeRoute;
   };


   render()
   {
      const {classes, ...rest} = this.props;
      return (
            <div>
               <AuthNavbar brandText={this.getActiveRoute(routes)} {...rest} />
               <div className={classes.wrapper} ref={this.wrapper}>
                  <div className={classes.fullPage} style={{backgroundImage: "url(" + this.getBgImage() + ")"}}>
                     <Switch>
                        {this.getRoutes(routes)}
                        <Redirect from="/auth" to="/auth/login"/>
                     </Switch>
                     <Footer white/>
                  </div>
               </div>
            </div>
      );
   }
}


Pages.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
