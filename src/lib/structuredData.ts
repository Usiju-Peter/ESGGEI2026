const origin = 'https://www.esggei.org.ng';
export const pageNames: Record<string, string> = {
  '/': 'Home', '/about': 'About Us', '/projects': 'Our Projects',
  '/projects/guruku-gbayi-outreach': 'Guruku Gbayi Outreach', '/gallery': 'Gallery',
  '/blog': 'Blog', '/blog/from-purpose-to-action': 'From Purpose to Action',
  '/team': 'Our Team', '/partner': 'Contact & Partnerships', '/privacy': 'Privacy Notice'
};
export function breadcrumbs(path: string) {
  const items = [{ name: 'Home', path: '/' }];
  if (path.startsWith('/projects/')) items.push({ name: 'Our Projects', path: '/projects' });
  if (path.startsWith('/blog/')) items.push({ name: 'Blog', path: '/blog' });
  if (path !== '/' && pageNames[path]) items.push({ name: pageNames[path], path });
  return items;
}
export function buildStructuredData(path: string) {
  const url = origin + path;
  const graph: Record<string, unknown>[] = [
    { '@type': 'NGO', '@id': origin + '/#organization', name: 'EarthSprings Global Grace Empowerment Initiative', alternateName: 'ESGGEI', url: origin + '/', logo: origin + '/images/logo.png', sameAs: ['https://www.instagram.com/esggei/', 'https://www.linkedin.com/in/earthsprings-global-grace-empowerment-initiative-esggei-aa132537b/', 'https://x.com/esggei'], email: 'esgeei@gmail.com', telephone: '+2348064676210', description: 'Community empowerment through education, sustainable agriculture, literacy, advocacy and social support in Nigeria.' },
    { '@type': 'WebSite', '@id': origin + '/#website', url: origin + '/', name: 'EarthSprings Global Grace Empowerment Initiative', alternateName: 'ESGGEI', publisher: { '@id': origin + '/#organization' } },
    { '@type': path === '/about' ? 'AboutPage' : path === '/partner' ? 'ContactPage' : 'WebPage', '@id': url + '#webpage', url, name: path === '/' ? 'EarthSprings Global Grace Empowerment Initiative (ESGGEI)' : pageNames[path], isPartOf: { '@id': origin + '/#website' }, breadcrumb: { '@id': url + '#breadcrumb' } },
    { '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: breadcrumbs(path).map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: origin + item.path })) }
  ];
  if (path === '/blog/from-purpose-to-action') graph.push({ '@type': 'BlogPosting', '@id': url + '#article', headline: 'From Purpose to Action: The Story Behind EarthSprings', datePublished: '2026-08-14', image: origin + '/images/gallery/outreach-25.webp', author: { '@id': origin + '/#organization' }, publisher: { '@id': origin + '/#organization' }, mainEntityOfPage: { '@id': url + '#webpage' } });
  return { '@context': 'https://schema.org', '@graph': graph };
}
