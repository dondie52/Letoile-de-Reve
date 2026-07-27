"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { todayISO } from "@/lib/motion";

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
  if (!values.checkIn) errors.checkIn = "Select an arrival date.";
  if (!values.checkOut) errors.checkOut = "Select a departure date.";
  if (
    values.checkIn &&
    values.checkOut &&
    values.checkOut <= values.checkIn
  ) {
    errors.checkOut = "Departure must be after arrival.";
  }
  return errors;
}

function nextDayISO(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + 1);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function readPrefill(): Partial<FormState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem("letoile-enquiry");
    if (!raw) return {};
    const data = JSON.parse(raw) as {
      arrival?: string;
      departure?: string;
    };
    return {
      checkIn: data.arrival || "",
      checkOut: data.departure || "",
    };
  } catch {
    return {};
  }
}

export function BookingFinale() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sentVia, setSentVia] = useState<"email" | "whatsapp" | null>(null);
  const minDate = useMemo(() => todayISO(), []);
  const checkOutMin = values.checkIn ? nextDayISO(values.checkIn) : minDate;

  useEffect(() => {
    const apply = () => {
      const fromPrefill = readPrefill();
      if (!fromPrefill.checkIn && !fromPrefill.checkOut) return;
      setValues((v) => ({
        ...v,
        checkIn: fromPrefill.checkIn || v.checkIn,
        checkOut: fromPrefill.checkOut || v.checkOut,
      }));
    };
    const timer = window.setTimeout(apply, 0);
    const onPrefill = () => apply();
    window.addEventListener("letoile:enquiry-prefill", onPrefill);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("letoile:enquiry-prefill", onPrefill);
    };
  }, []);

  const submit = (method: "email" | "whatsapp") => {
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
      `Arrival: ${values.checkIn}`,
      `Departure: ${values.checkOut}`,
      "",
      values.message.trim() || "(No additional note)",
    ].join("\n");

    if (method === "whatsapp") {
      const url = `https://wa.me/26771813137?text=${encodeURIComponent(
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit("whatsapp");
  };

  return (
    <section
      id="book"
      className="relative overflow-hidden bg-pine-950 py-24 sm:py-32"
      aria-labelledby="book-heading"
    >
      <div className="section-pad relative z-10 mx-auto max-w-[920px]">
        <div className="mb-10 max-w-xl text-ivory sm:mb-12">
          <h2 id="book-heading" className="heading-lg mb-4">
            Plan your stay.
          </h2>
          <p className="body-lg">
            A private enquiry for availability — we respond personally via
            WhatsApp or email.
          </p>
        </div>

        <div className="contact-line mb-8 flex flex-wrap gap-x-6 gap-y-1 text-stone">
          <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold-400">
            {BRAND.email}
          </a>
          <a href={`tel:${BRAND.phoneTel}`} className="transition hover:text-gold-400">
            {BRAND.phoneDisplay}
          </a>
        </div>

        <div className="booking-panel relative px-6 py-10 sm:px-10 sm:py-12">
          {sentVia ? (
            <div role="status" aria-live="polite">
              <div className="mb-5 flex h-11 w-11 items-center justify-center border border-pine-800/30 text-pine-800">
                <Check size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <p className="title-sm mb-3 text-ink">Enquiry opened</p>
              <p className="body-ink text-pretty">
                {sentVia === "whatsapp"
                  ? "Your WhatsApp message is ready to send. We look forward to welcoming you."
                  : "Your email draft should be open. If nothing appeared, write to us at stay@letoiledereve.com."}
              </p>
              <button
                type="button"
                className="btn btn-on-light mt-8"
                onClick={() => {
                  setSentVia(null);
                  setErrors({});
                }}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkIn" className="field-label">
                    Arrival
                  </label>
                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    min={minDate}
                    className="input-field input-date"
                    value={values.checkIn}
                    aria-invalid={!!errors.checkIn}
                    aria-describedby={errors.checkIn ? "checkin-error" : undefined}
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
                    Departure
                  </label>
                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    min={checkOutMin}
                    className="input-field input-date"
                    value={values.checkOut}
                    aria-invalid={!!errors.checkOut}
                    aria-describedby={errors.checkOut ? "checkout-error" : undefined}
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
                  Preferred contact
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

              <div>
                <label htmlFor="message" className="field-label">
                  A note about your stay
                  <span className="ml-1 font-normal text-muted">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="input-field resize-y"
                  placeholder="Guests, occasion, or anything we should know"
                  value={values.message}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, message: e.target.value }))
                  }
                />
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn btn-on-light">
                  <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                  Continue on WhatsApp
                </button>
                <button
                  type="button"
                  className="btn btn-secondary-ink"
                  onClick={() => submit("email")}
                >
                  Send by email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
