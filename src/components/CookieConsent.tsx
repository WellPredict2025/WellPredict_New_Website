import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { RESET_EVENT, loadCookieConsent, saveCookieConsent } from '../lib/cookieConsent';

export default function CookieConsent() {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const dismiss = useCallback((settings: { analytics: boolean; preferences: boolean }) => {
    saveCookieConsent({
      essential: true,
      analytics: settings.analytics,
      preferences: settings.preferences,
    });
    setIsVisible(false);
    setIsManaging(false);
    setStatusMessage(
      settings.analytics || settings.preferences
        ? 'Cookie preferences saved.'
        : 'Optional cookies rejected. Essential cookies remain enabled.',
    );
  }, []);

  const acceptAll = useCallback(() => {
    dismiss({ analytics: true, preferences: true });
  }, [dismiss]);

  const rejectOptional = useCallback(() => {
    dismiss({ analytics: false, preferences: false });
  }, [dismiss]);

  const savePreferences = useCallback(() => {
    dismiss({ analytics, preferences });
  }, [analytics, preferences, dismiss]);

  useEffect(() => {
    if (!loadCookieConsent()) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const onReset = () => {
      setAnalytics(false);
      setPreferences(false);
      setIsManaging(false);
      setIsVisible(true);
    };

    window.addEventListener(RESET_EVENT, onReset);
    return () => window.removeEventListener(RESET_EVENT, onReset);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const frame = window.requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled])',
      );
      firstFocusable?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isVisible, isManaging]);

  useEffect(() => {
    if (!isVisible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVisible]);

  if (!isVisible) {
    return statusMessage ? (
      <p className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>
    ) : null;
  }

  return (
    <>
      <div
        ref={dialogRef}
        className="cookie-consent"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby="cookie-consent-description"
      >
        {!isManaging ? (
          <>
            <h2 id={titleId} className="cookie-consent__heading">
              <Cookie className="cookie-consent__icon" aria-hidden="true" strokeWidth={1.75} />
              We use cookies
            </h2>
            <p id="cookie-consent-description">
              We use essential cookies to make the website work. With your permission, we may also use
              optional cookies to understand website usage and improve the experience.
            </p>

            <div className="cookie-consent__actions">
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--primary"
                onClick={acceptAll}
                aria-label="Accept all cookies"
              >
                Accept all
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={rejectOptional}
                aria-label="Reject optional cookies"
              >
                Reject optional
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={() => setIsManaging(true)}
                aria-label="Manage cookie preferences"
              >
                Manage choices
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id={titleId} className="cookie-consent__heading">
              <Cookie className="cookie-consent__icon" aria-hidden="true" strokeWidth={1.75} />
              Cookie preferences
            </h2>
            <p id="cookie-consent-description">
              Choose which optional cookies WellPredict may use. Essential cookies are always enabled.
            </p>

            <div className="cookie-consent__preferences">
              <div className="cookie-consent__preference">
                <div>
                  <h3 className="cookie-consent__preference-title">Essential cookies</h3>
                  <p className="cookie-consent__preference-text">
                    Required for the website to work. These cannot be switched off.
                  </p>
                </div>
                <label className="cookie-toggle cookie-toggle--disabled">
                  <span className="sr-only">Essential cookies, always enabled</span>
                  <input type="checkbox" checked disabled aria-disabled="true" />
                  <span />
                </label>
              </div>

              <div className="cookie-consent__preference">
                <div>
                  <h3 className="cookie-consent__preference-title">Analytics cookies</h3>
                  <p className="cookie-consent__preference-text">
                    Help us understand how visitors use the website so we can improve it.
                  </p>
                </div>
                <label className="cookie-toggle">
                  <span className="sr-only">Analytics cookies</span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                  />
                  <span />
                </label>
              </div>

              <div className="cookie-consent__preference">
                <div>
                  <h3 className="cookie-consent__preference-title">Preference cookies</h3>
                  <p className="cookie-consent__preference-text">
                    Remember choices such as cookie preferences.
                  </p>
                </div>
                <label className="cookie-toggle">
                  <span className="sr-only">Preference cookies</span>
                  <input
                    type="checkbox"
                    checked={preferences}
                    onChange={(event) => setPreferences(event.target.checked)}
                  />
                  <span />
                </label>
              </div>
            </div>

            <div className="cookie-consent__actions">
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--primary"
                onClick={savePreferences}
                aria-label="Save cookie preferences"
              >
                Save preferences
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={acceptAll}
                aria-label="Accept all cookies"
              >
                Accept all
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__button--secondary"
                onClick={rejectOptional}
                aria-label="Reject optional cookies"
              >
                Reject optional
              </button>
            </div>
          </>
        )}

        <div className="cookie-consent__links">
          <Link to="/cookies">Cookie Policy</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </>
  );
}
