import withStyles       from "@material-ui/core/styles/withStyles";
import {withAuth}       from '@okta/okta-react';
import appStyle         from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";
import cx               from "classnames";
import FixedPlugin      from "components/FixedPlugin/FixedPlugin.jsx";
import Footer           from "components/Footer/Footer.jsx";
import AdminNavbar      from "components/Navbars/AdminNavbar.jsx";
import Sidebar          from "components/Sidebar/Sidebar.jsx";
import routes           from "makers4/routes.js";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import PropTypes        from "prop-types";
import React            from "react";
import {
   Redirect,
   Route,
   Switch
}                       from "react-router-dom";


var ps;

const authDashboard = withAuth(class Dashboard extends React.Component
{
   mainPanel = React.createRef();


   constructor(props)
   {
      super(props);
      this.state = {
         mobileOpen:   false,
         miniActive:   false,
         image:        require("assets/img/woodworker-web.jpg"),
         color:        "blue",
         bgColor:      "black",
         hasImage:     true,
         fixedClasses: "dropdown",
         logo:         require("assets/img/logo-white.svg"),
         username:     null
      };

      this.checkAuthentication = this.checkAuthentication.bind(this);
   }


   async checkAuthentication()
   {
      //////////////////////////////////////////////////////////////////////////////////////
      // Handle the basic concept of being authed and ensuring our state is aware of that //
      //////////////////////////////////////////////////////////////////////////////////////
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated)
      {
         this.setState({authenticated: true});
      }

      ///////////////////////////////////////////////////////////
      // Get and populate the user info into the current state //
      ///////////////////////////////////////////////////////////
      if (authenticated && !this.state.username)
      {
         const userinfo = await this.props.auth.getUser();
         this.setState({username: userinfo.name});
      }
   }


   async componentDidMount()
   {
      if (navigator.platform.indexOf("Win") > -1)
      {
         ps                           = new PerfectScrollbar(this.mainPanel.current, {
            suppressScrollX: true,
            suppressScrollY: false
         });
         document.body.style.overflow = "hidden";
      }

      window.addEventListener("resize", this.resizeFunction);

      //////////////////////////
      // Needed for Okta Auth //
      //////////////////////////
      this.checkAuthentication();

      ///////////////////////////////////////////
      // Set out Title Tag for the Application //
      ///////////////////////////////////////////
      document.title = "Makers4 - " + this.getActiveRoute(routes);
   }


   componentWillUnmount()
   {
      if (navigator.platform.indexOf("Win") > -1)
      {
         ps.destroy();
      }
      window.removeEventListener("resize", this.resizeFunction);
   }


   async componentDidUpdate(e)
   {
      if (e.history.location.pathname !== e.location.pathname)
      {
         this.mainPanel.current.scrollTop = 0;
         if (this.state.mobileOpen)
         {
            this.setState({mobileOpen: false});
         }
      }

      //////////////////////////
      // Needed for Okta Auth //
      //////////////////////////
      this.checkAuthentication();

      ///////////////////////////////////////////
      // Set out Title Tag for the Application //
      ///////////////////////////////////////////
      document.title = "Makers4 - " + this.getActiveRoute(routes);
   }


   handleImageClick = image =>
   {
      this.setState({image: image});
   };


   handleColorClick = color =>
   {
      this.setState({color: color});
   };


   handleBgColorClick = bgColor =>
   {
      switch (bgColor)
      {
         case "white":
            this.setState({logo: require("assets/img/logo.svg")});
            break;
         default:
            this.setState({logo: require("assets/img/logo-white.svg")});
            break;
      }
      this.setState({bgColor: bgColor});
   };


   handleFixedClick = () =>
   {
      if (this.state.fixedClasses === "dropdown")
      {
         this.setState({fixedClasses: "dropdown show"});
      }
      else
      {
         this.setState({fixedClasses: "dropdown"});
      }
   };


   handleDrawerToggle = () =>
   {
      this.setState({mobileOpen: !this.state.mobileOpen});
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


   getRoutes = routes =>
   {
      return routes.map((prop, key) =>
      {
         if (prop.collapse)
         {
            return this.getRoutes(prop.views);
         }

         if (prop.layout === "/admin")
         {
            return (
                  <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                  />
            );
         }
         else
         {
            return null;
         }
      });
   };


   sidebarMinimize = () =>
   {
      this.setState({miniActive: !this.state.miniActive});
   };


   resizeFunction = () =>
   {
      if (window.innerWidth >= 960)
      {
         this.setState({mobileOpen: false});
      }
   };


   render()
   {
      if (this.state.authenticated === null)
      {
         return null;
      }

      const {classes, ...rest} = this.props;
      const mainPanel          =
                  classes.mainPanel +
                  " " +
                  cx(
                        {
                           [classes.mainPanelSidebarMini]: this.state.miniActive,
                           [classes.mainPanelWithPerfectScrollbar]:
                                                           navigator.platform.indexOf("Win") > -1
                        }
                  );

      return (
            <div className={classes.wrapper}>
               <Sidebar username={this.state.username} routes={routes} logoText={"Makers4"} logo={this.state.logo} image={this.state.image} handleDrawerToggle={this.handleDrawerToggle} open={this.state.mobileOpen} color={this.state.color} bgColor={this.state.bgColor} miniActive={this.state.miniActive}{...rest}/>
               <div className={mainPanel} ref={this.mainPanel}>
                  <AdminNavbar sidebarMinimize={this.sidebarMinimize.bind(this)} miniActive={this.state.miniActive} brandText={this.getActiveRoute(routes)} handleDrawerToggle={this.handleDrawerToggle}{...rest}/>
                  <div className={classes.content}>
                     <div className={classes.container}>
                        <Switch>
                           {this.getRoutes(routes)}
                           <Redirect from="/admin" to="/admin/projects"/>
                           <Redirect from="/" to="/admin/projects"/>
                        </Switch>
                     </div>
                  </div>
                  <Footer fluid/>
                  <FixedPlugin handleImageClick={this.handleImageClick} handleColorClick={this.handleColorClick} handleBgColorClick={this.handleBgColorClick} handleHasImage={this.handleHasImage} color={this.state["color"]} bgColor={this.state["bgColor"]} bgImage={this.state["image"]} handleFixedClick={this.handleFixedClick} fixedClasses={this.state.fixedClasses} sidebarMinimize={this.sidebarMinimize.bind(this)} miniActive={this.state.miniActive}/>
               </div>
            </div>
      );
   }
});


authDashboard.propTypes = {
   classes: PropTypes.object.isRequired
};


export default withStyles(appStyle)(authDashboard);

