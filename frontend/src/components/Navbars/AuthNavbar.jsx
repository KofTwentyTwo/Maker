import AppBar          from "@material-ui/core/AppBar";
import Drawer          from "@material-ui/core/Drawer";
import Hidden          from "@material-ui/core/Hidden";
import List            from "@material-ui/core/List";
import ListItem        from "@material-ui/core/ListItem";
import ListItemText    from "@material-ui/core/ListItemText";
import withStyles      from "@material-ui/core/styles/withStyles";
import Toolbar         from "@material-ui/core/Toolbar";
import Dashboard       from "@material-ui/icons/Dashboard";
import Fingerprint     from "@material-ui/icons/Fingerprint";
import Menu            from "@material-ui/icons/Menu";
import PersonAdd       from "@material-ui/icons/PersonAdd";
import cx              from "classnames";
import PropTypes       from "prop-types";
import React           from "react";
import {NavLink}       from "react-router-dom";
import authNavbarStyle from "../../assets/jss/material-dashboard-pro-react/components/authNavbarStyle.jsx";
import Button          from "../../components/CustomButtons/Button";


class AuthNavbar extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {
         open: false,
      };

      this.isLoggedIn = false;
   }


   handleDrawerToggle = () =>
   {
      this.setState({open: !this.state.open});
   };


   // verifies if routeName is the one active (in browser input)
   activeRoute(routeName)
   {
      return window.location.href.indexOf(routeName) > -1 ? true : false;
   }


   componentDidUpdate(e)
   {
      if (e.history.location.pathname !== e.location.pathname)
      {
         this.setState({open: false});
      }
   }


   render()
   {
      const {classes, color, brandText} = this.props;
      const appBarClasses               = cx({
         [" " + classes[color]]: color
      });

      var list = (
            <List className={classes.list}>
               <ListItem className={classes.listItem}>
                  <NavLink to={"/admin/projects"} className={classes.navLink}>
                     <Dashboard className={classes.listItemIcon}/>
                     <ListItemText
                           primary={"My Projects"}
                           disableTypography={true}
                           className={classes.listItemText}
                     />
                  </NavLink>
               </ListItem>

               <ListItem className={classes.listItem}>
                  <NavLink
                        to={"/auth/signup"}
                        className={cx(classes.navLink, {
                           [classes.navLinkActive]: this.activeRoute("/auth/signup")
                        })}
                  >
                     <PersonAdd className={classes.listItemIcon}/>
                     <ListItemText
                           primary={"Sign Up"}
                           disableTypography={true}
                           className={classes.listItemText}
                     />
                  </NavLink>
               </ListItem>

               <ListItem className={classes.listItem}>
                  <NavLink
                        to={"/auth/login"}
                        className={cx(classes.navLink, {
                           [classes.navLinkActive]: this.activeRoute("/auth/login")
                        })}
                  >
                     <Fingerprint className={classes.listItemIcon}/>
                     <ListItemText
                           primary={"Login"}
                           disableTypography={true}
                           className={classes.listItemText}
                     />
                  </NavLink>
               </ListItem>
            </List>
      );

      return (
            <AppBar position="static" className={classes.appBar + appBarClasses}>
               <Toolbar className={classes.container}>
                  <Hidden smDown>

                     {/*Top Left Nav Button*/}
                     <div className={classes.flex}>
                        <Button href="#" className={classes.title} color="transparent">
                           {brandText}
                        </Button>
                     </div>
                  </Hidden>

                  <Hidden mdUp>
                     <div className={classes.flex}>
                        <Button href="#" className={classes.title} color="transparent">
                           MD Pro React
                        </Button>
                     </div>
                  </Hidden>

                  <Hidden smDown>{list}</Hidden>

                  <Hidden mdUp>
                     <Button
                           className={classes.sidebarButton}
                           color="transparent"
                           justIcon
                           aria-label="open drawer"
                           onClick={this.handleDrawerToggle}
                     >
                        <Menu/>
                     </Button>
                  </Hidden>

                  <Hidden mdUp>
                     <Hidden mdUp>
                        <Drawer
                              variant="temporary"
                              anchor={"right"}
                              open={this.state.open}
                              classes={{
                                 paper: classes.drawerPaper
                              }}
                              onClose={this.handleDrawerToggle}
                              ModalProps={{
                                 keepMounted: true // Better open performance on mobile.
                              }}
                        >
                           {list}
                        </Drawer>
                     </Hidden>
                  </Hidden>

               </Toolbar>
            </AppBar>
      );
   }
}


AuthNavbar.propTypes = {
   classes:   PropTypes.object.isRequired,
   color:     PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
   brandText: PropTypes.string
};

export default withStyles(authNavbarStyle)(AuthNavbar);
