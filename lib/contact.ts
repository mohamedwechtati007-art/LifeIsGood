export const siteContact = {
  phoneDisplay: "(613) 716-9988",
  phoneHref: "tel:+16137169988",
  phoneRaw: "+1 613 716 9988",
  whatsappPhone: "16137169988",
  email: "info@lifeisgoodconstruction.ca",
  emailHref: "mailto:info@lifeisgoodconstruction.ca",
  serviceArea: "Orléans (Ontario)",
  mapQuery: "Orléans, ON",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28012!2d-75.5089!3d45.4608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd1b9c4b502c2c7%3A0x279ca4c68eb20192!2sOrl%C3%A9ans%2C%20ON!5e0!3m2!1sfr!2sca!4v1700000000000!5m2!1sfr!2sca",
} as const;

/** Ouvre Gmail avec destinataire, objet et corps déjà remplis */
export function buildGmailComposeUrl(options: {
  to: string;
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: options.to,
    su: options.subject,
    body: options.body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function buildWhatsAppHref(prefillMessage: string) {
  return `https://wa.me/${siteContact.whatsappPhone}?text=${encodeURIComponent(prefillMessage)}`;
}
