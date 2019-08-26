import AppBar           from "@material-ui/core/AppBar";
import Hidden           from "@material-ui/core/Hidden";
import withStyles       from "@material-ui/core/styles/withStyles";
import Toolbar          from "@material-ui/core/Toolbar";
import Menu             from "@material-ui/icons/Menu";
import MoreVert         from "@material-ui/icons/MoreVert";
import ViewList         from "@material-ui/icons/ViewList";
import {withAuth}       from '@okta/okta-react';
import cx               from "classnames";
import PropTypes        from "prop-types";
import React            from "react";
import adminNavbarStyle from "../../assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.jsx";
import Button           from "../../components/CustomButtons/Button.jsx";
import AdminNavbarLinks from "./AdminNavbarLinks";


const authAdminNavbar = withAuth(function AdminNavbar({...props})
{
   const {classes, color, brandText} = props;
   const appBarClasses                          = cx({
      [" " + classes[color]]: color
   });
   const sidebarMinimize                        = classes.sidebarMinimize;

   return (
         <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
               <Hidden smDown implementation="css">
                  <div className={sidebarMinimize}>
                     {
                        props.miniActive ? (
                              <Button justIcon round color="white" onClick={props.sidebarMinimize}>
                                 <ViewList className={classes.sidebarMiniIcon}/>
                              </Button>
                        ) : (
                              <Button justIcon round color="white" onClick={props.sidebarMinimize}>
                                 <MoreVert className={classes.sidebarMiniIcon}/>
                              </Button>
                        )
                     }
                  </div>
               </Hidden>
               <div className={classes.flex}>
                  <Button href="#" className={classes.title} color="transparent">
                     {brandText}
                  </Button>
               </div>
               <Hidden smDown implementation="css">
                  <AdminNavbarLinks/>
               </Hidden>
               <Hidden mdUp implementation="css">
                  <Button className={classes.appResponsive} color="transparent" justIcon aria-label="open drawer" onClick={props.handleDrawerToggle}>
                     <Menu/>
                  </Button>
               </Hidden>
            </Toolbar>
         </AppBar>
   );
});

authAdminNavbar.propTypes = {
   classes:            PropTypes.object.isRequired,
   color:              PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
   brandText:          PropTypes.string,
   miniActive:         PropTypes.bool,
   handleDrawerToggle: PropTypes.func,
   sidebarMinimize:    PropTypes.func
};

export default withStyles(adminNavbarStyle)(authAdminNavbar);

