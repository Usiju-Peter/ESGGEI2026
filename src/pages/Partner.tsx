import { Link } from "react-router-dom";
import * as React from "react";
import { useState } from "react";

import PageHero from "../components/PageHero";
import { Mail, Phone, CheckCircle2, Copy, Check } from "lucide-react";
import { ActionLink, SectionHeading } from "../components/UI";
import { socialLinks } from "../components/Footer";

import { useSEO } from "../lib/seo";

export default function Partner() {
  useSEO(
    "Contact Us & Partners",
    "Get in touch with EarthSprings Global Grace Empowerment Initiative (ESGGEI) to partner, volunteer, donate, or learn more about our mission in Nigeria.",
  );
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const successRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (formStatus === "success") successRef.current?.focus();
  }, [formStatus]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const contactFormEndpoint =
    import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
    "https://formsubmit.co/ajax/usijup3@gmail.com";

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 3000);
    } catch {
      setCopiedText("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setFormStatus("submitting");

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.get("fullname"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          _subject: `New ESGGEI website enquiry: ${formData.get("subject")}`,
          _template: "table",
          _captcha: "false",
          _honey: formData.get("website"),
          _url: "https://www.esggei.org.ng/partner",
        }),
      });

      const result = await response.json().catch(() => null);
      if (
        !response.ok ||
        (result?.success !== true && result?.success !== "true")
      ) {
        throw new Error("Message delivery failed");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      <PageHero
        badge="06 / Let’s work together"
        title="Contact Us"
        subtitle="Talk to the ESGGEI team about partnerships, volunteering or our community work."
      />
      <section className="section section-white contact-main">
        <div className="site-container contact-layout">
          <div className="contact-direct contact-details">
            <div>
              <h2>Email Us</h2>
              <a href="mailto:esgeei@gmail.com">
                <Mail aria-hidden="true" size={18} />
                esgeei@gmail.com
              </a>
            </div>
            <div>
              <h2>Call Us</h2>
              <a href="tel:+2348064676210">
                <Phone aria-hidden="true" size={18} />
                0806 467 6210
              </a>
            </div>
          </div>
          <div className="contact-form min-w-0">
            {formStatus === "success" ? (
              <div
                role="status"
                tabIndex={-1}
                ref={successRef}
                className="card"
              >
                <CheckCircle2
                  aria-hidden="true"
                  size={32}
                  className="text-primary"
                />
                <h2 className="card-title mt-4">Thank you for reaching out.</h2>
                <p className="mt-3 text-muted">
                  The form service has accepted your message. If you need to
                  follow up, use the email or telephone details on this page.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus("idle")}
                  className="button button-secondary mt-5"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card grid min-w-0 gap-5"
                aria-label="Enquiry form"
              >
                <h2 className="card-title">Send an enquiry</h2>
                <p className="text-sm text-muted">
                  All fields are required except your telephone number. Please
                  avoid sensitive personal information. FormSubmit processes
                  your message.{" "}
                  <Link to="/privacy" className="underline underline-offset-4">
                    Read the privacy notice
                  </Link>
                  .
                </p>
                <div hidden aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      id="fullname"
                      name="fullname"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="phone">Phone Number (optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required rows={5} />
                </div>
                {formStatus === "error" && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900"
                  >
                    We could not send your message. Please try again or email
                    ESGGEI directly at esgeei@gmail.com.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="button button-primary"
                >
                  {formStatus === "submitting"
                    ? "Sending Message..."
                    : "Send Message"}
                </button>
              </form>
            )}
          </div>
          <div className="contact-guidance">
            <h2 className="section-title">Start a partnership conversation</h2>
            <p className="mt-4 text-muted">
              Tell us about your interests, the community or location you have
              in mind, the support you can offer and any proposed timing. We can
              discuss how your enquiry relates to our programme priorities.
            </p>
            <div className="mt-4 flex flex-col items-start">
              <ActionLink to="/projects" variant="text">
                Explore programme priorities
              </ActionLink>
              <ActionLink to="/projects/guruku-gbayi-outreach" variant="text">
                See a documented outreach
              </ActionLink>
              <a
                className="button button-text"
                href="/esggei-organisation-profile.txt"
                download
              >
                Download the organisation overview (text)
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section support-section">
        <div className="site-container grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <SectionHeading title="Support our work">
              <p>
                Direct financial support helps provide seeds, learning kits and
                community outreach programmes.
              </p>
            </SectionHeading>
            <div className="card">
              <h3 className="card-title">Donation account details</h3>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className="text-sm font-semibold">Bank</dt>
                  <dd>Fidelity Bank</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold">Account name</dt>
                  <dd>Earthsprings Global Empowerment Initiative</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold">Account number</dt>
                  <dd className="font-mono text-xl font-semibold text-primary">
                    5601549746
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => handleCopy("5601549746")}
                className="button button-secondary mt-5"
              >
                {copiedText === "5601549746" ? (
                  <Check size={18} aria-hidden="true" />
                ) : (
                  <Copy size={18} aria-hidden="true" />
                )}
                {copiedText === "5601549746"
                  ? "Copied Account Number!"
                  : "Copy Account Details"}
              </button>
              {copiedText === "error" && (
                <p role="alert" className="mt-2 text-sm text-muted">
                  Copying is unavailable. Select the account number above to
                  copy it manually.
                </p>
              )}
            </div>
          </div>
          <div>
            <SectionHeading title="Follow our journey">
              <p>
                Find updates from our outreach and community work on our social
                profiles.
              </p>
            </SectionHeading>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  className="button button-secondary"
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
            <div className="mt-8 border-t border-primary/20 pt-6">
              <h3 className="card-title">
                Partnership and volunteering questions
              </h3>
              <div className="faq-list mt-5">
                <details>
                  <summary>How can an organisation work with ESGGEI?</summary>
                  <p>
                    Contact the team about funding, technical expertise,
                    products, events or other support related to education,
                    agriculture, advocacy and community wellbeing. Describe your
                    proposal so the team can discuss its suitability.
                  </p>
                </details>
                <details>
                  <summary>Can I volunteer or ask about an internship?</summary>
                  <p>
                    You can enquire using the contact details or form above.
                    Include your skills, location and availability. Current
                    roles and requirements must be confirmed by the team; an
                    enquiry is not a placement offer.
                  </p>
                </details>
                <details>
                  <summary>Where can I see ESGGEI’s previous work?</summary>
                  <p>
                    Read the{" "}
                    <Link
                      className="underline"
                      to="/projects/guruku-gbayi-outreach"
                    >
                      Guruku Gbayi outreach report
                    </Link>{" "}
                    and explore the{" "}
                    <Link className="underline" to="/gallery">
                      photograph gallery
                    </Link>
                    . Contact the team for questions about current activities.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
