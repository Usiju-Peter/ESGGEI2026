import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsConfigured, getAnalyticsConsent, setAnalyticsConsent, trackPageView } from '../lib/analytics';

export default function AnalyticsConsent() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>('declined');

  useEffect(() => { setConsent(getAnalyticsConsent()); }, []);

  useEffect(() => {
    const openPreferences = () => setConsent(null);
    window.addEventListener('esggei:analytics-preferences', openPreferences);
    return () => window.removeEventListener('esggei:analytics-preferences', openPreferences);
  }, []);

  useEffect(() => {
    // Wait for route metadata to settle; analytics only runs after explicit consent.
    if (consent !== 'accepted') return;
    const frame = requestAnimationFrame(trackPageView);
    return () => cancelAnimationFrame(frame);
  }, [pathname, consent]);

  if (!analyticsConfigured || consent !== null) return null;

  const choose = (choice: 'accepted' | 'declined') => {
    setAnalyticsConsent(choice);
    setConsent(choice);
  };

  return (
    <aside aria-label="Optional website analytics" className="fixed bottom-4 left-4 right-4 z-[999] mx-auto max-w-xl rounded-2xl border border-white/20 bg-forest p-5 text-white shadow-2xl">
      <p className="text-base font-semibold">Help us improve ESGGEI</p>
      <p className="mt-2 text-sm leading-relaxed text-white/85">
        With your permission, we use privacy-conscious analytics to understand which pages are useful. You can decline and continue using the site normally. <Link to="/privacy" className="underline">Privacy notice</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose('accepted')} className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Allow analytics</button>
        <button type="button" onClick={() => choose('declined')} className="rounded-full border border-white/60 px-5 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">No thanks</button>
      </div>
    </aside>
  );
}
