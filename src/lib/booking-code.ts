/**
 * Lets the rates section hand a booking code to the booking form without a
 * shared store — the form listens for this event and pre-fills its code field.
 */
export const BOOKING_CODE_EVENT = "letoile:booking-code";

/** No-op until the booking form is mounted; the `#book` hash link still works. */
export function applyBookingCode(code: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BOOKING_CODE_EVENT, { detail: code }));
}
