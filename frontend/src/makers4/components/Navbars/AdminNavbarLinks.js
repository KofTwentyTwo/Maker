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


const useStyles = makeStyles(styles);

export default function HeaderLinks(props)
{
   const [openNotification, setOpenNotification] = React.useState(null);
   const [openProfile, setOpenProfile]           = React.useState(null);
   const classes                                 = useStyles();
   const {rtlActive, auth}                       = props;
   const dropdownItem                            = classNames(classes.dropdownItem, classes.primaryHover, {[classes.dropdownItemRTL]: rtlActive});
   const wrapper                                 = classNames({[classes.wrapperRTL]: rtlActive});
   const managerClasses                          = classNames({[classes.managerClasses]: true});

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


   const searchButton =
               classes.top +
               " " +
               classes.searchButton +
               " " +
               classNames({
                  [classes.searchRTL]: rtlActive
               });


   return (
         <div className={wrapper}>
            <CustomInput
                  rtlActive={rtlActive}
                  formControlProps={{
                     className: classes.top + " " + classes.search
                  }}
                  inputProps={{
                     placeholder: rtlActive ? "بحث" : "Search",
                     inputProps:  {
                        "aria-label": rtlActive ? "بحث" : "Search",
                        className:    classes.searchInput
                     }
                  }}
            />
            <Button
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  className={searchButton}
            >
               <Search className={classes.headerLinksSvg + " " + classes.searchIcon}/>
            </Button>
            <Button
                  color="transparent"
                  simple
                  aria-label="Dashboard"
                  justIcon
                  className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
                  muiClasses={{
                     label: rtlActive ? classes.labelRTL : ""
                  }}
            >
               <Dashboard
                     className={
                        classes.headerLinksSvg +
                        " " +
                        (rtlActive ? classes.links + " " + classes.linksRTL : classes.links)
                     }
               />
               <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            {rtlActive ? "لوحة القيادة" : "Dashboard"}
          </span>
               </Hidden>
            </Button>
            <div className={managerClasses}>
               <Button
                     color="transparent"
                     justIcon
                     aria-label="Notifications"
                     aria-owns={openNotification ? "notification-menu-list" : null}
                     aria-haspopup="true"
                     onClick={handleClickNotification}
                     className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
                     muiClasses={{
                        label: rtlActive ? classes.labelRTL : ""
                     }}
               >
                  <Notifications
                        className={
                           classes.headerLinksSvg +
                           " " +
                           (rtlActive
                                 ? classes.links + " " + classes.linksRTL
                                 : classes.links)
                        }
                  />
                  <span className={classes.notifications}>5</span>
                  <Hidden mdUp implementation="css">
            <span
                  onClick={handleClickNotification}
                  className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
                  </Hidden>
               </Button>
               <Popper
                     open={Boolean(openNotification)}
                     anchorEl={openNotification}
                     transition
                     disablePortal
                     placement="bottom"
                     className={classNames({
                        [classes.popperClose]:      !openNotification,
                        [classes.popperResponsive]: true,
                        [classes.popperNav]:        true
                     })}
               >
                  {({TransitionProps}) => (
                        <Grow
                              {...TransitionProps}
                              id="notification-menu-list"
                              style={{transformOrigin: "0 0 0"}}
                        >
                           <Paper className={classes.dropdown}>
                              <ClickAwayListener onClickAway={handleCloseNotification}>
                                 <MenuList role="menu">
                                    <MenuItem
                                          onClick={handleCloseNotification}
                                          className={dropdownItem}
                                    >
                                       {rtlActive ? "قد فاتّبع" : "Another One"}
                                    </MenuItem>
                                 </MenuList>
                              </ClickAwayListener>
                           </Paper>
                        </Grow>
                  )}
               </Popper>
            </div>

            <div className={managerClasses}>
               <Button
                     color="transparent"
                     aria-label="Person"
                     justIcon
                     aria-owns={openProfile ? "profile-menu-list" : null}
                     aria-haspopup="true"
                     onClick={handleClickProfile}
                     className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
                     muiClasses={{
                        label: rtlActive ? classes.labelRTL : ""
                     }}
               >
                  <Person
                        className={
                           classes.headerLinksSvg +
                           " " +
                           (rtlActive
                                 ? classes.links + " " + classes.linksRTL
                                 : classes.links)
                        }
                  />
                  <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
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
                                    <MenuItem
                                          onClick={handleCloseProfile}
                                          className={dropdownItem}
                                    >
                                       {rtlActive ? "الملف الشخصي" : "Profile"}
                                    </MenuItem>
                                    <MenuItem
                                          onClick={handleCloseProfile}
                                          className={dropdownItem}
                                    >
                                       {rtlActive ? "الإعدادات" : "Settings"}
                                    </MenuItem>
                                    <Divider light/>
                                    <MenuItem
                                          onClick={handleLogOut}
                                          className={dropdownItem}
                                    >
                                       {rtlActive ? "الخروج" : "Log out"}
                                    </MenuItem>
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
   rtlActive: PropTypes.bool,
   auth:      PropTypes.object
};
