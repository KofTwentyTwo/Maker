import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Heading from "components/Heading/Heading.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButtons/Button.jsx";
import cardImagesStyles from "assets/jss/material-dashboard-pro-react/cardImagesStyles.jsx";
import {events} from "variables/general.jsx";


const API = 'http://localhost:8081/api/projects/';
const DEFAULT_QUERY = '';

class Mproject extends React.Component
{


   constructor(props)
   {
      super(props);
      this.state = {
         events  : events,
         alert   : null,
         projects: []
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
         .then(data =>
         {
            return this.setState({
                  projects: data._embedded.projects
               }
            );
         });
   }

   createProjectCardsFull = (classes) =>
   {
      let cards = [];

      this.state.projects.forEach(function (project)
      {
         cards.push(
            <GridItem justify="center" xs={6} sm={3}>
               <Card key={project.id} style={{width: "20rem"}}>
                  <img
                     className={classes.cardImgTop}
                     data-src="holder.js/100px180/"
                     alt="100%x180"
                     style={{height: "180px", width: "100%", display: "block"}}
                     src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163df23d717%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163df23d717%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22119.0859375%22%20y%3D%2297.35%22%3E320x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                     data-holder-rendered="true"
                  />
                  <CardBody>
                     <h4> {project.name} </h4>
                     <p>
                        {project.description}
                     </p>
                     <Button color="primary">Open Project</Button>
                  </CardBody>
               </Card>
            </GridItem>
         )
      });

      return (cards)
   }

   render()
   {
      const {classes} = this.props;

      return <div>
         <Heading
            textAlign="center"
            title="Makers 4 - Projects"
            category={
               <span> A listing of all of the projects currently known by the backend... </span>
            }
         />
         {this.state.alert}
         <GridContainer justify="center">
            {this.createProjectCardsFull(classes)}
         </GridContainer>
      </div>;
   }
}

export default withStyles(cardImagesStyles)(Mproject);
