import Collapse         from "@material-ui/core/Collapse";
import Drawer           from "@material-ui/core/Drawer";
import Hidden           from "@material-ui/core/Hidden";
import Icon             from "@material-ui/core/Icon";
import List             from "@material-ui/core/List";
import ListItem         from "@material-ui/core/ListItem";
import ListItemText     from "@material-ui/core/ListItemText";
import withStyles       from "@material-ui/core/styles/withStyles";
import {withAuth}       from '@okta/okta-react';
import cx               from "classnames";
import PerfectScrollbar from "perfect-scrollbar";
import PropTypes        from "prop-types";
import React            from "react";
import {NavLink}        from "react-router-dom";
import avatar           from "../../assets/img/faces/user.png";
import sidebarStyle     from "../../assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";
import AdminNavbarLinks from "../../components/Navbars/AdminNavbarLinks.jsx";


var ps;


const authSidebar = withAuth(class Sidebar extends React.Component
{
   mainPanel = React.createRef();


   constructor(props)
   {
      super(props);
      this.state = {
         openAvatar: false,
         miniActive: true,
         ...this.getCollapseStates(props.routes)
      };
   }


   getCollapseStates = routes =>
   {
      let initialState = {};
      routes.map(prop =>
      {
         if (prop.collapse)
         {
            initialState = {
               [prop.state]: this.getCollapseInitialState(prop.views),
               ...this.getCollapseStates(prop.views),
               ...initialState
            };
         }
         return null;
      });

      return initialState;
   };


   // this verifies if any of the collapses should be default opened on a rerender of this component
   // for example, on the refresh of the page,
   // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
   getCollapseInitialState(routes)
   {
      for (let i = 0; i < routes.length; i++)
      {
         if (routes[i].collapse && this.getCollapseInitialState(routes[i].views))
         {
            return true;
         }
         else if (window.location.href.indexOf(routes[i].path) !== -1)
         {
            return true;
         }
      }
      return false;
   }


   // verifies if routeName is the one active (in browser input)
   activeRoute = routeName =>
   {
      return window.location.href.indexOf(routeName) > -1 ? "active" : "";
   };


   openCollapse(collapse)
   {
      var st       = {};
      st[collapse] = !this.state[collapse];

      this.setState(st);
   }


   // this function creates the links and collapses that appear in the sidebar (left menu)
   createLinks = routes =>
   {
      const {classes, color} = this.props;
      return routes.map((prop, key) =>
      {
         if (prop.redirect)
         {
            return null;
         }
         if (prop.collapse)
         {
            var st            = {};
            st[prop["state"]] = !this.state[prop.state];

            const navLinkClasses =
                        classes.itemLink +
                        " " +
                        cx({
                           [" " + classes.collapseActive]: this.getCollapseInitialState(
                                 prop.views
                           )
                        });

            const itemText =
                        classes.itemText +
                        " " +
                        cx({
                           [classes.itemTextMini]:
                           this.props.miniActive && this.state.miniActive
                        });

            const collapseItemText =
                        classes.collapseItemText +
                        " " +
                        cx({
                           [classes.collapseItemTextMini]:
                           this.props.miniActive && this.state.miniActive
                        });

            const itemIcon         = classes.itemIcon;
            const caret            = classes.caret;
            const collapseItemMini = classes.collapseItemMini;

            return (
                  <ListItem
                        key={key}
                        className={cx(
                              {[classes.item]: prop.icon !== undefined},
                              {[classes.collapseItem]: prop.icon === undefined}
                        )}
                  >
                     <NavLink
                           to={"#"}
                           className={navLinkClasses}
                           onClick={e =>
                           {
                              e.preventDefault();
                              this.setState(st);
                           }}
                     >
                        {prop.icon !== undefined ? (
                              typeof prop.icon === "string" ? (
                                    <Icon className={itemIcon}>{prop.icon}</Icon>
                              ) : (
                                    <prop.icon className={itemIcon}/>
                              )
                        ) : (
                              <span className={collapseItemMini}>{prop.mini}</span>
                        )}

                        <ListItemText
                              primary={prop.name}
                              secondary={
                                 <b
                                       className={
                                          caret +
                                          " " +
                                          (this.state[prop.state] ? classes.caretActive : "")
                                       }
                                 />
                              }
                              disableTypography={true}
                              className={cx(
                                    {[itemText]: prop.icon !== undefined},
                                    {[collapseItemText]: prop.icon === undefined}
                              )}
                        />

                     </NavLink>

                     <Collapse in={this.state[prop.state]} unmountOnExit>
                        <List className={classes.list + " " + classes.collapseList}>
                           {this.createLinks(prop.views)}
                        </List>
                     </Collapse>

                  </ListItem>
            );
         }
         const innerNavLinkClasses =
                     classes.collapseItemLink +
                     " " +
                     cx({
                        [" " + classes[color]]: this.activeRoute(prop.path)
                     });

         const collapseItemMini    = classes.collapseItemMini;
         const navLinkClasses      = classes.itemLink;
         const itemIcon            = classes.itemIcon;

         const itemText            =
                     classes.itemText +
                     " " +
                     cx({
                        [classes.itemTextMini]:
                        this.props.miniActive && this.state.miniActive
                     });
         const collapseItemText    =
                     classes.collapseItemText +
                     " " +
                     cx({
                        [classes.collapseItemTextMini]:
                        this.props.miniActive && this.state.miniActive
                     });
         return (
               <ListItem
                     key={key}
                     className={cx(
                           {[classes.item]: prop.icon !== undefined},
                           {[classes.collapseItem]: prop.icon === undefined}
                     )}
               >
                  <NavLink
                        to={prop.layout + prop.path}
                        className={cx(
                              {[navLinkClasses]: prop.icon !== undefined},
                              {[innerNavLinkClasses]: prop.icon === undefined}
                        )}
                  >
                     {prop.icon !== undefined ? (
                           typeof prop.icon === "string" ? (
                                 <Icon className={itemIcon}>{prop.icon}</Icon>
                           ) : (
                                 <prop.icon className={itemIcon}/>
                           )
                     ) : (
                           <span className={collapseItemMini}>
                {prop.mini}
              </span>
                     )}
                     <ListItemText
                           primary={prop.name}
                           disableTypography={true}
                           className={cx(
                                 {[itemText]: prop.icon !== undefined},
                                 {[collapseItemText]: prop.icon === undefined}
                           )}
                     />
                  </NavLink>
               </ListItem>
         );
      });
   };


   render()
   {
      const {
               classes,
               logo,
               image,
               logoText,
               routes,
               bgColor,
               username,
            }                = this.props;

      const itemText         =
                  classes.itemText +
                  " " +
                  cx({
                     [classes.itemTextMini]: this.props.miniActive && this.state.miniActive
                  });

      const collapseItemText =
                  classes.collapseItemText +
                  " " +
                  cx({
                     [classes.collapseItemTextMini]:
                     this.props.miniActive && this.state.miniActive
                  });

      const userWrapperClass =
                  classes.user +
                  " " +
                  cx({
                     [classes.whiteAfter]: bgColor === "white"
                  });

      const caret            = classes.caret;
      const collapseItemMini = classes.collapseItemMini;
      const photo            = classes.photo;

      var user               = (
            <div className={userWrapperClass}>

               {/*Pull out the concept of an avatar for now - since we have no ability to pull one from */}
               {/*Okta - and we dont want to get into the pain of upload for one for beta */}
               {/* TODO: Pull in the concept for an Avatar again here at some point */}
               <div className={photo}>
                  <img src={avatar} className={classes.avatarImg} alt="..."/>
               </div>

               <List className={classes.list}>
                  <ListItem className={classes.item + " " + classes.userItem}>
                     <NavLink
                           to={"#"}
                           className={classes.itemLink + " " + classes.userCollapseButton}
                           onClick={() => this.openCollapse("openAvatar")}
                     >
                        <ListItemText
                              primary={username}
                              secondary={
                                 <b
                                       className={
                                          caret +
                                          " " +
                                          classes.userCaret +
                                          " " +
                                          (this.state.openAvatar ? classes.caretActive : "")
                                       }
                                 />
                              }
                              disableTypography={true}
                              className={itemText + " " + classes.userItemText}
                        />
                     </NavLink>
                     <Collapse in={this.state.openAvatar} unmountOnExit>
                        <List className={classes.list + " " + classes.collapseList}>
                           <ListItem className={classes.collapseItem}>
                              <NavLink
                                    to="#"
                                    className={
                                       classes.itemLink + " " + classes.userCollapseLinks
                                    }
                              >
                                 <span className={collapseItemMini}>MP</span>
                                 <ListItemText
                                       primary="My Profile"
                                       disableTypography={true}
                                       className={collapseItemText}
                                 />
                              </NavLink>
                           </ListItem>
                           <ListItem className={classes.collapseItem}>
                              <NavLink
                                    to="#"
                                    className={
                                       classes.itemLink + " " + classes.userCollapseLinks
                                    }
                              >
                                 <span className={collapseItemMini}>EP</span>
                                 <ListItemText
                                       primary="Edit Profile"
                                       disableTypography={true}
                                       className={collapseItemText}
                                 />
                              </NavLink>
                           </ListItem>
                           <ListItem className={classes.collapseItem}>
                              <NavLink
                                    to="#"
                                    className={
                                       classes.itemLink + " " + classes.userCollapseLinks
                                    }
                              >
                                 <span className={collapseItemMini}>S</span>
                                 <ListItemText
                                       primary="Settings"
                                       disableTypography={true}
                                       className={collapseItemText}
                                 />
                              </NavLink>
                           </ListItem>
                        </List>
                     </Collapse>
                  </ListItem>
               </List>
            </div>
      );

      var links = (
            <List className={classes.list}>{this.createLinks(routes)}</List>
      );

      const logoNormal     =
                  classes.logoNormal +
                  " " +
                  cx({
                     [classes.logoNormalSidebarMini]:
                     this.props.miniActive && this.state.miniActive
                  });

      const logoMini       = classes.logoMini ;
      const logoClasses    = classes.logo ;

      var brand            = (
            <div className={logoClasses}>
               <a
                     href="/admin/projects"
                     className={logoMini}
               >
                  <img src={logo} alt="logo" className={classes.img}/>
               </a>
               <a
                     href="/admin/projects"
                     className={logoNormal}
               >
                  {logoText}
               </a>
            </div>
      );
      const drawerPaper    =
                  classes.drawerPaper +
                  " " +
                  cx({
                     [classes.drawerPaperMini]:
                     this.props.miniActive && this.state.miniActive
                  });
      const sidebarWrapper =
                  classes.sidebarWrapper +
                  " " +
                  cx({
                     [classes.drawerPaperMini]:
                     this.props.miniActive && this.state.miniActive,
                     [classes.sidebarWrapperWithPerfectScrollbar]:
                     navigator.platform.indexOf("Win") > -1
                  });
      return (
            <div ref={this.mainPanel}>
               <Hidden mdUp implementation="css">
                  <Drawer
                        variant="temporary"
                        anchor="right"
                        open={this.props.open}
                        classes={{
                           paper: drawerPaper + " " + classes[bgColor + "Background"]
                        }}
                        onClose={this.props.handleDrawerToggle}
                        ModalProps={{
                           keepMounted: true // Better open performance on mobile.
                        }}
                  >
                     {brand}
                     <SidebarWrapper
                           className={sidebarWrapper}
                           user={user}
                           headerLinks={<AdminNavbarLinks/>}
                           links={links}
                     />
                     {image !== undefined ? (
                           <div
                                 className={classes.background}
                                 style={{backgroundImage: "url(" + image + ")"}}
                           />
                     ) : null}
                  </Drawer>
               </Hidden>
               <Hidden smDown implementation="css">
                  <Drawer
                        onMouseOver={() => this.setState({miniActive: false})}
                        onMouseOut={() => this.setState({miniActive: true})}
                        anchor="left"
                        variant="permanent"
                        open
                        classes={{
                           paper: drawerPaper + " " + classes[bgColor + "Background"]
                        }}
                  >
                     {brand}
                     <SidebarWrapper
                           className={sidebarWrapper}
                           user={user}
                           links={links}
                     />
                     {image !== undefined ? (
                           <div
                                 className={classes.background}
                                 style={{backgroundImage: "url(" + image + ")"}}
                           />
                     ) : null}
                  </Drawer>
               </Hidden>
            </div>
      );
   }
});


