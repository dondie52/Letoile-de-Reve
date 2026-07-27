"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

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
    values.checkOut < values.checkIn
  ) {
    errors.checkOut = "Check-out must be after check-in.";
  }
  if (!values.message.trim()) errors.message = "Please add a short message.";
  return errors;
}

export function BookingFinale() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [method, setMethod] = useState<"email" | "whatsapp">("email");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = [
      `Name: ${values.name}`,
      `Contact: ${values.contact}`,
      `Check-in: ${values.checkIn}`,
      `Check-out: ${values.checkOut}`,
      "",
      values.message,
    ].join("\n");

    if (method === "whatsapp") {
      const url = `https://wa.me/26771813137?text=${encodeURIComponent(
        `Hello, I would like to enquire about staying at L’étoile de Rêve.\n\n${body}`,
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    const mailto = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      "Enquiry — L’étoile de Rêve",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section
      id="book"
      className="relative overflow-hidden bg-forest py-24 sm:py-32"
      aria-labelledby="book-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 star-field opacity-70"
        aria-hidden="true"
      />

      <div className="section-pad relative z-10 mx-auto max-w-[1100px]">
        <div className="relative border border-gold/35 px-6 py-12 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-2 border border-gold/15"
            aria-hidden="true"
          />

          <div className="mb-12 text-center">
            <p className="eyebrow mb-5">Your dream stay is almost here</p>
            <h2 id="book-heading" className="heading-lg mx-auto max-w-[16ch] text-ivory">
              Make {BRAND.name} your next stay.
            </h2>
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${BRAND.email}`} className="btn btn-primary">
              Enquire now
            </a>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-center text-sm tracking-wide text-stone">
            <a href={`mailto:${BRAND.email}`} className="hover:text-gold">
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phoneTel}`} className="hover:text-gold">
              {BRAND.phoneDisplay}
            </a>
            <a
              href={`https://${BRAND.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              {BRAND.website}
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="mx-auto grid max-w-2xl gap-6"
            noValidate
          >
            <p className="text-center text-sm text-stone">
              Submit opens a prefilled email or WhatsApp message—no account
              required.
            </p>

            <div className="flex justify-center gap-2" role="group" aria-label="Send via">
              <button
                type="button"
                className={`btn ${method === "email" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setMethod("email")}
                aria-pressed={method === "email"}
              >
                Email
              </button>
              <button
                type="button"
                className={`btn ${method === "whatsapp" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setMethod("whatsapp")}
                aria-pressed={method === "whatsapp"}
              >
                WhatsApp
              </button>
            </div>

            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="input-field"
                placeholder="Name"
                autoComplete="name"
                value={values.name}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                onChange={(e) =>
                  setValues((v) => ({ ...v, name: e.target.value }))
                }
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-[#c45c4a]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact" className="sr-only">
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
                <p id="contact-error" className="mt-2 text-sm text-[#c45c4a]">
                  {errors.contact}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="checkIn" className="mb-2 block text-xs uppercase tracking-[0.18em] text-stone">
                  Check-in
                </label>
                <input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  className="input-field"
                  value={values.checkIn}
                  aria-invalid={!!errors.checkIn}
                  aria-describedby={errors.checkIn ? "checkin-error" : undefined}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, checkIn: e.target.value }))
                  }
                />
                {errors.checkIn && (
                  <p id="checkin-error" className="mt-2 text-sm text-[#c45c4a]">
                    {errors.checkIn}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="checkOut" className="mb-2 block text-xs uppercase tracking-[0.18em] text-stone">
                  Check-out
                </label>
                <input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  className="input-field"
                  value={values.checkOut}
                  aria-invalid={!!errors.checkOut}
                  aria-describedby={errors.checkOut ? "checkout-error" : undefined}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, checkOut: e.target.value }))
                  }
                />
                {errors.checkOut && (
                  <p id="checkout-error" className="mt-2 text-sm text-[#c45c4a]">
                    {errors.checkOut}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="input-field resize-y"
                placeholder="Message"
                value={values.message}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                onChange={(e) =>
                  setValues((v) => ({ ...v, message: e.target.value }))
                }
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-[#c45c4a]">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary mt-2 justify-self-center">
              {method === "email" ? "Send via email" : "Send via WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
