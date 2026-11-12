/** Optional Google Analytics 4. No tracking is loaded before explicit consent. */
const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() ?? '';
const documentPath = typeof window === 'undefined' ? '/' : window.location.pathname;
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
  const view = window as AnalyticsWindow;
  Object.assign(view, { [`ga-disable-${measurementId}`]: consent !== 'accepted' });
  view.gtag?.('consent', 'update', { analytics_storage: consent === 'accepted' ? 'granted' : 'denied' });
}

function initAnalytics(): void {
  if (!analyticsConfigured || document.getElementById('esggei-ga4')) return;
  const view = window as AnalyticsWindow;
  view.dataLayer = view.dataLayer ?? [];
  view.gtag = (...args: unknown[]) => { view.dataLayer!.push(args); };
  view.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  view.gtag('js', new Date());
  view.gtag('config', measurementId, {
    send_page_view: false,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: document.referrer ? new URL(document.referrer).origin : '',
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
  startWebVitals();
  (window as AnalyticsWindow).gtag?.('event', 'page_view', {
    page_location: window.location.origin + window.location.pathname,
    page_path: window.location.pathname,
    page_title: document.title
  });
}

let vitalsStarted = false;
function startWebVitals(): void {
  if (vitalsStarted) return;
  vitalsStarted = true;
  // Observe the document lifecycle once, rather than restarting on SPA navigation.
  const pagePath = documentPath;
  void import('web-vitals').then(({ onCLS, onINP, onLCP }) => {
    const report = (metric: import('web-vitals').Metric) => {
      if (getAnalyticsConsent() !== 'accepted') return;
      (window as AnalyticsWindow).gtag?.('event', 'web_vitals', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_id: metric.id,
        metric_rating: metric.rating,
        page_path: pagePath,
        page_location: window.location.origin + pagePath,
        non_interaction: true
      });
    };
    onCLS(report);
    onINP(report);
    onLCP(report);
  }).catch(() => { /* Optional measurement must never interrupt the site. */ });
}
