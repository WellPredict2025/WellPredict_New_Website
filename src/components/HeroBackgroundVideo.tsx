import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MOBILE_QUERY = '(max-width: 768px)';

function HeroVideo({
  className,
  poster,
  sources,
}: {
  className: string;
  poster: string;
  sources: { src: string; type: string }[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!video || !root) return;

    const section = root.closest('section');
    setPortalTarget(section instanceof HTMLElement ? section : null);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedMotionRef.current = reducedMotion;
    setShowControl(!reducedMotion);

    if (reducedMotion) {
      video.pause();
      setPlaying(false);
      return;
    }

    const syncPlaying = () => setPlaying(!video.paused);

    const tryPlay = () => {
      if (userPausedRef.current || reducedMotionRef.current) return;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    video.addEventListener('play', syncPlaying);
    video.addEventListener('pause', syncPlaying);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          video.pause();
          return;
        }
        if (!userPausedRef.current && !reducedMotionRef.current) {
          tryPlay();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(root);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('play', syncPlaying);
      video.removeEventListener('pause', syncPlaying);
      observer.disconnect();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video || reducedMotionRef.current) return;

    if (video.paused) {
      userPausedRef.current = false;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      userPausedRef.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  const control =
    showControl && portalTarget
      ? createPortal(
          <button
            type="button"
            className="hero-video-toggle"
            onClick={togglePlayback}
            aria-pressed={!playing}
            aria-label={playing ? 'Pause background video' : 'Play background video'}
          >
            {playing ? 'Pause video' : 'Play video'}
          </button>,
          portalTarget,
        )
      : null;

  return (
    <div ref={rootRef} className="hero-video-root">
      <video
        ref={videoRef}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      {control}
    </div>
  );
}

export default function HeroBackgroundVideo() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (isMobile === null) {
    return (
      <picture className="hero-bg-poster" aria-hidden="true">
        <source media="(max-width: 768px)" srcSet="/images/hero-poster-mobile.webp" type="image/webp" />
        <source srcSet="/images/hero-poster.webp" type="image/webp" />
        <img
          src="/images/hero-poster.svg"
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          className="hero-bg-poster__img"
        />
      </picture>
    );
  }

  if (isMobile) {
    return (
      <HeroVideo
        className="hero-bg-video hero-video hero-video--mobile"
        poster="/images/hero-poster-mobile.webp"
        sources={[
          { src: '/videos/hero-bg-mobile.webm', type: 'video/webm' },
          { src: '/videos/hero-bg-mobile.mp4', type: 'video/mp4' },
        ]}
      />
    );
  }

  return (
    <HeroVideo
      className="hero-bg-video hero-video hero-video--desktop"
      poster="/images/hero-poster.webp"
      sources={[
        { src: '/videos/hero-bg.webm', type: 'video/webm' },
        { src: '/videos/hero-bg-lite.mp4', type: 'video/mp4' },
        { src: '/videos/hero-bg.mp4', type: 'video/mp4' },
      ]}
    />
  );
}
