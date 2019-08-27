import Apps             from "@material-ui/icons/Apps";
import DashboardIcon    from "@material-ui/icons/Dashboard";
import DateRange        from "@material-ui/icons/DateRange";
import GridOn           from "@material-ui/icons/GridOn";
import Image            from "@material-ui/icons/Image";
import ErrorPage        from "makers4/views/Pages/ErrorPage";
import OktaLoginPage    from "makers4/views/Pages/OktaLoginPage";
import OktaRegisterPage from "makers4/views/Pages/OktaRegisterPage";
import Calendar         from "views/Calendar/Calendar";
import Buttons          from "views/Components/Buttons";
import GridSystem       from "views/Components/GridSystem";
import Icons            from "views/Components/Icons";
import Notifications    from "views/Components/Notifications";
import Panels           from "views/Components/Panels";
import SweetAlert       from "views/Components/SweetAlert";
import Typography       from "views/Components/Typography";
import Dashboard        from "views/Dashboard/Dashboard";
import ExtendedTables   from "views/Tables/ExtendedTables";
import ReactTables      from "views/Tables/ReactTables";
import RegularTables    from "views/Tables/RegularTables";


export const ApplicationRoutes = [
   {
      path:      "/projects",
      name:      "Projects",
      icon:      DashboardIcon,
      component: Dashboard,
      layout:    "/admin"
   },
   {
      collapse: true,
      name:     "Components",
      icon:     Apps,
      state:    "componentsCollapse",
      views:    [
         {
            collapse: true,
            name:     "Multi Level Collapse",
            mini:     "MC",
            state:    "multiCollapse",
            views:    [
               {
                  path:      "/buttons",
                  name:      "Buttons",
                  mini:      "B",
                  component: Buttons,
                  layout:    "/admin"
               }
            ]
         },
         {
            path:      "/buttons",
            name:      "Buttons",
            mini:      "B",
            component: Buttons,
            layout:    "/admin"
         },
         {
            path:      "/grid-system",
            name:      "Grid System",
            mini:      "GS",
            component: GridSystem,
            layout:    "/admin"
         },
         {
            path:      "/panels",
            name:      "Panels",
            mini:      "P",
            component: Panels,
            layout:    "/admin"
         },
         {
            path:      "/sweet-alert",
            name:      "Sweet Alert",
            mini:      "SA",
            component: SweetAlert,
            layout:    "/admin"
         },
         {
            path:      "/notifications",
            name:      "Notifications",
            mini:      "N",
            component: Notifications,
            layout:    "/admin"
         },
         {
            path:      "/icons",
            name:      "Icons",
            mini:      "I",
            component: Icons,
            layout:    "/admin"
         },
         {
            path:      "/typography",
            name:      "Typography",
            mini:      "T",
            component: Typography,
            layout:    "/admin"
         }
      ]
   },
   {
      collapse: true,
      name:     "Materials",

      icon:  GridOn,
      state: "tablesCollapse",
      views: [
         {
            path:      "/regular-tables",
            name:      "Regular Tables",
            mini:      "RT",
            component: RegularTables,
            layout:    "/admin"
         },
         {
            path:      "/extended-tables",
            name:      "Extended Tables",
            mini:      "ET",
            component: ExtendedTables,
            layout:    "/admin"
         },
         {
            path:      "/react-tables",
            name:      "React Tables",
            mini:      "RT",
            component: ReactTables,
            layout:    "/admin"
         }
      ]
   },
   {
      path:      "/calendar",
      name:      "Calendar",
      icon:      DateRange,
      component: Calendar,
      layout:    "/admin"
   }
];

export const PublicRoutes = [
   {
      collapse: true,
      name:     "Pages",
      icon:     Image,
      state:    "pageCollapse",
      views:    [
         {
            path:      "/login",
            name:      "Login",
            mini:      "L",
            component: OktaLoginPage,
            layout:    "/auth"
         },
         {
            path:      "/signup",
            name:      "Signup",
            mini:      "R",
            component: OktaRegisterPage,
            layout:    "/auth"
         },
         {
            path:      "/error-page",
            name:      "Error Page",
            mini:      "E",
            component: ErrorPage,
            layout:    "/auth"
         }
      ]
   }
];


