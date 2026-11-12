import { Link } from 'react-router-dom';
import { analyticsConfigured } from '../lib/analytics';
import { useSEO } from '../lib/seo';
export default function Privacy() {
  useSEO('Website Privacy Notice', 'How ESGGEI’s website handles enquiries, optional analytics and your privacy choices.');
  return <article className="bg-cream px-6 py-16"><div className="mx-auto max-w-3xl space-y-6 leading-relaxed">
    <h1 className="text-4xl font-bold">Website privacy notice</h1>
    <p>Updated <time dateTime="2026-11-12">12 November 2026</time>.</p>
    <p>This notice describes the contact form and optional analytics on the EarthSprings Global Grace Empowerment Initiative (ESGGEI) website.</p>
    <h2 className="pt-5 text-2xl font-semibold">Contact enquiries</h2>
    <p>The form asks for your name, email address, subject and message. You may also provide a telephone number. These details are sent through <a className="underline" href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noreferrer">FormSubmit</a> to the website’s configured enquiry inbox so your enquiry can be handled. Avoid submitting medical records, identity documents, financial details or sensitive information about children or other people.</p>
    <h2 className="pt-5 text-2xl font-semibold">Hosting and external services</h2>
    <p>The website is hosted on Vercel. Your browser sends connection information, such as your IP address and requested URL, when it retrieves pages and resources. Some photographs and backgrounds are served by external image hosts. Following social media links takes you to services governed by their own privacy notices.</p>
    <h2 className="pt-5 text-2xl font-semibold">Optional analytics and performance measurement</h2>
    <p>When Google Analytics is configured, the website asks before loading it. Accepting allows page-view and website-performance measurements, including loading speed, interaction responsiveness and layout stability. These measurements do not include contact-form contents. Google Analytics may use cookies after acceptance.</p>
    <p>Your analytics choice is saved in this browser. You can decline and continue browsing. Withdrawing consent stops further tracking from the website; it does not automatically delete information already received by Google. Clearing site data removes the saved choice.</p>
    {analyticsConfigured ? <button className="rounded-full bg-primary px-6 py-3 font-semibold text-white" onClick={() => window.dispatchEvent(new Event('esggei:analytics-preferences'))}>Change analytics preferences</button> : <p>Optional Google Analytics is currently disabled.</p>}
    <h2 className="pt-5 text-2xl font-semibold">Questions and requests</h2>
    <p>For questions about information submitted through this website, or to request access, correction or deletion, email <a className="underline" href="mailto:esgeei@gmail.com">esgeei@gmail.com</a>. Please describe the enquiry without sending additional sensitive documents.</p>
    <Link className="inline-block font-semibold underline" to="/partner">Contact ESGGEI</Link>
  </div></article>;
}
