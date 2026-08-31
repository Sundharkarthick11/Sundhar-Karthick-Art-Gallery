import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import UserAccount from "./pages/UserAccount";
import UserSignup from "./pages/UserSignup";

import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminArtworks from "./pages/AdminArtworks";

import MainLayout from "./layouts/MainLayout";
import UserLogin from "./pages/UserLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import OrderPortrait from "./pages/OrderPortrait";

import TrackOrder from "./pages/TrackOrder";
import SavedArtworks from "./pages/SavedArtworks";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================================= */}
        {/* CUSTOMER WEBSITE */}
        {/* ========================================= */}

        <Route element={<MainLayout />}>
        <Route path="/login" element={<UserLogin />} />

          <Route
            path="/"
            element={<Home />}
          />
          <Route
  path="/signup"
  element={<UserSignup />}
/>
<Route
  path="/admin/users"
  element={
    <ProtectedRoute>
      <AdminUsers />
    </ProtectedRoute>
  }
/>
          <Route
            path="/gallery"
            element={<Gallery />}
          />
          <Route
  path="/my-orders"
  element={
    <UserProtectedRoute>
      <MyOrders />
    </UserProtectedRoute>
  }
/>
         <Route
  path="/account"
  element={
    <UserProtectedRoute>
      <UserAccount />
    </UserProtectedRoute>
  }
/>
<Route
  path="/saved-artworks"
  element={
    <UserProtectedRoute>
      <SavedArtworks />
    </UserProtectedRoute>
  }
/>

          <Route
            path="/contact"
            element={<Contact />}
          />

         <Route
  path="/order"
  element={
    <UserProtectedRoute>
      <OrderPortrait />
    </UserProtectedRoute>
  }
/>

          <Route
  path="/track-order"
  element={
    <UserProtectedRoute>
      <TrackOrder />
    </UserProtectedRoute>
  }
/>

        </Route>


        {/* ========================================= */}
        {/* ADMIN LOGIN */}
        {/* No Customer Navbar */}
        {/* ========================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
        <Route
  path="/admin/artworks"
  element={
    <ProtectedRoute>
      <AdminArtworks />
    </ProtectedRoute>
  }
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>


        {/* ========================================= */}
        {/* ADMIN DASHBOARD */}
        {/* No Customer Navbar */}
        {/* ========================================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}