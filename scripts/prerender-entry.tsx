import { StrictMode } from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppContent } from '../src/App';

export function renderPage(pathname: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let didError = false;
    const stream = new PassThrough();
    const chunks: Buffer[] = [];
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
    stream.on('error', reject);
    stream.on('end', () => didError
      ? reject(new Error('React reported an SSR rendering error for ' + pathname))
      : resolve(Buffer.concat(chunks).toString('utf8')));

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={pathname}>
          <AppContent />
        </StaticRouter>
      </StrictMode>,
      {
        // This is a static document, not a progressively streamed HTTP response.
        // React otherwise outlines large resolved boundaries into hidden segments
        // that need JavaScript to replace the visible Loading fallback.
        progressiveChunkSize: Number.MAX_SAFE_INTEGER,
        onAllReady() { pipe(stream); },
        onError(error) { didError = true; console.error('SSR error:', pathname, error); }
      }
    );
    setTimeout(() => {
      abort();
      reject(new Error('SSR timed out for ' + pathname));
    }, 30000).unref();
  });
}
