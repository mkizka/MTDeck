export const safeHtml = (html: string): Element => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, `text/html`);
  const body = parsed.querySelector('body');
  return body.firstElementChild;
};

export const clickAll = (query: string) => {
  const $buttons: NodeListOf<HTMLElement> = document.querySelectorAll(query);
  $buttons.forEach(($button) => $button.click());
};

export const _ = (messageName: string): string => {
  if (typeof chrome !== 'undefined') {
    return chrome.i18n.getMessage(messageName);
  }
  const lang = /ja/.test(window.navigator.language) ? 'ja' : 'en';
  return require(`../_locales/${lang}/messages.json`)[messageName].message || '';
};
