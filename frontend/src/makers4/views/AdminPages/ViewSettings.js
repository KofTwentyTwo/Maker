import {makeStyles}  from "@material-ui/core/styles";
import PermIdentity  from "@material-ui/icons/PermIdentity";
import styles        from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import Card          from "components/Card/Card.js";
import CardHeader    from "components/Card/CardHeader.js";
import CardIcon      from "components/Card/CardIcon.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem      from "components/Grid/GridItem.js";
import React         from "react";


const useStyles = makeStyles(styles);

export default function ViewSettings()
{
   const classes = useStyles();
   return (
         <div>
            <GridContainer>
               <GridItem xs={12} sm={12} md={8}>
                  <Card>
                     <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                           <PermIdentity/>
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>
                           View Settings - <small>Complete your profile</small>
                        </h4>
                     </CardHeader>
                  </Card>
               </GridItem>
            </GridContainer>
         </div>
   );
}
