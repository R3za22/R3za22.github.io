/**
 * Returns the path of the same page in the other language.
 * EN lives at `/x`, FA at `/fa/x`. If the twin page does not exist in
 * `routes`, fall back to the other language's home page.
 */
export function alternatePath(path: string, routes: Set<string>): string {
  const isFa = path === '/fa' || path.startsWith('/fa/');
  const twin = isFa ? (path === '/fa' ? '/' : path.slice('/fa'.length)) : `/fa${path}`;
  if (routes.has(twin)) return twin;
  return isFa ? '/' : '/fa/';
}
