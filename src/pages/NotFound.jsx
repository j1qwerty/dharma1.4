import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "../components/common/Icons";
import { LotusLine, MandalaRings, SpinDecor } from "../components/common/Decor";
export default function NotFound() {
  return (
    <section className="site-section has-decor-dt">
      <SpinDecor className="decor-dt decor-center hide-mobile" speed={0.3}>
        <MandalaRings style={{ width: 420, height: 420 }} className="soft-tone" />
      </SpinDecor>
      <LotusLine className="decor-dt decor-tl hide-mobile soft-tone" />
      <div className="container-x">
        <div className="panel p-16 text-center relative z-10">
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
