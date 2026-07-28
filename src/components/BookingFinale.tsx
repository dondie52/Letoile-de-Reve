"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { Check, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { todayISO } from "@/lib/motion-utils";
import { useScrollReveal } from "@/lib/useScrollReveal";

type FormState = {
  name: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  contact: "",
  checkIn: "",
  checkOut: "",
  message: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.contact.trim()) {
    errors.contact = "Please enter an email or phone number.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact) &&
    !/^[+\d\s()-]{7,}$/.test(values.contact)
  ) {
    errors.contact = "Enter a valid email or phone number.";
  }
  if (!values.checkIn) errors.checkIn = "Select a check-in date.";
  if (!values.checkOut) errors.checkOut = "Select a check-out date.";
  if (
    values.checkIn &&
    values.checkOut &&
    values.checkOut <= values.checkIn
  ) {
    errors.checkOut = "Check-out must be after check-in.";
  }
  if (!values.message.trim()) errors.message = "Please add a short message.";
  return errors;
}

function nextDayISO(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + 1);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function BookingFinale() {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [method, setMethod] = useState<"email" | "whatsapp">("whatsapp");
  const [sentVia, setSentVia] = useState<"email" | "whatsapp" | null>(null);
  const minDate = useMemo(() => todayISO(), []);
  const checkOutMin = values.checkIn ? nextDayISO(values.checkIn) : minDate;

  useScrollReveal(sectionRef);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    const body = [
      `Name: ${values.name}`,
      `Contact: ${values.contact}`,
      `Check-in: ${values.checkIn}`,
      `Check-out: ${values.checkOut}`,
      "",
      values.message,
    ].join("\n");

    if (method === "whatsapp") {
      const url = `https://wa.me/26771070488?text=${encodeURIComponent(
        `Hello, I would like to enquire about staying at L’étoile de Rêve.\n\n${body}`,
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setSentVia("whatsapp");
      return;
    }

    const mailto = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      "Enquiry - L’étoile de Rêve",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSentVia("email");
  };

  return (
    <section
      id="book"
      ref={sectionRef}
      className="relative overflow-hidden surface-deep py-24 sm:py-32"
      aria-labelledby="book-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 star-field opacity-70"
        aria-hidden="true"
      />

      <div className="section-pad relative z-10 mx-auto max-w-[1100px]">
        <div className="booking-panel relative px-6 py-12 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-2 border border-gold/15"
            aria-hidden="true"
          />

          <div className="mb-12 text-center">
            <h2
              id="book-heading"
              data-reveal
              data-reveal-group="book-intro"
              className="heading-lg mx-auto max-w-[16ch] text-ivory"
            >
              Make {BRAND.name} your next stay.
            </h2>
            <p
              data-reveal
              data-reveal-group="book-intro"
              className="body-lg mx-auto mt-5 max-w-xl text-pretty"
            >
              Share your dates and we will respond with availability for your
              dream stay.
            </p>
          </div>

          <div className="contact-line mb-10 flex flex-wrap justify-center gap-x-6 gap-y-1 text-center">
            <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold">
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phoneTel}`} className="transition hover:text-gold">
              {BRAND.phoneDisplay}
            </a>
            <a
              href={`https://${BRAND.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gold"
            >
              {BRAND.website}
            </a>
          </div>

          {sentVia ? (
            <div
              className="mx-auto max-w-lg text-center"
              role="status"
              aria-live="polite"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-gold/40 text-gold">
                <Check size={22} aria-hidden="true" />
              </div>
              <p className="title-sm mb-3 text-ivory">Enquiry opened</p>
              <p className="body-lg mx-auto text-pretty">
                {sentVia === "whatsapp"
                  ? "Your WhatsApp message is ready to send. We look forward to welcoming you."
                  : "Your email draft should be open. If nothing appeared, write to us at stay@letoiledereve.com."}
              </p>
              <button
                type="button"
                className="btn btn-secondary mt-8"
                onClick={() => {
                  setSentVia(null);
                  setErrors({});
                }}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto grid max-w-2xl gap-6"
              noValidate
            >
              <div
                className="grid grid-cols-2 gap-2 sm:mx-auto sm:inline-grid sm:w-auto"
                role="group"
                aria-label="Send via"
              >
                <button
                  type="button"
                  className={`btn w-full ${method === "whatsapp" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setMethod("whatsapp")}
                  aria-pressed={method === "whatsapp"}
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  className={`btn w-full ${method === "email" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setMethod("email")}
                  aria-pressed={method === "email"}
                >
                  Email
                </button>
              </div>

              <div>
                <label htmlFor="name" className="field-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="input-field"
                  placeholder="Your full name"
                  autoComplete="name"
                  value={values.name}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, name: e.target.value }))
                  }
                />
                {errors.name && (
                  <p id="name-error" className="field-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact" className="field-label">
                  Email or phone
                </label>
                <input
                  id="contact"
                  name="contact"
                  className="input-field"
                  placeholder="Email or phone"
                  autoComplete="email"
                  value={values.contact}
                  aria-invalid={!!errors.contact}
                  aria-describedby={errors.contact ? "contact-error" : undefined}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, contact: e.target.value }))
                  }
                />
                {errors.contact && (
                  <p id="contact-error" className="field-error" role="alert">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkIn" className="field-label">
                    Check-in
                  </label>
                  <p id="checkin-hint" className="field-hint">
                    Select check-in date
                  </p>
                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    min={minDate}
                    className="input-field input-date"
                    value={values.checkIn}
                    aria-invalid={!!errors.checkIn}
                    aria-describedby={
                      errors.checkIn
                        ? "checkin-hint checkin-error"
                        : "checkin-hint"
                    }
                    onChange={(e) => {
                      const checkIn = e.target.value;
                      setValues((v) => {
                        const checkOut =
                          v.checkOut && checkIn && v.checkOut <= checkIn
                            ? ""
                            : v.checkOut;
                        return { ...v, checkIn, checkOut };
                      });
                    }}
                  />
                  {errors.checkIn && (
                    <p id="checkin-error" className="field-error" role="alert">
                      {errors.checkIn}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="checkOut" className="field-label">
                    Check-out
                  </label>
                  <p id="checkout-hint" className="field-hint">
                    Select check-out date
                  </p>
                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    min={checkOutMin}
                    className="input-field input-date"
                    value={values.checkOut}
                    aria-invalid={!!errors.checkOut}
                    aria-describedby={
                      errors.checkOut
                        ? "checkout-hint checkout-error"
                        : "checkout-hint"
                    }
                    onChange={(e) =>
                      setValues((v) => ({ ...v, checkOut: e.target.value }))
                    }
                  />
                  {errors.checkOut && (
                    <p id="checkout-error" className="field-error" role="alert">
                      {errors.checkOut}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="input-field resize-y"
                  placeholder="Tell us about your stay"
                  value={values.message}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, message: e.target.value }))
                  }
                />
                {errors.message && (
                  <p id="message-error" className="field-error" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-2 w-full justify-self-center sm:w-auto"
              >
                {method === "email" ? "Send via email" : "Send via WhatsApp"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
