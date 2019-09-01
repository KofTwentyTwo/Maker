import Apps             from "@material-ui/icons/Apps";
import DashboardIcon    from "@material-ui/icons/Dashboard";
import GridOn           from "@material-ui/icons/GridOn";
import Image            from "@material-ui/icons/Image";
import SearchIcon       from "@material-ui/icons/Search";
import ProjectSearch    from "makers4/views/AdminPages/ProjectSearch";
import ViewSettings     from "makers4/views/AdminPages/ViewSettings";
import ViewUserProfile  from "makers4/views/AdminPages/ViewUserProfile";
import ErrorPage        from "makers4/views/AuthPages/ErrorPage";
import OktaLoginPage    from "makers4/views/AuthPages/OktaLoginPage";
import OktaRegisterPage from "makers4/views/AuthPages/OktaRegisterPage";
import Dashboard        from "views/Dashboard/Dashboard";
import ReactTables      from "views/Tables/ReactTables";


export const ApplicationRoutes = [
   {
      path:      "/projects",
      name:      "My Projects",
      icon:      DashboardIcon,
      component: Dashboard,
      sidebar:   true,
      layout:    "/admin"
   },
   {
      path:      "/search",
      name:      "Search Projects",
      icon:      SearchIcon,
      component: ProjectSearch,
      layout:    "/admin",
      sidebar:   false,
   },
   {
      path:      "/view-profile",
      name:      "View Profile",
      icon:      SearchIcon,
      component: ViewUserProfile,
      layout:    "/admin",
      sidebar:   false,
   },
   {
      path:      "/view-settings",
      name:      "View Settings",
      icon:      SearchIcon,
      component: ViewSettings,
      layout:    "/admin",
      sidebar:   false,
   },
   {
      collapse: true,
      name:     "Materials",
      sidebar:  true,
      icon:     GridOn,
      state:    "tablesCollapse",
      views:    [
         {
            path:      "/materials/sheet-goods",
            name:      "Sheet Goods",
            sidebar:   true,
            mini:      "SG",
            component: ReactTables,
            layout:    "/admin"
         },
         {
            path:      "/materials/solid-wood",
            name:      "Solid Wood",
            sidebar:   true,
            mini:      "SW",
            component: ReactTables,
            layout:    "/admin"
         },
         {
            path:      "/materials/hardware",
            name:      "Hardware and Misc",
            sidebar:   true,
            mini:      "HW",
            component: ReactTables,
            layout:    "/admin"
         }
      ]
   },
   {
      collapse: true,
      name:     "Components",
      sidebar:  true,
      icon:     Apps,
      state:    "componentsCollapse",
      views:    [
         {
            path:      "/components/hinges",
            name:      "Hinges",
            sidebar:   true,
            mini:      "H",
            component: ReactTables,
            layout:    "/admin"
         },
         {
            path:      "/components/draw-slides",
            name:      "Draw Slides",
            sidebar:   true,
            mini:      "DS",
            component: ReactTables,
            layout:    "/admin"
         }
      ]
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


