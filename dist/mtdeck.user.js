// ==UserScript==
// @name MTDeck
// @version 1.8.0
// @author mkizka
// @description TweetDeckをスマホアプリのように使えるようにするUserScript
// @homepage https://github.com/mkizka/MTDeck
// @match https://tweetdeck.twitter.com
// ==/UserScript==
(function () {
  'use strict';

  var extensionDescription = {
  	message: "A browser extension to customize TweetDeck for mobile"
  };
  var configTitle = {
  	message: "Preference"
  };
  var configSaveLabel = {
  	message: "Save and Reload"
  };
  var configBackLabel = {
  	message: "Close"
  };
  var configLinksLabel = {
  	message: "Bug/Feature Report"
  };
  var configOptionBackAtMounted = {
  	message: "Close notifications at startup"
  };
  var configOptionNoAnimation = {
  	message: "Disable animation"
  };
  var configOptionHideImages = {
  	message: "Hide image thumbnails on tweet"
  };
  var configOptionLazyLoadImages = {
  	message: "Lazy load image thumbnails on tweet"
  };
  var configOptionMenuOpenRange = {
  	message: "Range to open menu with swipe"
  };
  var messagesEN = {
  	extensionDescription: extensionDescription,
  	configTitle: configTitle,
  	configSaveLabel: configSaveLabel,
  	configBackLabel: configBackLabel,
  	configLinksLabel: configLinksLabel,
  	configOptionBackAtMounted: configOptionBackAtMounted,
  	configOptionNoAnimation: configOptionNoAnimation,
  	configOptionHideImages: configOptionHideImages,
  	configOptionLazyLoadImages: configOptionLazyLoadImages,
  	configOptionMenuOpenRange: configOptionMenuOpenRange
  };

  var extensionDescription$1 = {
  	message: "TweetDeckをスマホアプリのように使えるようにするアドオン"
  };
  var configTitle$1 = {
  	message: "設定メニュー"
  };
  var configSaveLabel$1 = {
  	message: "保存して再読み込み"
  };
  var configBackLabel$1 = {
  	message: "戻る"
  };
  var configLinksLabel$1 = {
  	message: "バグ報告/機能提案など"
  };
  var configOptionBackAtMounted$1 = {
  	message: "起動直後に開いている通知などを閉じる"
  };
  var configOptionNoAnimation$1 = {
  	message: "アニメーションの無効化"
  };
  var configOptionHideImages$1 = {
  	message: "ツイートの画像サムネイルを非表示"
  };
  var configOptionLazyLoadImages$1 = {
  	message: "ツイートの画像サムネイルを遅延読み込み"
  };
  var configOptionMenuOpenRange$1 = {
  	message: "左からのスワイプでメニューを開く範囲"
  };
  var messagesJA = {
  	extensionDescription: extensionDescription$1,
  	configTitle: configTitle$1,
  	configSaveLabel: configSaveLabel$1,
  	configBackLabel: configBackLabel$1,
  	configLinksLabel: configLinksLabel$1,
  	configOptionBackAtMounted: configOptionBackAtMounted$1,
  	configOptionNoAnimation: configOptionNoAnimation$1,
  	configOptionHideImages: configOptionHideImages$1,
  	configOptionLazyLoadImages: configOptionLazyLoadImages$1,
  	configOptionMenuOpenRange: configOptionMenuOpenRange$1
  };

  const messages = {
      en: messagesEN,
      ja: messagesJA,
  };
  const safeHtml = (html) => {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(html, `text/html`);
      const body = parsed.querySelector("body");
      if ((body === null || body === void 0 ? void 0 : body.firstElementChild) == undefined) {
          throw Error;
      }
      return body.firstElementChild;
  };
  const clickAll = (query) => {
      const $buttons = document.querySelectorAll(query);
      $buttons.forEach(($button) => $button.click());
  };
  const _ = (messageName) => {
      if (typeof chrome !== "undefined" && typeof chrome.i18n !== "undefined") {
          return chrome.i18n.getMessage(messageName);
      }
      const lang = /ja/.test(window.navigator.language) ? "ja" : "en";
      return messages[lang][messageName].message || "";
  };
  const insertStyle = (css) => {
      const style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.innerText = css;
      document.head.appendChild(style);
  };

  class ScrollController {
      constructor() {
          this.$container = null;
          this.$columnNavigator = null;
          this.isNoAnimation = false;
      }
      init() {
          this.$container = document.querySelector("#container");
          this.$columnNavigator = document.querySelector("#column-navigator");
          this.isNoAnimation = document.body.classList.contains("mtdeck-no-animation");
          if (this.isNoAnimation) {
              this.setNoAnimationJump();
              this.setNoAnimationObserver();
          }
      }
      scrollTo($target) {
          const { left } = $target.getBoundingClientRect();
          const behavior = this.isNoAnimation ? "auto" : "smooth";
          // ナビゲーションバーのスクロール(scrollIntoView)と
          // 同時に発火出来ない？ためscrollByでスクロール
          this.$container.scrollBy({ left, behavior });
          const $navButton = this.$columnNavigator.querySelector(`li[data-column=${$target.dataset.column}]`);
          $navButton.scrollIntoView({ behavior, inline: "nearest" });
      }
      setNoAnimationObserver() {
          const observer = new MutationObserver(() => this.setNoAnimationJump());
          observer.observe(this.$columnNavigator, {
              childList: true,
              attributes: false,
              characterData: false,
          });
      }
      setNoAnimationJump() {
          const $anchors = this.$columnNavigator.querySelectorAll("li[data-column] a");
          $anchors.forEach(($anchor) => {
              const $replacedAnchor = removeEventHandler($anchor);
              $replacedAnchor.addEventListener("click", (_) => {
                  const $targetColumn = this.$container.querySelector(`section[data-column=${$anchor.dataset.column}]`);
                  $targetColumn.scrollIntoView({ inline: "nearest" });
              });
          });
      }
  }
  function removeEventHandler($element) {
      const $replaced = safeHtml($element.outerHTML);
      $element.insertAdjacentElement("afterend", $replaced);
      $element.remove();
      return $replaced;
  }

  class Menu {
      static get isOpen() {
          return !document.body.classList.contains("mtdeck-close");
      }
      static open() {
          if (!Menu.isOpen) {
              document.body.classList.remove("mtdeck-close");
          }
      }
      static close() {
          if (Menu.isOpen) {
              document.body.classList.add("mtdeck-close");
          }
      }
  }

  class Backable {
      constructor() {
          this.activeQuery = "";
          this.clickQuery = "";
      }
      get exists() {
          return document.querySelectorAll(this.activeQuery).length > 0;
      }
      back() {
          clickAll(this.clickQuery);
      }
  }
  class MTDeckConfig extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = ".mtdeck-config.is-open";
          this.clickQuery = "#mtdeck-config-back";
      }
  }
  class TweetDrawer extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = ".app-content.is-open";
          this.clickQuery = ".js-drawer-close";
      }
  }
  class ModalSocial extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = "#open-modal .js-column-state-social-proof";
          this.clickQuery = "#open-modal .js-tweet-social-proof-back";
      }
  }
  class ModalDetail extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = "#open-modal .js-column-state-detail-view";
          this.clickQuery = "#open-modal .js-column-back";
      }
  }
  class BackableModal extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = ".mdl .btn-back";
          this.clickQuery = ".mdl .btn-back";
      }
  }
  class Modal extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = ".mdl .js-dismiss";
          this.clickQuery = ".mdl .js-dismiss";
      }
  }
  class ColumnSocial extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = "#container .js-column-state-social-proof";
          this.clickQuery = "#container .js-tweet-social-proof-back";
      }
  }
  class ColumnDetail extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = "#container .js-column-state-detail-view";
          this.clickQuery = "#container .js-column-back";
      }
  }
  class ColumnOption extends Backable {
      constructor() {
          super(...arguments);
          this.activeQuery = ".is-options-open";
          this.clickQuery = ".is-options-open .js-action-header-button";
      }
  }
  class SideMenu extends Backable {
      get exists() {
          return Menu.isOpen;
      }
      back() {
          Menu.close();
      }
  }
  class BackController {
      constructor() {
          this.backables = [
              new MTDeckConfig(),
              new TweetDrawer(),
              new ModalSocial(),
              new ModalDetail(),
              new BackableModal(),
              new Modal(),
              new ColumnSocial(),
              new ColumnDetail(),
              new ColumnOption(),
              new SideMenu(),
          ];
      }
      back() {
          for (let backable of this.backables) {
              if (backable.exists) {
                  backable.back();
                  break;
              }
          }
      }
  }

  class TouchManager {
      constructor($element) {
          this.onTap = () => { };
          this.onSwipe = () => { };
          this.start = { x: 0, y: 0, time: 0 };
          this.end = { x: 0, y: 0, time: 0 };
          $element.addEventListener("click", () => this.onTap());
          $element.addEventListener("touchstart", (e) => {
              this.start = {
                  x: e.touches[0].screenX,
                  y: e.touches[0].screenY,
                  time: new Date().getTime(),
              };
          });
          $element.addEventListener("touchmove", (e) => {
              this.end = {
                  x: e.touches[0].screenX,
                  y: e.touches[0].screenY,
                  time: new Date().getTime(),
              };
          });
          $element.addEventListener("touchend", (_) => {
              if (this.isSwipedX) {
                  const direction = this.start.x < this.end.x ? "right" : "left";
                  this.onSwipe(this.start.x, direction);
              }
          });
      }
      get isSwipedX() {
          const diffX = this.end.x - this.start.x;
          const diffY = this.end.y - this.start.y;
          const diffTime = this.end.time - this.start.time;
          const velocity = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) / diffTime;
          return (Math.abs(diffY / diffX) <= 1 && // スワイプ角度の絶対値が45度以下
              Math.abs(diffX) >= 10 && // 最小距離(px)
              Math.abs(velocity) >= 0.3 // 最小速度(px/ミリ秒)
          );
      }
  }

  var version = "1.8.0";

  class Config {
      constructor() {
          this.$el = null;
          this.items = [
              {
                  label: _("configOptionBackAtMounted"),
                  name: "mtdBackAtMounted",
                  type: "checkbox",
                  default: "true",
              },
              {
                  label: _("configOptionNoAnimation"),
                  name: "mtdNoAnimation",
                  type: "checkbox",
                  default: "false",
              },
              {
                  label: _("configOptionHideImages"),
                  name: "mtdHideImages",
                  type: "checkbox",
                  default: "false",
              },
              {
                  label: _("configOptionLazyLoadImages"),
                  name: "mtdLazyLoadImages",
                  type: "checkbox",
                  default: "false",
              },
              {
                  label: _("configOptionMenuOpenRange"),
                  name: "mtdMenuOpenRange",
                  type: "number",
                  default: "30",
              },
          ];
      }
      getString(key) {
          return localStorage.getItem(key).toString();
      }
      getNumber(key) {
          return parseFloat(localStorage.getItem(key));
      }
      getBoolean(key) {
          return localStorage.getItem(key) === "true";
      }
      open() {
          this.$el.classList.add("is-open");
      }
      close() {
          this.save();
          this.$el.classList.remove("is-open");
      }
      isOpen() {
          return this.$el.classList.contains("is-open");
      }
      save() {
          const $inputs = document.querySelectorAll(".mtdeck-config-input");
          $inputs.forEach(($input) => {
              if ($input.type === "checkbox") {
                  localStorage.setItem($input.name, `${$input.checked}`);
              }
              else {
                  localStorage.setItem($input.name, $input.value);
              }
          });
      }
      saveDefault() {
          this.items.forEach((item) => {
              if (localStorage.getItem(item.name) === null) {
                  localStorage.setItem(item.name, item.default);
              }
          });
      }
      createInfo() {
          this.$el.appendChild(safeHtml(`
      <div class="mtdeck-config-item">
        <p>MTDeck v${version}</p>
        <p>${_("configLinksLabel")}:
          <a href="https://github.com/mkizka/MTDeck" target="_blank">Github</a>
          <a href="https://twitter.com/mkizka">Twitter</a>
        </p>
      </div>
    `));
      }
      createFooter() {
          this.$el.appendChild(safeHtml(`
      <div class="mtdeck-config-footer">
        <button id="mtdeck-config-save">${_("configSaveLabel")}</button>
        <button id="mtdeck-config-back">${_("configBackLabel")}</button>
      </div>
    `));
          document
              .querySelector("#mtdeck-config-save")
              .addEventListener("click", () => {
              this.save();
              location.reload();
          });
          document
              .querySelector("#mtdeck-config-back")
              .addEventListener("click", () => {
              this.close();
          });
      }
      createForm() {
          this.items.forEach((item) => {
              const inputElement = safeHtml(`
        <input class="mtdeck-config-input" type="${item.type}" name="${item.name}"/>
      `);
              if (item.type === "checkbox") {
                  inputElement.defaultChecked = this.getBoolean(item.name);
              }
              else {
                  inputElement.defaultValue = this.getString(item.name);
              }
              this.$el.insertAdjacentElement("beforeend", safeHtml(`
        <label class="mtdeck-config-item">
          ${inputElement.outerHTML}  
          ${item.label}
        </label>
      `));
          });
      }
      createSettingButton() {
          const $settingsButton = document.querySelector(".js-app-settings");
          const $copiedSettingsButton = safeHtml($settingsButton.outerHTML);
          $copiedSettingsButton.dataset.action = "mtdeckConfig";
          $copiedSettingsButton.dataset.title = "MTDeck Config";
          $copiedSettingsButton.classList.add("mtdeck-config-button");
          $copiedSettingsButton
              .querySelector(".app-nav-link-text")
              .insertAdjacentText("afterbegin", "MTD");
          $settingsButton.parentElement.insertAdjacentElement("afterbegin", $copiedSettingsButton);
          $copiedSettingsButton.addEventListener("click", (e) => this.open());
      }
      createConfigBase() {
          this.$el = safeHtml(`
      <div class="mtdeck-config">
        <h1 class="mtdeck-config-item">${_("configTitle")}</h1>
      </div>
    `);
          document.body.appendChild(this.$el);
      }
      init() {
          this.saveDefault();
          this.createConfigBase();
          this.createInfo();
          this.createForm();
          this.createFooter();
          this.createSettingButton();
      }
  }

  class Deck {
      constructor() {
          this.config = new Config();
          this.scrollController = new ScrollController();
          this.backController = new BackController();
          this.columnIndex = 0;
          this.$columns = [];
          this.$drawerOpenButton = null;
      }
      ready() {
          const initInterval = setInterval(() => {
              this.$drawerOpenButton = document.querySelector("button[data-drawer=compose]");
              if (this.$drawerOpenButton) {
                  this.config.init();
                  this.init();
                  this.scrollController.init();
                  clearInterval(initInterval);
              }
          }, 100);
      }
      update() {
          this.$columns = [];
          document
              .querySelectorAll("section.column")
              .forEach(($column) => {
              this.$columns.push($column);
          });
          this.fixColumnState();
          this.updateTweetButton();
      }
      fixColumnState() {
          this.columnIndex = 0;
          let $nearColumn = this.$columns[0];
          for (let i = 1; i < this.$columns.length; i++) {
              if (Math.pow(this.$columns[i].getBoundingClientRect().left, 2) <
                  Math.pow($nearColumn.getBoundingClientRect().left, 2)) {
                  $nearColumn = this.$columns[i];
                  this.columnIndex = i;
              }
          }
          $nearColumn.scrollIntoView();
      }
      updateTweetButton() {
          const $tweetButton = document.querySelector(".tweet-button");
          setTimeout(() => {
              if (this.$columns[this.columnIndex].classList.contains("js-column-state-detail-view")) {
                  $tweetButton.style.display = "none";
              }
              else {
                  $tweetButton.style.display = "block";
              }
          }, 200);
      }
      init() {
          document.body.classList.add("mtdeck");
          Menu.close();
          const $appContainer = document.querySelector("div.app-columns-container");
          if (this.config.getBoolean("mtdBackAtMounted")) {
              clickAll(".js-dismiss");
          }
          if (this.config.getBoolean("mtdNoAnimation")) {
              document.body.classList.add("mtdeck-no-animation");
          }
          if (this.config.getBoolean("mtdHideImages")) {
              document.body.classList.add("mtdeck-hide-images");
          }
          // 画像非表示の場合は遅延読み込みしないためelse
          else if (this.config.getBoolean("mtdLazyLoadImages")) {
              document.body.classList.add("mtdeck-lazy-load-image");
              setLazyLoadObservers($appContainer);
          }
          this.update();
          const touchManager = new TouchManager($appContainer);
          touchManager.onTap = () => {
              this.update();
              Menu.close();
          };
          const menuOpenRange = this.config.getNumber("mtdMenuOpenRange");
          touchManager.onSwipe = (startX, direction) => {
              if (direction == "right") {
                  if (startX < menuOpenRange) {
                      Menu.open();
                  }
                  else {
                      this.backColumn();
                  }
              }
              else {
                  this.pushColumn();
              }
          };
          history.pushState(null, "", null);
          window.addEventListener("popstate", (e) => this.back());
          this.$drawerOpenButton.addEventListener("click", (e) => {
              Menu.close();
          });
      }
      back() {
          this.update();
          this.backController.back();
          history.pushState(null, "", null);
      }
      pushColumn() {
          this.update();
          Menu.close();
          if (this.columnIndex < this.$columns.length - 1) {
              this.columnIndex++;
              this.scrollController.scrollTo(this.$columns[this.columnIndex]);
          }
      }
      backColumn() {
          this.update();
          Menu.close();
          if (this.columnIndex == 0) {
              Menu.open();
          }
          else {
              this.columnIndex--;
              this.scrollController.scrollTo(this.$columns[this.columnIndex]);
          }
      }
  }
  function setLazyLoadObservers($container) {
      const intersectionObserver = new IntersectionObserver((entries) => {
          for (const e of entries) {
              if (e.isIntersecting) {
                  const style = e.target.style;
                  style.setProperty("background-image", style.backgroundImage, "important");
              }
          }
      });
      const mutationObserver = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
              mutation.addedNodes.forEach((node) => {
                  if ("querySelector" in node) {
                      const mediaItems = node.querySelectorAll(".media-item, .media-image");
                      if (mediaItems) {
                          mediaItems.forEach((item) => intersectionObserver.observe(item));
                      }
                  }
              });
          }
      });
      mutationObserver.observe($container, {
          childList: true,
          attributes: false,
          characterData: false,
          subtree: true,
      });
  }

  var styles = "body.mtdeck button[data-drawer=compose] {\n  z-index: 1;\n  position: fixed !important;\n  right: 20px;\n  bottom: 60px;\n  width: 4rem !important;\n  height: 4rem !important;\n  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.7));\n}\nbody.mtdeck .app-columns {\n  padding: 0 0 50px 0 !important;\n}\nbody.mtdeck .app-content {\n  left: 0 !important;\n}\nbody.mtdeck .app-columns-container {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\nbody.mtdeck section.column,\nbody.mtdeck .js-modal-panel,\nbody.mtdeck .prf-header,\nbody.mtdeck .prf-header-inner-overlay,\nbody.mtdeck .social-proof-container {\n  width: 100% !important;\n}\nbody.mtdeck .overlay:before {\n  margin-right: -5px;\n}\nbody.mtdeck .mdl {\n  width: 100% !important;\n  overflow-x: hidden;\n}\nbody.mtdeck .mdl .mdl-inner {\n  padding: 5px;\n}\nbody.mtdeck .mdl .mdl-inner .js-right-column {\n  overflow-x: hidden;\n}\nbody.mtdeck .mdl .mdl-inner .mdl-column:first-child {\n  display: none;\n}\nbody.mtdeck .mdl .mdl-inner .mdl-column:not(:first-child) {\n  width: 100% !important;\n}\nbody.mtdeck .mdl .mdl-dismiss {\n  right: 10px !important;\n}\nbody.mtdeck .med-tweet {\n  width: 100% !important;\n  left: 0 !important;\n}\nbody.mtdeck .old-composer-footer,\nbody.mtdeck .column-nav-flyout {\n  display: none;\n}\nbody.mtdeck .js-search-in-popover .popover {\n  width: 200px !important;\n}\nbody.mtdeck .js-mediaembed .js-media-native-video,\nbody.mtdeck .js-mediaembed .youtube-player {\n  width: 100% !important;\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto !important;\n  z-index: 1;\n}\nbody.mtdeck .column-navigator {\n  top: 50px;\n}\n\nbody.mtdeck .app-content {\n  will-change: transform;\n}\nbody.mtdeck .app-content.is-open {\n  margin-right: 0 !important;\n  transform: translateX(100%) !important;\n}\nbody.mtdeck .drawer[data-drawer=compose] {\n  left: -100%;\n  width: 100%;\n}\nbody.mtdeck button.js-hide-drawer {\n  display: none !important;\n}\n\nbody.mtdeck .js-int-scroller {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #1c2938;\n  overflow-x: auto;\n  white-space: nowrap;\n  padding-top: 10px;\n  height: 40px;\n}\nbody.mtdeck .js-int-scroller .column-nav-item {\n  height: 35px;\n}\nbody.mtdeck .js-int-scroller .column-nav-item .icon-medium {\n  font-size: 20px;\n}\nbody.mtdeck .js-int-scroller .column-nav-item .js-header-action {\n  padding-left: 12px !important;\n  padding-right: 12px !important;\n}\nbody.mtdeck .hide-detail-view-inline .js-int-scroller,\nbody.mtdeck .with-nav-border-t:before {\n  display: none;\n}\nbody.mtdeck .column-nav-item {\n  display: inline-block;\n}\n\nbody.mtdeck-close header.app-header {\n  position: relative;\n  top: -50px;\n}\nbody.mtdeck-close div.app-columns-container {\n  left: 0 !important;\n}\n\n.mtdeck-config {\n  display: none;\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  z-index: 201;\n  background-color: #1c2938;\n  padding: 20px;\n}\n.mtdeck-config.is-open {\n  display: block;\n}\n.mtdeck-config-button {\n  color: blueviolet !important;\n}\n.mtdeck-config-item {\n  margin-bottom: 20px !important;\n}\n.mtdeck-config-input[type=number] {\n  width: 80px;\n  margin-right: 10px;\n}\n.mtdeck-config-footer {\n  position: fixed;\n  bottom: 20px;\n}\n\nbody.mtdeck-no-animation,\nbody.mtdeck-no-animation *:not(iframe) {\n  transition-duration: 1ms !important;\n}\n\nbody.mtdeck-hide-images .js-media:not(.detail-preview) {\n  height: 25px !important;\n  border-radius: 0 !important;\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-sensitive {\n  height: 1rem;\n  background-color: transparent;\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-sensitive::before {\n  content: \"[sensitive]\";\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-sensitive div {\n  display: none;\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container {\n  width: 100% !important;\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-item,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-image,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-item,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-image {\n  height: 0;\n  width: max-content;\n  background-image: none !important;\n  border-radius: 0;\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-item::before,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-image::before,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-item::before,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-image::before {\n  content: \"[media]\";\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-item *,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-image *,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-item *,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-image * {\n  display: none !important;\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:not(:first-child) {\n  display: none !important;\n}\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:not(:first-child) .media-item,\nbody.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:not(:first-child) .media-image {\n  background-image: none !important;\n}\nbody.mtdeck-hide-images .item-box-full-bleed .media-item,\nbody.mtdeck-hide-images .item-box-full-bleed .media-image {\n  margin: auto !important;\n}\n\nbody.mtdeck-lazy-load-image .media-item,\nbody.mtdeck-lazy-load-image .media-image {\n  background-image: none !important;\n}\n\nhtml.btd-on body.mtdeck-hide-images .js-media-image-link {\n  background-color: inherit !important;\n}\nhtml.btd-on body.mtdeck-hide-images .js-media-preview-container.is-video .media-item::before {\n  opacity: 1;\n  width: inherit;\n  background-image: none;\n  top: 20px;\n  left: 20px;\n}\nhtml.btd-on body.mtdeck-hide-images .js-media-preview-container.is-video .media-item::after {\n  background-color: transparent;\n}";

  insertStyle(styles);
  window.MTD = new Deck();
  window.MTD.ready();

}());
