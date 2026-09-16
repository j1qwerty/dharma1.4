import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { WHATSAPP_NUMBER } from "../../lib/site";
export default function WhatsApp() {
  const { t } = useLanguage();
  const message = encodeURIComponent(t("wa.defaultMessage"));
  return (
    <a
      className="whatsapp-dt"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t("wa.label")}
      title={t("wa.label")}
    >
      <span className="whatsapp-dot-dt">
        <WhatsappLogo size={26} weight="fill" />
      </span>
    </a>
  );
}