authSidebar.defaultProps = {
   bgColor: "blue"
};


authSidebar.propTypes = {
   classes:            PropTypes.object.isRequired,
   bgColor:            PropTypes.oneOf(["white", "black", "blue"]),
   color:              PropTypes.oneOf([
      "white",
      "red",
      "orange",
      "green",
      "blue",
      "purple",
      "rose"
   ]),
   logo:               PropTypes.string,
   username:           PropTypes.string.required,
   logoText:           PropTypes.string,
   image:              PropTypes.string,
   routes:             PropTypes.arrayOf(PropTypes.object),
   miniActive:         PropTypes.bool,
   open:               PropTypes.bool,
   handleDrawerToggle: PropTypes.func
};


class SidebarWrapper extends React.Component
{
   sidebarWrapper = React.createRef();


   componentDidMount()
   {
      if (navigator.platform.indexOf("Win") > -1)
      {
         ps = new PerfectScrollbar(this.sidebarWrapper.current, {
            suppressScrollX: true,
            suppressScrollY: false
         });
      }
   }


   componentWillUnmount()
   {
      if (navigator.platform.indexOf("Win") > -1)
      {
         ps.destroy();
      }
   }


   render()
   {
      const {className, user, headerLinks, links} = this.props;
      return (
            <div className={className} ref={this.sidebarWrapper}>
               {user}
               {headerLinks}
               {links}
            </div>
      );
   }
}


SidebarWrapper.propTypes = {
   className:   PropTypes.string,
   user:        PropTypes.object,
   headerLinks: PropTypes.object,
   links:       PropTypes.object
};

export default withStyles(sidebarStyle)(authSidebar);
