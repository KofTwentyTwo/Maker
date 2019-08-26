import Checkbox          from "@material-ui/core/Checkbox";
import FormControlLabel  from "@material-ui/core/FormControlLabel";
import Icon              from "@material-ui/core/Icon";
import InputAdornment    from "@material-ui/core/InputAdornment";
import withStyles        from "@material-ui/core/styles/withStyles";
import Check             from "@material-ui/icons/Check";
import Email             from "@material-ui/icons/Email";
import Face              from "@material-ui/icons/Face";
import PropTypes         from "prop-types";
import React             from "react";
import registerPageStyle from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import Card              from "../../components/Card/Card.jsx";
import CardBody          from "../../components/Card/CardBody.jsx";
import Button            from "../../components/CustomButtons/Button.jsx";
import CustomInput       from "../../components/CustomInput/CustomInput.jsx";
import GridContainer     from "../../components/Grid/GridContainer.jsx";
import GridItem          from "../../components/Grid/GridItem.jsx";
import {
   CabinetBuilderIcon,
   CreatorIcon,
   Makers4Icon,
   WoodWorkingIcon
} from "../../components/Icons/CustomIcons";
import InfoArea          from "../../components/InfoArea/InfoArea.jsx";


class RegisterPage extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {
         checked: []
      };

      this.handleToggle = this.handleToggle.bind(this);
   }


   handleToggle(value)
   {
      const {checked}    = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked   = [...checked];

      if (currentIndex === -1)
      {
         newChecked.push(value);
      }
      else
      {
         newChecked.splice(currentIndex, 1);
      }

      this.setState({
         checked: newChecked
      });
   }


   render()
   {
      const {classes} = this.props;
      return (
            <div className={classes.container}>
               <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
                     <Card className={classes.cardSignup}>
                        <h2 className={classes.cardTitle}>Get Started Designing and Planing Today</h2>
                        <h4 className={classes.cardTitle}>Always Free Software Made With ♡ for Woodworkers, Cabinet Builders, Creators, and Hobbyists.</h4>
                        <CardBody>
                           <GridContainer justify="center">


                              <GridItem xs={12} sm={12} md={5}>
                                 <InfoArea
                                       title="Woodworkers"
                                       description="Experimenting in woodworking software or cabinet design software is a lot less expensive than experimenting in the shop. Use Makers4 to visualize as many designs as you like without wasting a single piece of wood."
                                       icon={WoodWorkingIcon}
                                       iconColor="rose"
                                 />
                                 <InfoArea
                                       title="Cabinet Builders"
                                       description="Start with the exact cabinet template you need—not just a blank screen. Then simply stamp custom shapes for shelf units, hampers, drawers, and racks on your design. Move, delete, add, and stack units quickly and easily."
                                       icon={CabinetBuilderIcon}
                                       iconColor="primary"
                                 />
                                 <InfoArea
                                       title="Creators and Hobbyists"
                                       description="Start off with a complete set of 3D tools and 3 projects, craft, design, print, build, repeat, share, and release.   All with Makers4 - Always Free Software Made With ♡ for Woodworkers, Cabinet Builders, Creators, and Hobbyists.  "
                                       icon={CreatorIcon}
                                       iconColor="info"
                                 />
                              </GridItem>


                              <GridItem xs={12} sm={8} md={5}>
                                 <div className={classes.center}>
                                    <h4 className={classes.socialTitle}>Your New Account Details</h4>
                                 </div>

                                 <form className={classes.form}>
                                    <CustomInput
                                          formControlProps={{fullWidth: true, className: classes.customFormControlClasses}}
                                          inputProps={{
                                             startAdornment: (
                                                                   <InputAdornment position="start" className={classes.inputAdornment}>
                                                                      <Face className={classes.inputAdornmentIcon}/>
                                                                   </InputAdornment>
                                                             ),
                                             placeholder:    "First Name..."
                                          }}
                                    />
                                    <CustomInput
                                          formControlProps={{fullWidth: true, className: classes.customFormControlClasses}}
                                          inputProps={{
                                             startAdornment: (
                                                                   <InputAdornment position="start" className={classes.inputAdornment}>
                                                                      <Face className={classes.inputAdornmentIcon}/>
                                                                   </InputAdornment>
                                                             ),
                                             placeholder:    "Last Name..."
                                          }}
                                    />
                                    <CustomInput
                                          formControlProps={{fullWidth: true, className: classes.customFormControlClasses}}
                                          inputProps={{
                                             startAdornment: (
                                                                   <InputAdornment position="start" className={classes.inputAdornment}>
                                                                      <Email className={classes.inputAdornmentIcon}/>
                                                                   </InputAdornment>
                                                             ),
                                             placeholder:    "Email..."
                                          }}
                                    />
                                    <CustomInput
                                          formControlProps={{fullWidth: true, className: classes.customFormControlClasses}}
                                          inputProps={{
                                             startAdornment: (
                                                                   <InputAdornment position="start" className={classes.inputAdornment}>
                                                                      <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                                                                   </InputAdornment>
                                                             ),
                                             placeholder:    "Password..."
                                          }}
                                    />
                                    <FormControlLabel
                                          classes={{root: classes.checkboxLabelControl, label: classes.checkboxLabel}}
                                          control={
                                             <Checkbox
                                                   tabIndex={-1}
                                                   onClick={() => this.handleToggle(1)}
                                                   checkedIcon={<Check className={classes.checkedIcon}/>}
                                                   icon={<Check className={classes.uncheckedIcon}/>}
                                                   classes={{checked: classes.checked, root: classes.checkRoot}}
                                             />
                                          }
                                          label={<span>I agree to the{" "}<a target="_blank" rel="noopener noreferrer" href="https://www.makers4.com/terms">terms and conditions</a>.</span>}
                                    />

                                    <div className={classes.center}>
                                       <Button round color="primary">
                                          Get started
                                       </Button>
                                    </div>

                                 </form>


                              </GridItem>
                           </GridContainer>
                        </CardBody>
                     </Card>
                  </GridItem>
               </GridContainer>
            </div>
      );
   }
}


RegisterPage.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
