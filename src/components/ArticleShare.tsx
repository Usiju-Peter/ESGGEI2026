/** Native, keyboard-accessible sharing links; no third-party script or tracking. */
export default function ArticleShare({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const url = `https://www.esggei.org.ng${path}`;
  return (
    <nav className="article-share" aria-label="Share this story">
      <p>Share this story</p>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noreferrer"
      >
        X<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
      >
        Email
      </a>
    </nav>
  );
}
