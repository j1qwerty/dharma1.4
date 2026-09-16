import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/common/ThemeToggle";
import { LanguageProvider } from "./components/common/LanguageToggle";
import Layout from "./components/common/Layout";
import { BookingProvider } from "./lib/booking";
import { FavoritesProvider } from "./lib/favorites";
import { AuthProvider } from "./lib/auth";
import RequireAdmin from "./components/common/RequireAdmin";
import { ToastProvider } from "./components/common/Toast";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PujaDetail from "./pages/PujaDetail";
import About from "./pages/About";
import Acharyas from "./pages/Acharyas";
import NotFound from "./pages/NotFound";
import "./index.css";

// Code-split the heavier, below-the-fold routes so the home route paints fast.
const BookingDate = lazy(() => import("./pages/BookingDate"));
const BookingPackage = lazy(() => import("./pages/BookingPackage"));
const BookingSankalp = lazy(() => import("./pages/BookingSankalp"));
const BookingDelivery = lazy(() => import("./pages/BookingDelivery"));
const BookingPayment = lazy(() => import("./pages/BookingPayment"));
const BookingConfirmation = lazy(() => import("./pages/BookingConfirmation"));
const Tracking = lazy(() => import("./pages/Tracking"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const Stories = lazy(() => import("./pages/Stories"));
const StoryDetail = lazy(() => import("./pages/StoryDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const Legal = lazy(() => import("./pages/Legal"));
const DecorPreview = lazy(() => import("./pages/DecorPreview"));
const Review = lazy(() => import("./pages/Review"));

function PageFallback() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
      }}
      aria-label="Loading"
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "2px solid rgba(231, 182, 49, 0.25)",
          borderTopColor: "#e7b631",
          animation: "dt-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes dt-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <FavoritesProvider>
              <BookingProvider>
                <AuthProvider>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/pujas" element={<Catalog />} />
                    <Route path="/pujas/:id" element={<PujaDetail />} />
                    <Route
                      path="/booking/:id/date"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <BookingDate />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/booking/:id/package"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <BookingPackage />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/booking/:id/sankalp"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <BookingSankalp />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/booking/:id/delivery"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <BookingDelivery />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/booking/:id/payment"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <BookingPayment />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/booking/confirmation"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <BookingConfirmation />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/booking/tracking"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Tracking />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Dashboard />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/bookings"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <MyBookings />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/stories"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Stories />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/stories/:id"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <StoryDetail />
                        </Suspense>
                      }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/acharyas" element={<Acharyas />} />
                    <Route
                      path="/auth/login"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Auth mode="login" />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/auth/register"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Auth mode="register" />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/auth/otp"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Auth mode="otp" />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/terms"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Legal type="terms" />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/privacy"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Legal type="privacy" />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/decor"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <DecorPreview />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/review"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <Review />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/admin/login"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <AdminLogin />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <RequireAdmin>
                            <Admin />
                          </RequireAdmin>
                        </Suspense>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
                </AuthProvider>
              </BookingProvider>
            </FavoritesProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
