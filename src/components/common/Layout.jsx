import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import AssistantBot from "./AssistantBot";
import PageAgentBot from "./PageAgentBot";
import AnnouncementBar from "./AnnouncementBar";
import PreviewBanner from "./PreviewBanner";
import { ScrollProgress } from "./Motion";
import PageTransition from "./PageTransition";
export default function Layout() {
  const loc = useLocation();
  // /admin and /staff are console surfaces: public header, no public footer.
  const isAdmin = loc.pathname.startsWith("/admin") || loc.pathname.startsWith("/staff");
  if (isAdmin) {
    return (
      <>
        <ScrollProgress />
        <PageTransition />
        <PreviewBanner />
        <AnnouncementBar />
        <Header />
        <Outlet />
      </>
    );
  }
  return (
    <>
      <ScrollProgress />
      <PageTransition />
      <PreviewBanner />
      <AnnouncementBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <WhatsApp />
      {/* Hidden per request 2026-09-17 — custom quick-links bot. Code kept in ./AssistantBot.jsx. */}
      {false && <AssistantBot />}
      <PageAgentBot />
      <Footer />
    </>
  );
}
