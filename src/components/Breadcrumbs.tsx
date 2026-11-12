import { Link, useLocation } from "react-router-dom";
import { breadcrumbs, pageNames } from "../lib/structuredData";
export default function Breadcrumbs() {
  const { pathname: currentPath } = useLocation();
  const pathname = currentPath.replace(/\/+$/, "") || "/";
  if (pathname === "/" || !pageNames[pathname]) return null;
  return (
    <nav aria-label="Breadcrumb" className="bg-cream py-2 text-sm text-primary">
      <ol className="site-container flex flex-wrap items-center gap-2">
        {breadcrumbs(pathname).map((item, index, list) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === list.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link
                className="inline-flex min-h-8 items-center underline underline-offset-4"
                to={item.path}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
