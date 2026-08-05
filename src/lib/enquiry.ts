import { BRAND } from "@/lib/constants";

type EnquiryValues = {
  name: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  bookingCode: string;
  message: string;
};

function formatStayDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function stayNights(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

function nightLabel(count: number): string {
  return count === 1 ? "1 night" : `${count} nights`;
}

export function buildEnquiryBody(values: EnquiryValues): string {
  const name = values.name.trim();
  const contact = values.contact.trim();
  const message = values.message.trim();
  const bookingCode = values.bookingCode.trim().toUpperCase();
  const nights = stayNights(values.checkIn, values.checkOut);

  const lines = [
    `Dear ${BRAND.name} team,`,
    "",
    "I would like to enquire about availability for a stay at your luxury apartment in Phakalane.",
    "",
    "Guest details",
    `Name: ${name}`,
    `Contact: ${contact}`,
    "",
    "Requested dates",
    `Check-in: ${formatStayDate(values.checkIn)}`,
    `Check-out: ${formatStayDate(values.checkOut)}`,
    `Duration: ${nightLabel(nights)}`,
    /* Omitted entirely when the guest has no code — the enquiry reads as before. */
    ...(bookingCode ? [`Booking code: ${bookingCode}`] : []),
    "",
    "Special requests",
    message || "No special requests",
    "",
    "I look forward to hearing from you.",
    "",
    "Kind regards,",
    name,
  ];

  return lines.join("\n");
}

export function buildEnquirySubject(name: string, checkIn: string, checkOut: string): string {
  const guest = name.trim();
  const checkInShort = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${checkIn}T12:00:00`));
  const checkOutShort = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${checkOut}T12:00:00`));

  return `Stay enquiry — ${guest} — ${checkInShort} to ${checkOutShort}`;
}
