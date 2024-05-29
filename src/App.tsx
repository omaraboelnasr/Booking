import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./modules/AuthModule/components/Login/Login";
import ForgetPass from "./modules/AuthModule/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/AuthModule/components/ResetPass/ResetPass";
import Register from "./modules/AuthModule/components/Register/Register";
import ChangePass from "./modules/AuthModule/components/ChangePass/ChangePass";
import AuthLayout from "./modules/SharedModule/AuthLayout/AuthLayout";
import NotFound from "./modules/SharedModule/NotFound/NotFound";
import MasterLayout from "./modules/SharedModule/MasterLayout/MasterLayout";
import Dashboard from "./modules/DashboardModule/components/Dashboard/Dashboard";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";
import ProtectedRoute from "./modules/SharedModule/ProtectedRoute/ProtectedRoute";
import HomePage from "./modules/HomePage/HomePage";
import PageDetails from "./modules/PageDetails/PageDetails";
import ExploreRooms from "./modules/ExploreRooms/ExploreRooms";
import BookingList from "./modules/BookingListModule/components/BookingList/BookingList";
import FacilitiesList from "./modules/FacilitiesModule/components/FacilitiesList/FacilitiesList";
import Favs from "./modules/FavsModule/Favs";
import RoomsList from "./modules/RoomsModule/components/RoomsList/RoomsList";
import BookingProcess from "./modules/BookingProcessModule/components/BookingProcess/BookingProcess";
import BookingDone from "./modules/BookingProcessModule/components/BookingDone/BookingDone";
import AdsList from "./modules/AdsModule/components/AdsList/AdsList";
// For MUI Dark Mode
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./modules/SharedModule/Mode/Mode";
import { ToastContainer } from 'react-toastify';
function App() {
  const [theme, colorMode] = useMode();
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "change-pass", element: <ChangePass /> }
      ]
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "home", element: <HomePage /> },
        { path: "page-details", element: <PageDetails /> },
        { path: "explore-rooms", element: <ExploreRooms /> },
        { path: "favorites", element: <Favs /> },
        { path: "ads", element: <AdsList /> },
        { path: "booking-process", element: <BookingProcess /> },
        { path: "booking-done", element: <BookingDone /> },
        { path: "booking-list", element: <BookingList /> },
        { path: "facilities", element: <FacilitiesList /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "users", element: <UsersList /> }
      ]
    }
  ]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={routers} />
          <ToastContainer/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
