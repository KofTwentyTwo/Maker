import List       from "@material-ui/core/List";
import ListItem   from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";

import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";
import cx          from "classnames";
import PropTypes   from "prop-types";
import React       from "react";


function Footer({...props})
{
   const {classes, fluid, white} = props;
   var container                 = cx({
      [classes.container]:      !fluid,
      [classes.containerFluid]: fluid,
      [classes.whiteColor]:     white
   });
   var anchor                    =
             classes.a +
             cx({
                [" " + classes.whiteColor]: white
             });
   var block                     = cx({
      [classes.block]:      true,
      [classes.whiteColor]: white
   });
   return (
         <footer className={classes.footer}>
            <div className={container}>
               <div className={classes.left}>
                  <List className={classes.list}>
                     <ListItem className={classes.inlineBlock}>
                        <a href="https://www.makers4.com/" className={block}>
                           Home
                        </a>
                     </ListItem>
                     <ListItem className={classes.inlineBlock}>
                        <a href="https://www.makers4.com/about" className={block}>
                           About
                        </a>
                     </ListItem>
                     <ListItem className={classes.inlineBlock}>
                        <a href="https://www.makers4.com/demo" className={block}>
                           Demo
                        </a>
                     </ListItem>
                     <ListItem className={classes.inlineBlock}>
                        <a href="https://www.makers4.com/blog" className={block}>
                           Blog
                        </a>
                     </ListItem>
                  </List>
               </div>
               <p className={classes.right}>
                  &copy; {1900 + new Date().getYear()}{" "}
                  <a
                        href="https://www.makers4.com"
                        className={anchor}
                        target="_blank"
                        rel="noopener noreferrer"
                  >
                     Makers4
                  </a>
                  &nbsp; / Software Made With Love for Woodworkers, Cabinet Builders, Creators, and Hobbyists
               </p>
            </div>
         </footer>
   );
}


Footer.propTypes = {
   classes: PropTypes.object.isRequired,
   fluid:   PropTypes.bool,
   white:   PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
