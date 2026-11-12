/** Optional Google Analytics 4. No tracking is loaded before explicit consent. */
const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() ?? '';
const consentKey = 'esggei.analytics-consent.v1';
type AnalyticsWindow = Window & { dataLayer?: unknown[][]; gtag?: (...args: unknown[]) => void };

export const analyticsConfigured = /^G-[A-Z0-9]+$/i.test(measurementId);

export function getAnalyticsConsent(): 'accepted' | 'declined' | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(consentKey);
    return stored === 'accepted' || stored === 'declined' ? stored : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: 'accepted' | 'declined'): void {
  try { localStorage.setItem(consentKey, consent); } catch { /* Storage might be blocked */ }
}

function initAnalytics(): void {
  if (!analyticsConfigured || document.getElementById('esggei-ga4')) return;
  const view = window as AnalyticsWindow;
  view.dataLayer = view.dataLayer ?? [];
  view.gtag = (...args: unknown[]) => { view.dataLayer!.push(args); };
  view.gtag('js', new Date());
  view.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  const script = document.createElement('script');
  script.id = 'esggei-ga4';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(script);
}

export function trackPageView(): void {
  if (!analyticsConfigured || getAnalyticsConsent() !== 'accepted' || typeof window === 'undefined') return;
  initAnalytics();
  (window as AnalyticsWindow).gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title
  });
}
