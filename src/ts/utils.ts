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

export const isExtension = typeof chrome !== 'undefined';

export const _ = (messageName: string): string => {
  if (isExtension) {
    return chrome.i18n.getMessage(messageName);
  }
  const lang = window.navigator.language === 'ja' ? 'ja' : 'en';
  return require(`../_locales/${lang}/messages.json`)[messageName].message || '';
};

export class Settings {
  public static set(key: string, value: string): void {
    if (isExtension) {
      const item: any = {};
      item[key] = value;
      chrome.storage.local.set(item);
    } else {
      localStorage.setItem(key, value);
    }
  }

  public static get(key: string, callback: (result: string) => void): void {
    if (isExtension) {
      chrome.storage.local.get(key, items => {
        return items === undefined ? callback(items as undefined) : callback(items[key]);
      });
    } else {
      callback(localStorage.getItem(key));
    }
  }

  public static getBool(key: string, callback: (isTrue: boolean) => void): void {
    Settings.get(key, result => callback(result === 'true'));
  }
}
