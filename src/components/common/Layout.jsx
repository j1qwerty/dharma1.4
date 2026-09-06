import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import { ScrollProgress } from "./Motion";
export default function Layout() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Outlet />
      </main>
      <WhatsApp />
      <Footer />
    </>
  );
}
