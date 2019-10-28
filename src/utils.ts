export const safeHtml = (html: string): Element => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, `text/html`);
  const body = parsed.querySelector('body');
  return body.firstElementChild;
};
