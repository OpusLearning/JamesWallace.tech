import PropTypes from "prop-types";

/**
 * A full-width photograph with the page heading over its dark left side (James, 11 Oct 2026).
 * `name` is the file stem in public/hero/: <name>-1942.webp, <name>-1100.webp and
 * <name>-mobile-900.webp. On phones the picture sits above the heading instead of behind it.
 */
export default function PhotoBanner({ name, alt, eyebrow, children }) {
  return (
    <section className="jw-photo-banner">
      <picture className="jw-hero-bg">
        <source media="(max-width: 760px)" srcSet={`/hero/${name}-mobile-900.webp`} />
        <img
          src={`/hero/${name}-1942.webp`}
          srcSet={`/hero/${name}-1100.webp 1100w, /hero/${name}-1942.webp 1942w`}
          sizes="100vw"
          width="1942"
          height="809"
          fetchPriority="high"
          alt={alt}
        />
      </picture>
      <div className="jw-container">
        <div className="jw-photo-banner-copy">
          {eyebrow && <p className="jw-eyebrow jw-hero-eyebrow"><span aria-hidden="true" /> {eyebrow}</p>}
          <h1>{children}</h1>
        </div>
      </div>
    </section>
  );
}

PhotoBanner.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  children: PropTypes.node.isRequired,
};
