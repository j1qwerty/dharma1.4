import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "../components/common/Icons";
export default function NotFound() {
  return (
    <section className="site-section">
      <div className="container-x">
        <div className="panel p-16 text-center">
          <div className="font-display text-7xl">404</div>
          <h1 className="display mt-4 text-5xl">That page is not here.</h1>
          <p className="mt-3 text-sm text-muted">Return to the puja journey.</p>
          <Link to="/" className="btn-gold mt-7">
            Return home <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
