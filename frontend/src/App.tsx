
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import ResetPassword from "./pages/ResetPassword";
import EditRoom from "./pages/EditRoom";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TestPage from "./pages/TestPage";
import ThanksForFeedback from "./pages/ThanksForFeedback";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY as string);

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />

            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
            <Route
              path="/my-profile"
              element={
                <Layout>
                  <MyProfile />
                </Layout>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <Layout>
                  <EditProfile />
                </Layout>
              }
            />
            <Route
              path="/reset-password"
              element={
                <Layout>
                  <ResetPassword />
                </Layout>
              }
            />
<Route path="/payment/:bookingId" element={<Layout><Elements stripe={stripePromise}><Payment /></Elements></Layout>} />
<Route path="/thanks-for-feedback" element={<ThanksForFeedback />} />
            
            <Route 
            path="/edit-room/:roomId" 
            element={<Layout>
                        <EditRoom />
                    </Layout>} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
