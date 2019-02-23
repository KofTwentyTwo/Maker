import Mproject from "views/Mproject/Mproject.jsx";
import Mmaterials from "views/Mproject/Mmaterials.jsx";

import EditUserProfile from "views/Mproject/EditUserProfile.jsx";
import ViewUserProfile from "views/Mproject/ViewUserProfile.jsx";
import EditUserSettings from "views/Mproject/EditUserSettings.jsx";

// @material-ui/icons

import {LineStyle, Assignment} from "@material-ui/icons";

var dashRoutes = [
   {path: "/projects", name: "Projects", icon: LineStyle, component: Mproject},
   {path: "/materials", name: "Materials", icon: Assignment, component: Mmaterials},
   {path: "/my-profile", name: "My Profile", icon: Assignment, component: ViewUserProfile, invisible:true},
   {path: "/edit-profile", name: "Edit Profile", icon: Assignment, component: EditUserProfile, invisible:true},
   {path: "/settings", name: "Settings", icon: Assignment, component: EditUserSettings, invisible:true},
   {redirect: true, path: "/", pathTo: "/projects", name: "Projects"}
];
export default dashRoutes;
