import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import TrackOrder from "./pages/TrackOrder";
import MainLayout from "./layouts/MainLayout";

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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/track-order" element={<TrackOrder />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}