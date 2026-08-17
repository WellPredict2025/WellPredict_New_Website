import { useEffect, useRef, useState } from 'react';

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
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      video.pause();
      return;
    }

    const startPlayback = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startPlayback();
    } else {
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', startPlayback);
    };
  }, []);

  return (
    <video
      ref={ref}
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
