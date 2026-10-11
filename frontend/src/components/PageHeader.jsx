import PropTypes from "prop-types";

/**
 * LOOK-SITE-1 item 5 — the one inner-page header (Style B).
 *
 * Every page that is not a full-bleed photograph page (PhotoBanner, Style A) uses this: an eyebrow,
 * an h1 with an optional italic accent, a lede, optional action buttons and, on the right, a 4:3
 * rounded photograph or screenshot. Pages with nothing to show use it without the media column
 * (`noImage`), so there is no third hero style anywhere.
 *
 * It carries `data-hero`: the "Ask a question" launcher stays hidden while a header is on screen.
 */
export default function PageHeader({
  eyebrow,
  title,
  accent,
  lede,
  note,
  body,
  actions,
  image,
  caption,
  children,
  noImage = false,
  tone = "warm",
}) {
  const toneClass =
    tone === "white" ? "jw-section-white" : tone === "surface" ? "jw-section-surface" : "jw-section-warm";
  const hasMedia = !noImage && image && image.src;

  return (
    <section className={`jw-page-header ${toneClass}${hasMedia ? "" : " jw-page-header--no-image"}`} data-hero>
      <div className="jw-container">
        <div className="jw-page-header-grid">
          <div className="jw-page-header-copy">
            {eyebrow && <p className="jw-eyebrow">{eyebrow}</p>}
            <h1>
              {title}
              {accent && <> <em>{accent}</em></>}
            </h1>
            {lede && <p className="jw-lede">{lede}</p>}
            {note && <p className="jw-caption">{note}</p>}
            {body}
            {actions && <div className="jw-page-header-actions">{actions}</div>}
          </div>
          {hasMedia && (
            <figure className="jw-page-header-media">
              <img
                className={image.className}
                src={image.src}
                srcSet={image.srcSet}
                sizes={image.sizes}
                width={image.width}
                height={image.height}
                alt={image.alt}
                fetchPriority={image.fetchPriority}
                loading={image.loading}
              />
              {caption && <figcaption>{caption}</figcaption>}
              {children}
            </figure>
          )}
          {!hasMedia && children}
        </div>
      </div>
    </section>
  );
}

PageHeader.propTypes = {
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  accent: PropTypes.node,
  lede: PropTypes.node,
  note: PropTypes.node,
  body: PropTypes.node,
  actions: PropTypes.node,
  image: PropTypes.shape({
    className: PropTypes.string,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    alt: PropTypes.string,
    fetchPriority: PropTypes.string,
    loading: PropTypes.string,
  }),
  caption: PropTypes.node,
  children: PropTypes.node,
  noImage: PropTypes.bool,
  tone: PropTypes.oneOf(["warm", "white", "surface"]),
};
