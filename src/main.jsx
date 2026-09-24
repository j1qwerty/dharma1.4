import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/common/ThemeToggle";
import { LanguageProvider } from "./components/common/LanguageToggle";
import Layout from "./components/common/Layout";
import { BookingProvider } from "./lib/booking";
import { FavoritesProvider } from "./lib/favorites";
import { AuthProvider } from "./lib/auth";
import RequireAdmin from "./admin/components/RequireAdmin";
import AdminLayout from "./admin/components/AdminLayout";
import { ToastProvider } from "./components/common/Toast";
import ErrorBoundary from "./components/common/ErrorBoundary";
import BlockerNotice from "./components/common/BlockerNotice";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PujaDetail from "./pages/PujaDetail";
import About from "./pages/About";
import Acharyas from "./pages/Acharyas";
import NotFound from "./pages/NotFound";
import "./index.css";
import "./admin/admin.css";

// Code-split the heavier, below-the-fold routes so the home route paints fast.
const BookingDate = lazy(() => import("./pages/BookingDate"));
const BookingPackage = lazy(() => import("./pages/BookingPackage"));
const BookingSankalp = lazy(() => import("./pages/BookingSankalp"));
const BookingDelivery = lazy(() => import("./pages/BookingDelivery"));
const BookingPayment = lazy(() => import("./pages/BookingPayment"));
const BookingConfirmation = lazy(() => import("./pages/BookingConfirmation"));
const Tracking = lazy(() => import("./pages/Tracking"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Stories = lazy(() => import("./pages/Stories"));
const StoryDetail = lazy(() => import("./pages/StoryDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthFinish = lazy(() => import("./pages/AuthFinish"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminSettings = lazy(() => import("./admin/pages/AdminSettings"));
const Admin = lazy(() => import("./admin/pages/Admin"));
const AdminPujas = lazy(() => import("./admin/pages/AdminPujas"));
const AdminFestivals = lazy(() => import("./admin/pages/AdminFestivals"));
const AdminHomepage = lazy(() => import("./admin/pages/AdminHomepage"));
const AdminStories = lazy(() => import("./admin/pages/AdminStories"));
const AdminAcharyas = lazy(() => import("./admin/pages/AdminAcharyas"));
const AdminTestimonials = lazy(() => import("./admin/pages/AdminTestimonials"));
const AdminTrash = lazy(() => import("./admin/pages/AdminTrash"));
import { AdminBookings, AdminInquiries, AdminUsers } from "./admin/pages/AdminTables";
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
  // Signal the plain-JS boot watchdog in index.html that React mounted —
  // without this, a blocked/failed script would leave a blank page silent.
  React.useEffect(() => {
    try { window.__DT_READY = true; } catch { /* ignore */ }
  }, []);
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <BlockerNotice />
          <ToastProvider>
            <AuthProvider>
            <FavoritesProvider>
              <BookingProvider>
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
                      element={<Navigate to="/dashboard" replace />}
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
                      path="/auth/finish"
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <AuthFinish />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/addresses"
                      element={<Navigate to="/dashboard" replace />}
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
                        <RequireAdmin>
                          <AdminLayout />
                        </RequireAdmin>
                      }
                    >
                      <Route index element={<Suspense fallback={<PageFallback />}><Admin /></Suspense>} />
                      <Route path="pujas" element={<Suspense fallback={<PageFallback />}><AdminPujas /></Suspense>} />
                      <Route path="festivals" element={<Suspense fallback={<PageFallback />}><AdminFestivals /></Suspense>} />
                      <Route path="homepage" element={<Suspense fallback={<PageFallback />}><AdminHomepage /></Suspense>} />
                      <Route path="stories" element={<Suspense fallback={<PageFallback />}><AdminStories /></Suspense>} />
                      <Route path="acharyas" element={<Suspense fallback={<PageFallback />}><AdminAcharyas /></Suspense>} />
                      <Route path="testimonials" element={<Suspense fallback={<PageFallback />}><AdminTestimonials /></Suspense>} />
                      <Route path="bookings" element={<Suspense fallback={<PageFallback />}><AdminBookings /></Suspense>} />
                      <Route path="inquiries" element={<Suspense fallback={<PageFallback />}><AdminInquiries /></Suspense>} />
                      <Route path="users" element={<Suspense fallback={<PageFallback />}><AdminUsers /></Suspense>} />
                      <Route path="trash" element={<Suspense fallback={<PageFallback />}><AdminTrash /></Suspense>} />
                      <Route path="settings" element={<Suspense fallback={<PageFallback />}><AdminSettings /></Suspense>} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BookingProvider>
            </FavoritesProvider>
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
