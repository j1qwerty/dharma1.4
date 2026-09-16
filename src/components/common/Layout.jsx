import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import AnnouncementBar from "./AnnouncementBar";
import PreviewBanner from "./PreviewBanner";
import { ScrollProgress } from "./Motion";
import PageTransition from "./PageTransition";
export default function Layout() {
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
      <Footer />
    </>
  );
}
