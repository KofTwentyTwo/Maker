import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider           from "@material-ui/core/Divider";
import Grow              from "@material-ui/core/Grow";
import Hidden            from "@material-ui/core/Hidden";
import MenuItem          from "@material-ui/core/MenuItem";
import MenuList          from "@material-ui/core/MenuList";
import Paper             from "@material-ui/core/Paper";
import Popper            from "@material-ui/core/Popper";
import {makeStyles}      from "@material-ui/core/styles";
import Dashboard         from "@material-ui/icons/Dashboard";
import Notifications     from "@material-ui/icons/Notifications";
import Person            from "@material-ui/icons/Person";
import Search            from "@material-ui/icons/Search";
import styles            from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import classNames        from "classnames";
import Button            from "components/CustomButtons/Button.js";
import CustomInput       from "components/CustomInput/CustomInput.js";
import PropTypes         from "prop-types";
import React             from "react";
import {Link}            from 'react-router-dom';


const useStyles = makeStyles(styles);

export default function HeaderLinks(props)
{
   const [openNotification, setOpenNotification] = React.useState(null);
   const [openProfile, setOpenProfile]           = React.useState(null);
   const classes                                 = useStyles();
   const {auth, notifications}                   = props;
   const dropdownItem                            = classNames(classes.dropdownItem, classes.primaryHover);
   const wrapper                                 = classNames();
   const managerClasses                          = classNames({[classes.managerClasses]: true});

   const handleSearchClicked          = React.forwardRef((props, ref) => <Link innerRef={ref} to="/admin/search" {...props} />);
   const handleDashboardClicked       = React.forwardRef((props, ref) => <Link innerRef={ref} to="/admin/projects" {...props} />);
   const handleViewUserProfileClicked = React.forwardRef((props, ref) => <Link innerRef={ref} to="/admin/view-profile" {...props} />);
   const handleViewSettingsClicked    = React.forwardRef((props, ref) => <Link innerRef={ref} to="/admin/view-settings" {...props} />);

   const getNotificationCount = () =>
   {
      if (notifications && notifications.length)
      {
         return (
               <span className={classes.notifications}>{notifications.length}</span>
         );
      }
      else
      {
         return null;
      }
   }

   const getNotificationsMenu = () =>
   {
      if (notifications && notifications.length)
      {
         return (
               <Popper open={Boolean(openNotification)} anchorEl={openNotification} transition disablePortal placement="bottom" className={classNames({[classes.popperClose]: !openNotification, [classes.popperResponsive]: true, [classes.popperNav]: true})}>
                  {({TransitionProps}) => (
                        <Grow{...TransitionProps} id="notification-menu-list" style={{transformOrigin: "0 0 0"}}>
                           <Paper className={classes.dropdown}>
                              <ClickAwayListener onClickAway={handleCloseNotification}>
                                 <MenuList role="menu">
                                       {
                                          notifications.map(n => <MenuItem onClick={handleCloseNotification} className={dropdownItem}>{n.message}</MenuItem>)
                                       }
                                 </MenuList>
                              </ClickAwayListener>
                           </Paper>
                        </Grow>
                  )}
               </Popper>
         );
      }
      else
      {
         return null;
      }
   }

   const handleClickNotification = event =>
   {
      if (openNotification && openNotification.contains(event.target))
      {
         setOpenNotification(null);
      }
      else
      {
         setOpenNotification(event.currentTarget);
      }
   };

   const handleCloseNotification = () =>
   {
      setOpenNotification(null);
   };


   const handleClickProfile = event =>
   {
      if (openProfile && openProfile.contains(event.target))
      {
         setOpenProfile(null);
      }
      else
      {
         setOpenProfile(event.currentTarget);
      }
   };

   const handleCloseProfile = () =>
   {
      setOpenProfile(null);
   };

   const handleLogOut = () =>
   {
      auth.logout();
   };

   const searchButton = classes.top + " " + classes.searchButton;
   ;

   return (
         <div className={wrapper}>

            {/*////////////*/}
            {/*// Search //*/}
            {/*////////////*/}
            <CustomInput
                  formControlProps={{
                     className: classes.top + " " + classes.search
                  }}
                  inputProps={{
                     placeholder: "Search",
                     inputProps:  {
                        "aria-label": "Search",
                        className:    classes.searchInput
                     }
                  }}
            />
            <Button color="white" aria-label="edit" justIcon round className={searchButton} component={handleSearchClicked}>
               <Search className={classes.headerLinksSvg + " " + classes.searchIcon}/>
            </Button>

            {/*/////////////////////////////*/}
            {/*// Dashboard / My Projects //*/}
            {/*/////////////////////////////*/}
            <Button color="transparent" simple aria-label="Dashboard" justIcon className={classes.buttonLink} muiClasses={{label: ""}} component={handleDashboardClicked}>
               <Dashboard className={classes.headerLinksSvg + " " + classes.links}/>
               <Hidden mdUp implementation="css">
                  <span className={classes.linkText}>Dashboard</span>
               </Hidden>
            </Button>

            {/*///////////////////*/}
            {/*// Notifications //*/}
            {/*///////////////////*/}
            <div className={managerClasses}>

               <Button color="transparent" justIcon aria-label="Notifications" aria-owns={openNotification ? "notification-menu-list" : null} aria-haspopup="true" onClick={handleClickNotification} className={classes.buttonLink} muiClasses={{label: ""}}>
                  <Notifications className={classes.headerLinksSvg + " " + classes.links}/>

                  {/*//////////////////////////////////////////////////////////////*/}
                  {/*// Render out the pill count of notificaiton if we have any //*/}
                  {/*//////////////////////////////////////////////////////////////*/}
                  {getNotificationCount()}

                  <Hidden mdUp implementation="css">
                     <span onClick={handleClickNotification} className={classes.linkText}>Notification</span>
                  </Hidden>
               </Button>

               {/*////////////////////////////////////////////////////////////////*/}
               {/*// Render out the popup menu for notifications if we have any //*/}
               {/*////////////////////////////////////////////////////////////////*/}
               {getNotificationsMenu()}

            </div>

            {/*/////////////*/}
            {/*// Profile //*/}
            {/*/////////////*/}
            <div className={managerClasses}>
               <Button color="transparent" aria-label="Person" justIcon aria-owns={openProfile ? "profile-menu-list" : null} aria-haspopup="true" onClick={handleClickProfile} className={classes.buttonLink} muiClasses={{label: ""}}>
                  <Person className={classes.headerLinksSvg + " " + classes.links}/>
                  <Hidden mdUp implementation="css">
                     <span onClick={handleClickProfile} className={classes.linkText}>Profile</span>
                  </Hidden>
               </Button>
               <Popper
                     open={Boolean(openProfile)}
                     anchorEl={openProfile}
                     transition
                     disablePortal
                     placement="bottom"
                     className={classNames({
                        [classes.popperClose]:      !openProfile,
                        [classes.popperResponsive]: true,
                        [classes.popperNav]:        true
                     })}
               >
                  {({TransitionProps}) => (
                        <Grow
                              {...TransitionProps}
                              id="profile-menu-list"
                              style={{transformOrigin: "0 0 0"}}
                        >
                           <Paper className={classes.dropdown}>
                              <ClickAwayListener onClickAway={handleCloseProfile}>
                                 <MenuList role="menu">
                                    <MenuItem onClick={handleCloseProfile} className={dropdownItem} component={handleViewUserProfileClicked}>Profile</MenuItem>
                                    <MenuItem onClick={handleCloseProfile} className={dropdownItem} component={handleViewSettingsClicked}>Settings</MenuItem>
                                    <Divider light/>
                                    <MenuItem onClick={handleLogOut} className={dropdownItem}>Log out</MenuItem>
                                 </MenuList>
                              </ClickAwayListener>
                           </Paper>
                        </Grow>
                  )}
               </Popper>
            </div>
         </div>
   );
}

HeaderLinks.propTypes = {
   auth:          PropTypes.object,
   notifications: PropTypes.array
};

