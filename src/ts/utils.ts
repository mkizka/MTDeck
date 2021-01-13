import messagesEN from "../_locales/en/messages.json";
import messagesJA from "../_locales/ja/messages.json";

const messages = {
  en: messagesEN,
  ja: messagesJA,
};

export const safeHtml = <T = HTMLElement>(html: string): T => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, `text/html`);
  const body = parsed.querySelector<HTMLBodyElement>("body");
  if (body?.firstElementChild == undefined) {
    throw Error;
  }
  return (body?.firstElementChild as unknown) as T;
};

export const clickAll = (query: string) => {
  const $buttons: NodeListOf<HTMLElement> = document.querySelectorAll(query);
  $buttons.forEach(($button) => $button.click());
};

export const _ = (messageName: string): string => {
  if (typeof chrome !== "undefined" && typeof chrome.i18n !== "undefined") {
    return chrome.i18n.getMessage(messageName);
  }
  const lang = /ja/.test(window.navigator.language) ? "ja" : "en";
  return (messages[lang] as any)[messageName].message || "";
};
