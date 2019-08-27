import Checkbox          from "@material-ui/core/Checkbox";
import FormControlLabel  from "@material-ui/core/FormControlLabel";
import Icon              from "@material-ui/core/Icon";
import InputAdornment    from "@material-ui/core/InputAdornment";
import withStyles        from "@material-ui/core/styles/withStyles";
import Check             from "@material-ui/icons/Check";
import Email             from "@material-ui/icons/Email";
import Face              from "@material-ui/icons/Face";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import Card              from "components/Card/Card";
import CardBody          from "components/Card/CardBody";
import Button            from "components/CustomButtons/Button";
import CustomInput       from "components/CustomInput/CustomInput";
import GridContainer     from "components/Grid/GridContainer";
import GridItem          from "components/Grid/GridItem";
import {
   CabinetBuilderIcon,
   CreatorIcon,
   WoodWorkingIcon
}                        from "makers4/components/Icons/CustomIcons";
import InfoArea          from "components/InfoArea/InfoArea";
import PropTypes         from "prop-types";
import React             from "react";


class OktaRegisterPage extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {
         loginEmail:      "",
         loginEmailState: "",
      };

      this.registerClick = this.registerClick.bind(this);
      // this.loginClick    = this.loginClick.bind(this);
      // this.typeClick     = this.typeClick.bind(this);
      // this.rangeClick    = this.rangeClick.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
   }


   registerClick()
   {
      if (this.state.registerEmailState === "")
      {
         this.setState({registerEmailState: "error"});
      }
      if (this.state.registerPasswordState === "")
      {
         this.setState({registerPasswordState: "error"});
      }
      if (this.state.registerConfirmPasswordState === "")
      {
         this.setState({registerConfirmPasswordState: "error"});
      }
      if (this.state.registerCheckboxState === "")
      {
         this.setState({registerCheckboxState: "error"});
      }
   }


   change(event, stateName, type, stateNameEqualTo, maxValue)
   {
      ///////////////////////////////////////////////////////////////////////////
      // Run through the fields we know about and run basic validation on them //
      ///////////////////////////////////////////////////////////////////////////
      switch (type)
      {
         case "email":
            if (this.verifyEmail(event.target.value))
            {
               this.setState({[stateName + "State"]: "success"});
            }
            else
            {
               this.setState({[stateName + "State"]: "error"});
            }
            break;

         default:
            break;
      }

      /////////////////////////////////////////////////////////////////////
      // Update the value of the state field to match what was passed in //
      /////////////////////////////////////////////////////////////////////
      switch (type)
      {
         case "checkbox":
            this.setState({[stateName]: event.target.checked});
            break;
         default:
            this.setState({[stateName]: event.target.value});
            break;
      }
   }


   ///////////////////////////////////////////////////////////////////
   // function that returns true if value is email, false otherwise //
   ///////////////////////////////////////////////////////////////////
   verifyEmail(value)
   {
      var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRex.test(value))
      {
         return true;
      }
      return false;
   }


   // function that verifies if a string has a given length or not
   verifyLength(value, length)
   {
      if (value.length >= length)
      {
         return true;
      }
      return false;
   }


   // function that verifies if two strings are equal
   compare(string1, string2)
   {
      if (string1 === string2)
      {
         return true;
      }
      return false;
   }


   // function that verifies if value contains only numbers
   verifyNumber(value)
   {
      var numberRex = new RegExp("^[0-9]+$");
      if (numberRex.test(value))
      {
         return true;
      }
      return false;
   }


   // verifies if value is a valid URL
   verifyUrl(value)
   {
      try
      {
         new URL(value);
         return true;
      }
      catch (_)
      {
         return false;
      }
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


                                 {/*//////////////////////*/}
                                 {/*// First Name Input //*/}
                                 {/*//////////////////////*/}
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


                                    {/*/////////////////////*/}
                                    {/*// Last Name Input //*/}
                                    {/*/////////////////////*/}
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


                                    {/*/////////////////*/}
                                    {/*// Email Input //*/}
                                    {/*/////////////////*/}
                                    <CustomInput
                                          id="loginemail"
                                          success={this.state.loginEmailState === "success"}
                                          error={this.state.loginEmailState === "error"}
                                          formControlProps={{fullWidth: true, className: classes.customFormControlClasses}}
                                          inputProps={{
                                             startAdornment: (
                                                                   <InputAdornment position="start" className={classes.inputAdornment}>
                                                                      <Email className={classes.inputAdornmentIcon}/>
                                                                   </InputAdornment>
                                                             ),
                                             placeholder:    "Email...",
                                             type:           "email",
                                             onChange:       event => this.change(event, "loginEmail", "email")
                                          }}
                                    />


                                    {/*////////////////////*/}
                                    {/*// Password Input //*/}
                                    {/*////////////////////*/}
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


                                    {/*///////////////////////////////////*/}
                                    {/*// Terms and Conditions Checkbox //*/}
                                    {/*///////////////////////////////////*/}
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


                                    {/*////////////////////////*/}
                                    {/*// Submit Form Button //*/}
                                    {/*////////////////////////*/}
                                    <div className={classes.center}>
                                       <Button round color="primary" onClick={() => this.handleSignup()}>
                                          Get Started
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


OktaRegisterPage.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(OktaRegisterPage);
