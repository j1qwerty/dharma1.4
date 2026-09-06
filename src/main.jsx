import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/common/ThemeToggle";
import Layout from "./components/common/Layout";
import { BookingProvider } from "./lib/booking";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PujaDetail from "./pages/PujaDetail";
import BookingDate from "./pages/BookingDate";
import BookingPackage from "./pages/BookingPackage";
import BookingSankalp from "./pages/BookingSankalp";
import BookingDelivery from "./pages/BookingDelivery";
import BookingPayment from "./pages/BookingPayment";
import BookingConfirmation from "./pages/BookingConfirmation";
import Tracking from "./pages/Tracking";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import "./index.css";

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <BookingProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pujas" element={<Catalog />} />
              <Route path="/pujas/:id" element={<PujaDetail />} />
              <Route path="/booking/:id/date" element={<BookingDate />} />
              <Route path="/booking/:id/package" element={<BookingPackage />} />
              <Route path="/booking/:id/sankalp" element={<BookingSankalp />} />
              <Route path="/booking/:id/delivery" element={<BookingDelivery />} />
              <Route path="/booking/:id/payment" element={<BookingPayment />} />
              <Route path="/booking/confirmation" element={<BookingConfirmation />} />
              <Route path="/booking/tracking" element={<Tracking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth/login" element={<Auth mode="login" />} />
              <Route path="/auth/register" element={<Auth mode="register" />} />
              <Route path="/auth/otp" element={<Auth mode="otp" />} />
              <Route path="/terms" element={<Legal type="terms" />} />
              <Route path="/privacy" element={<Legal type="privacy" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BookingProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
