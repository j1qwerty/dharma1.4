import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
export default function WhatsApp() {
  const message = encodeURIComponent("Namaste DharmaTribe, I need help with a puja booking.");
  return (
    <a
      className="whatsapp-dt"
      href={`https://wa.me/919999999999?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with DharmaTribe on WhatsApp"
    >
      <span className="whatsapp-dot-dt">
        <WhatsappLogo size={26} weight="fill" />
      </span>
    </a>
  );
}
