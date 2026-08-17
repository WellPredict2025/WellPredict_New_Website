import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { Link, NavLink, useLocation } from 'react-router-dom';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { X } from 'lucide-react';

import { NAV_GROUPS } from '../config/site';

import Logo from '../components/Logo';

import { motionTransition } from '../lib/motion';



const CLOSE_DELAY_MS = 280;

const CONTACT_HREF = '/contact';

const MOBILE_MENU_ID = 'mobile-navigation';



export default function Navigation() {

  const [scrolled, setScrolled] = useState(false);

  const [navVisible, setNavVisible] = useState(true);

  const [navFocused, setNavFocused] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const lastScrollY = useRef(0);

  const closeTimeoutRef = useRef<number | null>(null);

  const navRef = useRef<HTMLElement>(null);

  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const location = useLocation();

  const shouldReduceMotion = useReducedMotion();

  const mobileMenuTitleId = useId().replace(/:/g, '');



  const clearCloseTimeout = useCallback(() => {

    if (closeTimeoutRef.current !== null) {

      window.clearTimeout(closeTimeoutRef.current);

      closeTimeoutRef.current = null;

    }

  }, []);



  const openMenu = useCallback((label: string) => {

    clearCloseTimeout();

    setOpenDropdown(label);

  }, [clearCloseTimeout]);



  const scheduleClose = useCallback(() => {

    clearCloseTimeout();

    closeTimeoutRef.current = window.setTimeout(() => {

      setOpenDropdown(null);

    }, CLOSE_DELAY_MS);

  }, [clearCloseTimeout]);



  const closeMenu = useCallback(() => {

    clearCloseTimeout();

    setOpenDropdown(null);

  }, [clearCloseTimeout]);



  const closeMobileMenu = useCallback(() => {

    setMobileOpen(false);

  }, []);



  useEffect(() => {

    const handleScroll = () => {

      const y = window.scrollY;

      setScrolled(y > 40);



      if (mobileOpen || navFocused) {

        setNavVisible(true);

      } else if (y <= 80) {

        setNavVisible(true);

      } else if (y > lastScrollY.current) {

        setNavVisible(false);

        closeMenu();

      } else {

        setNavVisible(true);

      }



      lastScrollY.current = y;

    };



    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);

  }, [mobileOpen, navFocused, closeMenu]);



  useEffect(() => {

    setMobileOpen(false);

    closeMenu();

    setNavVisible(true);

  }, [location.pathname, closeMenu]);



  useEffect(() => {

    const onKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Escape') {

        closeMenu();

        closeMobileMenu();

      }

    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);

  }, [closeMenu, closeMobileMenu]);



  useEffect(() => {

    if (!mobileOpen) return;



    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';



    return () => {

      document.body.style.overflow = originalOverflow;

    };

  }, [mobileOpen]);



  useEffect(() => {

    if (mobileOpen) {

      closeBtnRef.current?.focus();

      document.body.classList.add('mobile-nav-open');

    } else {

      document.body.classList.remove('mobile-nav-open');

      if (menuBtnRef.current && document.activeElement?.closest(`#${MOBILE_MENU_ID}`)) {

        menuBtnRef.current.focus();

      }

    }



    return () => {

      document.body.classList.remove('mobile-nav-open');

    };

  }, [mobileOpen]);



  useEffect(() => () => clearCloseTimeout(), [clearCloseTimeout]);



  const isHome = location.pathname === '/';

  const isTransparentHero = isHome && !scrolled;

  const isNavShown = navVisible || mobileOpen || navFocused;



  const navClass = [

    'site-nav',

    scrolled || !isHome ? 'nav-scrolled' : '',

    isNavShown ? 'nav-visible' : 'nav-hidden',

    isTransparentHero ? 'nav-on-hero' : '',

    !isHome ? 'nav-internal' : '',

  ].filter(Boolean).join(' ');



  const headerClass = [

    'site-header',

    scrolled || !isHome ? 'nav-scrolled' : '',

    isTransparentHero ? 'nav-on-hero' : '',

    isNavShown ? 'nav-visible' : 'nav-hidden',

    mobileOpen ? 'site-header--menu-open' : '',

  ].filter(Boolean).join(' ');



  const linkColor = 'rgba(255,255,255,0.82)';

  const wordmarkColor = '#FFFFFF';

  const hamburgerColor = '#FFFFFF';



  const groups = Object.values(NAV_GROUPS);

  const mobileTransition = motionTransition(shouldReduceMotion, 0.28);



  const handleNavFocus = () => setNavFocused(true);

  const handleNavBlur = (e: React.FocusEvent<HTMLElement>) => {

    if (!navRef.current?.contains(e.relatedTarget as Node)) {

      setNavFocused(false);

    }

  };



  const mobileMenu = (

    <AnimatePresence>

      {mobileOpen && (

        <>

          <motion.button

            type="button"

            className="mobile-nav__backdrop"

            aria-label="Close navigation menu"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={mobileTransition}

            onClick={closeMobileMenu}

          />

          <motion.div

            id={MOBILE_MENU_ID}

            className="mobile-nav"

            role="dialog"

            aria-modal="true"

            aria-labelledby={mobileMenuTitleId}

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={mobileTransition}

          >

            <div className="mobile-nav__header">

              <Link

                to="/"

                className="mobile-nav__brand no-underline"

                onClick={closeMobileMenu}

                aria-label="WellPredict home"

              >

                <Logo size="navMobile" wordmarkColor="#FFFFFF" />

              </Link>

              <button

                ref={closeBtnRef}

                type="button"

                className="mobile-nav__close"

                aria-label="Close navigation menu"

                onClick={closeMobileMenu}

              >

                <X size={22} strokeWidth={2} aria-hidden="true" />

              </button>

            </div>



            <div className="mobile-nav__content">

              <p id={mobileMenuTitleId} className="sr-only">

                Mobile navigation menu

              </p>



              {groups.map((group) => (

                <section key={group.label} className="mobile-nav__section" aria-label={`${group.label} links`}>

                  <h2 className="mobile-nav__label">{group.label}</h2>

                  <ul className="mobile-nav__list">

                    {group.links.map((link) => (

                      <li key={link.href}>

                        <NavLink

                          to={link.href}

                          className={({ isActive }) =>

                            `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`

                          }

                          onClick={closeMobileMenu}

                        >

                          {link.label}

                        </NavLink>

                      </li>

                    ))}

                  </ul>

                </section>

              ))}



              <section className="mobile-nav__section" aria-label="Contact">

                <h2 className="mobile-nav__label">Contact</h2>

                <NavLink

                  to={CONTACT_HREF}

                  className={({ isActive }) =>

                    `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`

                  }

                  onClick={closeMobileMenu}

                >

                  Contact

                </NavLink>

              </section>



              <Link to="/pilot" className="mobile-nav__cta" onClick={closeMobileMenu}>

                Request Pilot

              </Link>

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>

  );



  return (

    <header className={headerClass}>

      <nav

        ref={navRef}

        className={navClass}

        aria-label="Main navigation"

        onFocus={handleNavFocus}

        onBlur={handleNavBlur}

      >

        <div className="site-nav-inner">

          <Link to="/" className="no-underline flex-shrink-0" aria-label="WellPredict home">

            <span className="hidden lg:inline">

              <Logo size="nav" wordmarkColor={wordmarkColor} />

            </span>

            <span className="lg:hidden">

              <Logo size="navMobile" wordmarkColor={wordmarkColor} />

            </span>

          </Link>



          <div className="hidden lg:flex items-center site-nav-links">

            {groups.map((group) => {

              const isOpen = openDropdown === group.label;

              const panelId = `nav-panel-${group.label.replace(/\s+/g, '-').toLowerCase()}`;

              return (

                <div

                  key={group.label}

                  className="nav-dropdown nav-item"

                  onMouseEnter={() => openMenu(group.label)}

                  onMouseLeave={scheduleClose}

                >

                  <button

                    type="button"

                    className={`nav-link site-nav-link-btn nav-dropdown-trigger${isOpen ? ' nav-item-active' : ''}`}

                    style={{ color: linkColor }}

                    aria-expanded={isOpen}

                    aria-haspopup="menu"

                    aria-controls={panelId}

                    id={`nav-trigger-${panelId}`}

                    onFocus={() => openMenu(group.label)}

                    onClick={() => (isOpen ? closeMenu() : openMenu(group.label))}

                  >

                    <span>{group.label}</span>

                    <svg

                      className="nav-dropdown-chevron"

                      width="12"

                      height="12"

                      viewBox="0 0 12 12"

                      fill="none"

                      aria-hidden="true"

                    >

                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                    </svg>

                  </button>



                  <div

                    id={panelId}

                    className={`nav-dropdown-panel${isOpen ? ' nav-dropdown-open is-open' : ''}`}

                    role="menu"

                    aria-labelledby={`nav-trigger-${panelId}`}

                    hidden={!isOpen}

                    onMouseEnter={clearCloseTimeout}

                  >

                    {group.links.map((link) => (

                      <Link

                        key={link.href}

                        to={link.href}

                        role="menuitem"

                        className="nav-dropdown-link"

                        tabIndex={isOpen ? 0 : -1}

                        onClick={closeMenu}

                      >

                        {link.label}

                      </Link>

                    ))}

                  </div>

                </div>

              );

            })}

            <NavLink

              to={CONTACT_HREF}

              className={({ isActive }) =>

                `nav-link site-nav-link-btn nav-dropdown-trigger site-nav-direct-link${isActive ? ' nav-item-active' : ''}`

              }

              style={{ color: linkColor }}

            >

              Contact

            </NavLink>

          </div>



          <Link to="/pilot" className="btn-primary hidden lg:inline-flex site-nav-cta">

            Request Pilot

          </Link>



          <button

            ref={menuBtnRef}

            type="button"

            className="lg:hidden site-nav-menu-btn"

            onClick={() => setMobileOpen((open) => !open)}

            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}

            aria-expanded={mobileOpen}

            aria-controls={MOBILE_MENU_ID}

          >

            {[0, 1, 2].map((i) => (

              <span

                key={i}

                className="site-nav-menu-line"

                style={{

                  backgroundColor: hamburgerColor,

                  transform: mobileOpen && i === 0 ? 'rotate(45deg) translateY(4.5px)' : mobileOpen && i === 2 ? 'rotate(-45deg) translateY(-4.5px)' : 'none',

                  opacity: mobileOpen && i === 1 ? 0 : 1,

                }}

              />

            ))}

          </button>

        </div>

      </nav>



      {typeof document !== 'undefined' ? createPortal(mobileMenu, document.body) : null}

    </header>

  );

}

