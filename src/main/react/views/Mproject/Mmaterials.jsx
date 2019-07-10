import React from "react";



import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import Heading from "components/Heading/Heading.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";


import cardImagesStyles from "assets/jss/material-dashboard-pro-react/cardImagesStyles.jsx";

import {events} from "variables/general.jsx";

const API = '/api/materials/';
const DEFAULT_QUERY = '';

class Mmaterials extends React.Component
{


   constructor(props)
   {
      super(props);
      this.state = {
         events   : events,
         alert    : null,
         materials: []
      };
      this.hideAlert = this.hideAlert.bind(this);
   }

   selectedEvent(event)
   {
      alert(event.title);
   }

   addNewEventAlert(slotInfo)
   {
      this.setState({
         alert: (
            <SweetAlert
               input
               showCancel
               style={{display: "block", marginTop: "-100px"}}
               title="Input something"
               onConfirm={e => this.addNewEvent(e, slotInfo)}
               onCancel={() => this.hideAlert()}
               confirmBtnCssClass={
                  this.props.classes.button + " " + this.props.classes.success
               }
               cancelBtnCssClass={
                  this.props.classes.button + " " + this.props.classes.danger
               }
            />
         )
      });
   }

   addNewEvent(e, slotInfo)
   {
      var newEvents = this.state.events;
      newEvents.push({
         title: e,
         start: slotInfo.start,
         end  : slotInfo.end
      });
      this.setState({
         alert : null,
         events: newEvents
      });
   }

   hideAlert()
   {
      this.setState({
         alert: null
      });
   }

   eventColors(event, start, end, isSelected)
   {
      var backgroundColor = "event-";
      event.color
         ? (backgroundColor = backgroundColor + event.color)
         : (backgroundColor = backgroundColor + "default");
      return {
         className: backgroundColor
      };
   }

   componentDidMount()
   {
      fetch(API + DEFAULT_QUERY)
         .then(response => response.json())
         .then(data => this.setState({
               materials: data._embedded.materials
            }
         ));
   }

   makeTable = (classes) =>
   {
      const buttons =
      [
         { color: "info", icon: Person },
         { color: "success", icon: Edit },
         { color: "danger", icon: Close }
      ].map((prop, key) => {
         return (
            <Button color={prop.color} customClass={classes.actionButton} key={key}>
               <prop.icon className={classes.icon} />
            </Button>
         );
      });
      return (<div>Hi There!</div> );
   }

   render()
   {
      const {classes} = this.props;

      return <div>
         <Heading
            textAlign="center"
            title="Makers 4 - Master Materials List"
            category={
               <span> A listing of all of the materials that you have currently setup for use in Makers4 Projects... </span>
            }
         />
         {this.state.alert}
         <GridContainer justify="center">
            {this.makeTable(classes)}
         </GridContainer>
      </div>;
   }
}

export default withStyles(cardImagesStyles)(Mmaterials);

