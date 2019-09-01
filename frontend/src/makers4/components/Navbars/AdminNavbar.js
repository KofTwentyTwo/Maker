import AppBar           from "@material-ui/core/AppBar";
import Hidden           from "@material-ui/core/Hidden";
import {makeStyles}     from "@material-ui/core/styles";
import Toolbar          from "@material-ui/core/Toolbar";
import Menu             from "@material-ui/icons/Menu";
import MoreVert         from "@material-ui/icons/MoreVert";
import ViewList         from "@material-ui/icons/ViewList";
import styles           from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";
import cx               from "classnames";
import Button           from "components/CustomButtons/Button.js";
import AdminNavbarLinks from "makers4/components/Navbars/AdminNavbarLinks";
import PropTypes        from "prop-types";
import React            from "react";


const useStyles = makeStyles(styles);

export default function AdminNavbar(props)
{
   const classes                                 = useStyles();
   const {color, brandText, auth, notifications} = props;

   const appBarClasses = cx({
      [" " + classes[color]]: color
   });

   const sidebarMinimize = classes.sidebarMinimize;

   return (
         <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
               <Hidden smDown implementation="css">
                  <div className={sidebarMinimize}>
                     {props.miniActive ? (
                           <Button
                                 justIcon
                                 round
                                 color="white"
                                 onClick={props.sidebarMinimize}
                           >
                              <ViewList className={classes.sidebarMiniIcon}/>
                           </Button>
                     ) : (
                           <Button
                                 justIcon
                                 round
                                 color="white"
                                 onClick={props.sidebarMinimize}
                           >
                              <MoreVert className={classes.sidebarMiniIcon}/>
                           </Button>
                     )}
                  </div>
               </Hidden>
               <div className={classes.flex}>
                  {/* Here we create navbar brand, based on route name */}
                  <Button href="#" className={classes.title} color="transparent">
                     {brandText}
                  </Button>
               </div>
               <Hidden smDown implementation="css">
                  <AdminNavbarLinks auth={auth} notifications={notifications}/>
               </Hidden>
               <Hidden mdUp implementation="css">
                  <Button
                        className={classes.appResponsive}
                        color="transparent"
                        justIcon
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                  >
                     <Menu/>
                  </Button>
               </Hidden>
            </Toolbar>
         </AppBar>
   );
}

AdminNavbar.propTypes = {
   color:              PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
   brandText:          PropTypes.string,
   miniActive:         PropTypes.bool,
   handleDrawerToggle: PropTypes.func,
   sidebarMinimize:    PropTypes.func,
   notifications:      PropTypes.array,
   auth:               PropTypes.object
};
