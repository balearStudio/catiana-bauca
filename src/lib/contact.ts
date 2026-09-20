// The clinic's real contact points, in one place. Copy lives in
// src/content/<lang>/*.json; these are the machine-readable targets behind it.
export const PHONE_TEL = "+34871025168";

// The design shipped a WhatsApp CTA on this number. 871 is a Balearic landline
// and nothing in the research says the clinic uses WhatsApp, so the secondary
// action is directions instead. See DESIGN.md "[CONFIRM] — carried into the
// build", item 1: if the clinic confirms WhatsApp, point the secondary CTA at
// `https://wa.me/34871025168` and change the label in both home.json files.
export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(
    "Clínica Dental Catiana Bauçà, Av. Gran Via de Colom 15, 07300 Inca",
  );
