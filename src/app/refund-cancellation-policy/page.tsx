import type { Metadata } from "next";
import Image from "next/image";
import { Preloader } from "@/components/Preloader";
import { BRAND, ASSETS } from "@/lib/constants";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Refund, Cancellation and Booking Policy | L’étoile de Rêve",
  description: "Direct booking, cancellation, refund, and amendment terms for L’étoile de Rêve in Phakalane, Gaborone, Botswana.",
  alternates: { canonical: "https://letoiledereve.com/refund-cancellation-policy/" },
};

const sectionStyle = "mt-12 border-t border-gold/20 pt-9";
const listStyle = "mt-4 list-disc space-y-3 pl-6 text-ivory/85";
const paragraphStyle = "mt-4 leading-8 text-ivory/85";

export default function RefundCancellationPolicyPage() {
  return (
    <>
      <Preloader />
      <a href="#policy-main" className="skip-link">Skip to policy</a>
      <main id="policy-main" className="min-h-screen surface-deep">
        <div className="section-pad mx-auto max-w-[960px] pb-24 pt-12 sm:pt-20">
          <header className="flex flex-wrap items-center justify-between gap-6 border-b border-gold/25 pb-8">
            <a href={withBase("/")} aria-label="L’étoile de Rêve — home">
              <Image src={ASSETS.logoNav} alt="L’étoile de Rêve" width={200} height={70} className="h-14 w-auto object-contain" priority />
            </a>
            <a className="nav-label text-gold underline underline-offset-8 hover:text-champagne" href={withBase("/")}>
              Back to the apartment
            </a>
          </header>

          <div className="pt-16 sm:pt-20">
            <p className="eyebrow mb-5">Guest information · Direct reservations</p>
            <h1 className="heading-lg max-w-[20ch] text-ivory">
              Refund, cancellation and booking policy
            </h1>
            <p className="mt-6 text-sm leading-7 text-stone">
              Effective date: 25 November 2026 · Phakalane, Gaborone, Botswana
            </p>
            <p className={paragraphStyle}>
              L’Étoile de Rêve is committed to providing guests with a comfortable and enjoyable accommodation experience.
              This policy explains the terms governing reservations, payments, cancellations, refunds and booking
              changes for reservations made directly with L’Étoile de Rêve.
            </p>
          </div>

          <article className="mt-12">
            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">1. Booking and payment</h2>
              <ul className={listStyle}>
                <li>All reservations are subject to availability and confirmation by L’Étoile de Rêve.</li>
                <li>Full payment is required to secure a reservation unless otherwise agreed in writing.</li>
                <li>Payments may be made using the payment methods made available by L’Étoile de Rêve, including debit and credit cards through the DPO payment gateway.</li>
                <li>A booking confirmation will be issued once payment has been successfully received.</li>
                <li>Guests are responsible for checking that their booking dates and details are correct before completing payment.</li>
              </ul>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">2. Cancellation policy</h2>
              <p className={paragraphStyle}>
                Guests wishing to cancel a confirmed direct booking must notify L’Étoile de Rêve in writing at{" "}
                <a className="text-gold underline underline-offset-4" href="mailto:stay@letoiledereve.com">stay@letoiledereve.com</a>.
                The cancellation date is the date the written notice is received. The following refund schedule applies:
              </p>
              <div className="mt-7 overflow-x-auto border border-gold/30">
                <table className="w-full min-w-[340px] border-collapse text-left text-sm sm:text-base">
                  <thead className="bg-gold/15 text-ivory">
                    <tr>
                      <th scope="col" className="border-b border-gold/30 px-4 py-4 font-semibold">Notice received before check-in</th>
                      <th scope="col" className="border-b border-gold/30 px-4 py-4 font-semibold">Refund of amount paid</th>
                    </tr>
                  </thead>
                  <tbody className="text-ivory/85">
                    <tr className="border-b border-gold/20"><td className="px-4 py-4">7 or more calendar days</td><td className="px-4 py-4">100%</td></tr>
                    <tr className="border-b border-gold/20"><td className="px-4 py-4">3 to 6 calendar days</td><td className="px-4 py-4">50%</td></tr>
                    <tr className="border-b border-gold/20"><td className="px-4 py-4">Fewer than 3 calendar days</td><td className="px-4 py-4">No refund</td></tr>
                    <tr><td className="px-4 py-4">No-show (guest does not arrive and has not cancelled)</td><td className="px-4 py-4">No refund</td></tr>
                  </tbody>
                </table>
              </div>
              <p className={paragraphStyle}>
                Calendar days are counted backwards from the scheduled check-in date, using Botswana local time.
                The applicable cancellation tier is determined by the number of calendar days remaining when the
                written cancellation notice is received.
              </p>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">3. Booking amendments</h2>
              <ul className={listStyle}>
                <li>Guests may request changes to reservation dates by contacting L’Étoile de Rêve. All changes are subject to availability and written confirmation.</li>
                <li>If the amended booking costs more, the guest must pay the difference before the change is confirmed.</li>
                <li>If the amended booking costs less, any adjustment will be communicated and agreed in writing before the change is confirmed.</li>
                <li>Submitting a change request does not itself amend or cancel the original reservation.</li>
              </ul>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">4. Refund processing</h2>
              <ul className={listStyle}>
                <li>Approved refunds will, wherever possible, be returned to the original payment method used for the reservation.</li>
                <li>L’Étoile de Rêve will initiate an approved refund within 7 business days after approval.</li>
                <li>The time taken for the refund to appear in the guest’s account may depend on the payment service provider and the issuing bank.</li>
                <li>Guests will be notified when the refund has been initiated. Duplicate or erroneous payments will be investigated and verified excess amounts refunded.</li>
              </ul>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">5. Cancellation by L’Étoile de Rêve</h2>
              <ul className={listStyle}>
                <li>If L’Étoile de Rêve is unable to honour a confirmed reservation, the guest will be notified as soon as reasonably possible and offered a full refund of payments made for the affected reservation.</li>
                <li>An alternative accommodation arrangement may be offered, but will only be made with the guest’s agreement. No cancellation penalty will apply where L’Étoile de Rêve initiates the cancellation.</li>
              </ul>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">6. Early check-out</h2>
              <p className={paragraphStyle}>If a guest chooses to leave before the confirmed departure date, unused nights are not ordinarily refundable, unless otherwise agreed in writing or required by applicable law.</p>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">7. Payment queries and disputes</h2>
              <ul className={listStyle}>
                <li>Guests are encouraged to contact L’Étoile de Rêve promptly about payment, cancellation or refund concerns so the matter can be investigated.</li>
                <li>Guests may be asked to provide their booking reference, payment confirmation or transaction details to assist with the investigation.</li>
              </ul>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">8. Third-party bookings</h2>
              <ul className={listStyle}>
                <li>Reservations made through Airbnb, Booking.com or another third-party booking platform are governed by the cancellation and refund terms displayed on that platform at the time of booking.</li>
                <li>Guests who booked through a third-party platform should submit cancellation and refund requests through that platform.</li>
              </ul>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">9. Contact details</h2>
              <address className="mt-4 not-italic leading-8 text-ivory/85">
                L’Étoile de Rêve<br />
                Phakalane, Gaborone, Botswana<br />
                Email: <a href={`mailto:${BRAND.email}`} className="text-gold underline underline-offset-4">{BRAND.email}</a>
              </address>
            </section>

            <section className={sectionStyle}>
              <h2 className="title-sm text-gold">10. Guest acknowledgement</h2>
              <p className={paragraphStyle}>
                By proceeding with a reservation and making payment, the guest confirms that they have had the
                opportunity to read and agree to this Refund, Cancellation and Booking Policy.
              </p>
              <p className="mt-5 border-l-2 border-gold bg-gold/10 px-5 py-4 text-ivory/90">
                Website / checkout acceptance checkbox: I have read and agree to the L’Étoile de Rêve Booking, Refund and Cancellation Policy.
              </p>
            </section>

            <p className="mt-12 border-t border-gold/25 pt-8 text-sm leading-7 text-stone">
              This policy applies to direct bookings made with L’Étoile de Rêve. It should be read together
              with any mandatory consumer protections and applicable laws in Botswana.
            </p>
          </article>

          <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-gold/25 pt-8 text-sm text-stone">
            <span>© {new Date().getFullYear()} {BRAND.name}</span>
            <a href={withBase("/")} className="text-gold underline underline-offset-4 hover:text-champagne">Return to home</a>
          </footer>
        </div>
      </main>
    </>
  );
}
