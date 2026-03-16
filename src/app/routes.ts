import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { PatientRegistration } from "./pages/PatientRegistration";
import { ReceptionLogin } from "./pages/ReceptionLogin";
import { ReceptionDashboard } from "./pages/ReceptionDashboard";
import { PatientDetails } from "./pages/PatientDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/patient-registration",
    Component: PatientRegistration,
  },
  {
    path: "/reception-login",
    Component: ReceptionLogin,
  },
  {
    path: "/reception-dashboard",
    Component: ReceptionDashboard,
  },
  {
    path: "/patient/:id",
    Component: PatientDetails,
  },
]);
