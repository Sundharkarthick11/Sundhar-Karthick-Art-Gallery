import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import TrackOrder from "./pages/TrackOrder";
import MainLayout from "./layouts/MainLayout";
import AdminLogin from "./pages/AdminLogin";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import OrderPortrait from "./pages/OrderPortrait";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/order" element={<OrderPortrait />} />
          <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
          <Route path="/track-order" element={<TrackOrder />} />
          <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}