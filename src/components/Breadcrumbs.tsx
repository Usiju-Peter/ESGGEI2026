import { Link, useLocation } from 'react-router-dom';
import { breadcrumbs, pageNames } from '../lib/structuredData';
export default function Breadcrumbs() {
  const { pathname: currentPath } = useLocation();
  const pathname = currentPath.replace(/\/+$/, '') || '/';
  if (pathname === '/' || !pageNames[pathname]) return null;
  return <nav aria-label="Breadcrumb" className="bg-cream px-6 py-3 text-sm text-primary"><ol className="mx-auto flex max-w-7xl flex-wrap gap-2">{breadcrumbs(pathname).map((item, index, list) => <li key={item.path} className="flex items-center gap-2">{index > 0 && <span aria-hidden="true">/</span>}{index === list.length - 1 ? <span aria-current="page">{item.name}</span> : <Link className="underline underline-offset-4" to={item.path}>{item.name}</Link>}</li>)}</ol></nav>;
}
