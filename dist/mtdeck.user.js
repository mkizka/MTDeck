// ==UserScript==
// @name        MTDeck
// @version     1.7.0
// @author      mkizka
// @description TweetDeckをスマホアプリのように使えるようにするUserScript
// @homepage    https://github.com/mkizka/MTDeck
// @match       https://tweetdeck.twitter.com
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 44:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body.mtdeck button[data-drawer=compose]{z-index:1;position:fixed !important;right:20px;bottom:60px;width:4rem !important;height:4rem !important;filter:drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.7))}body.mtdeck .app-columns{padding:0 0 50px 0 !important}body.mtdeck .app-content{left:0 !important}body.mtdeck .app-columns-container{overflow-x:hidden;overflow-y:auto}body.mtdeck section.column,body.mtdeck .js-modal-panel,body.mtdeck .prf-header,body.mtdeck .prf-header-inner-overlay,body.mtdeck .social-proof-container{width:100% !important}body.mtdeck .overlay:before{margin-right:-5px}body.mtdeck .mdl{width:100% !important;overflow-x:hidden}body.mtdeck .mdl .mdl-inner{padding:5px}body.mtdeck .mdl .mdl-inner .js-right-column{overflow-x:hidden}body.mtdeck .mdl .mdl-inner .mdl-column:first-child{display:none}body.mtdeck .mdl .mdl-inner .mdl-column:not(:first-child){width:100% !important}body.mtdeck .mdl .mdl-dismiss{right:10px !important}body.mtdeck .med-tweet{width:100% !important;left:0 !important}body.mtdeck .old-composer-footer,body.mtdeck .column-nav-flyout{display:none}body.mtdeck .js-search-in-popover .popover{width:200px !important}body.mtdeck .js-mediaembed .js-media-native-video,body.mtdeck .js-mediaembed .youtube-player{width:100% !important;position:fixed;left:0;top:0;bottom:0;margin:auto !important;z-index:1}body.mtdeck .column-navigator{top:50px}body.mtdeck .app-content{will-change:transform}body.mtdeck .app-content.is-open{margin-right:0 !important;transform:translateX(100%) !important}body.mtdeck .drawer[data-drawer=compose]{left:-100%;width:100%}body.mtdeck button.js-hide-drawer{display:none !important}body.mtdeck .js-int-scroller{position:fixed;bottom:0;left:0;right:0;background-color:#1c2938;overflow-x:auto;white-space:nowrap;padding-top:10px;height:40px}body.mtdeck .js-int-scroller .column-nav-item{height:35px}body.mtdeck .js-int-scroller .column-nav-item .icon-medium{font-size:20px}body.mtdeck .js-int-scroller .column-nav-item .js-header-action{padding-left:12px !important;padding-right:12px !important}body.mtdeck .hide-detail-view-inline .js-int-scroller,body.mtdeck .with-nav-border-t:before{display:none}body.mtdeck .column-nav-item{display:inline-block}body.mtdeck-close header.app-header{position:relative;top:-50px}body.mtdeck-close div.app-columns-container{left:0 !important}.mtdeck-config{display:none;width:100%;height:100%;position:fixed;z-index:201;background-color:#1c2938;padding:20px}.mtdeck-config.is-open{display:block}.mtdeck-config-button{color:#8a2be2 !important}.mtdeck-config-item{margin-bottom:20px !important}.mtdeck-config-input[type=number]{width:80px;margin-right:10px}.mtdeck-config-footer{position:fixed;bottom:20px}body.mtdeck-no-animation,body.mtdeck-no-animation *:not(iframe){transition-duration:1ms !important}body.mtdeck-hide-images .js-media:not(.detail-preview){height:25px !important;border-radius:0 !important}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-sensitive{height:1rem;background-color:transparent}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-sensitive::before{content:\"[sensitive]\"}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-sensitive div{display:none}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child,body.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container{width:100% !important}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-item,body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-image,body.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-item,body.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-image{height:0;width:max-content;background-image:none !important;border-radius:0}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-item::before,body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-image::before,body.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-item::before,body.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-image::before{content:\"[media]\"}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-item *,body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:first-child .media-image *,body.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-item *,body.mtdeck-hide-images .js-media:not(.detail-preview) .js-media-preview-container .media-image *{display:none !important}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:not(:first-child){display:none !important}body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:not(:first-child) .media-item,body.mtdeck-hide-images .js-media:not(.detail-preview) .media-image-container:not(:first-child) .media-image{background-image:none !important}body.mtdeck-hide-images .item-box-full-bleed .media-item,body.mtdeck-hide-images .item-box-full-bleed .media-image{margin:auto !important}html.btd-on body.mtdeck-hide-images .js-media-image-link{background-color:inherit !important}html.btd-on body.mtdeck-hide-images .js-media-preview-container.is-video .media-item::before{opacity:1;width:inherit;background-image:none;top:20px;left:20px}html.btd-on body.mtdeck-hide-images .js-media-preview-container.is-video .media-item::after{background-color:transparent}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 306:
/***/ ((module) => {

"use strict";
module.exports = {"i8":"1.7.0"};

/***/ }),

/***/ 597:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"extensionDescription\":{\"message\":\"A browser extension to customize TweetDeck for mobile\"},\"configTitle\":{\"message\":\"Preference\"},\"configSaveLabel\":{\"message\":\"Save and Reload\"},\"configBackLabel\":{\"message\":\"Close\"},\"configLinksLabel\":{\"message\":\"Bug/Feature Report\"},\"configOptionBackAtMounted\":{\"message\":\"Close notifications at startup\"},\"configOptionNoAnimation\":{\"message\":\"Disable animation\"},\"configOptionHideImages\":{\"message\":\"Hide image thumbnails on tweet\"},\"configOptionMenuOpenRange\":{\"message\":\"Range to open menu with swipe\"}}");

/***/ }),

/***/ 515:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"extensionDescription\":{\"message\":\"TweetDeckをスマホアプリのように使えるようにするアドオン\"},\"configTitle\":{\"message\":\"設定メニュー\"},\"configSaveLabel\":{\"message\":\"保存して再読み込み\"},\"configBackLabel\":{\"message\":\"戻る\"},\"configLinksLabel\":{\"message\":\"バグ報告/機能提案など\"},\"configOptionBackAtMounted\":{\"message\":\"起動直後に開いている通知などを閉じる\"},\"configOptionNoAnimation\":{\"message\":\"アニメーションの無効化\"},\"configOptionHideImages\":{\"message\":\"ツイートの画像サムネイルを非表示\"},\"configOptionMenuOpenRange\":{\"message\":\"左からのスワイプでメニューを開く範囲\"}}");

/***/ }),

/***/ 568:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./en/messages.json": 597,
	"./ja/messages.json": 515
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 568;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/index.scss
var scss = __webpack_require__(44);
;// CONCATENATED MODULE: ./src/scss/index.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(scss/* default */.Z, options);



/* harmony default export */ const src_scss = (scss/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/ts/utils.ts
var safeHtml = function (html) {
    var parser = new DOMParser();
    var parsed = parser.parseFromString(html, "text/html");
    var body = parsed.querySelector("body");
    return body.firstElementChild;
};
var clickAll = function (query) {
    var $buttons = document.querySelectorAll(query);
    $buttons.forEach(function ($button) { return $button.click(); });
};
var _ = function (messageName) {
    if (typeof chrome !== "undefined" && typeof chrome.i18n !== "undefined") {
        return chrome.i18n.getMessage(messageName);
    }
    var lang = /ja/.test(window.navigator.language) ? "ja" : "en";
    return (__webpack_require__(568)("./" + lang + "/messages.json")[messageName].message || "");
};

;// CONCATENATED MODULE: ./src/ts/scroll.ts

var ScrollController = /** @class */ (function () {
    function ScrollController() {
    }
    ScrollController.prototype.init = function () {
        this.$container = document.querySelector("#container");
        this.$columnNavigator = document.querySelector("#column-navigator");
        this.isNoAnimation = document.body.classList.contains("mtdeck-no-animation");
        if (this.isNoAnimation) {
            this.setNoAnimationJump();
            this.setNoAnimationObserver();
        }
    };
    ScrollController.prototype.scrollTo = function ($target) {
        var rect = $target.getBoundingClientRect();
        var behavior = this.isNoAnimation ? "auto" : "smooth";
        this.$container.scrollBy({
            left: rect.left,
            behavior: behavior,
        });
        var columnId = $target.dataset.column;
        var $navButton = document.querySelector(".column-nav-item[data-column=" + columnId + "]");
        $navButton.scrollIntoView({
            behavior: behavior,
            inline: "nearest",
        });
    };
    ScrollController.prototype.setNoAnimationObserver = function () {
        var _this = this;
        var observer = new MutationObserver(function () { return _this.setNoAnimationJump(); });
        observer.observe(this.$columnNavigator, {
            childList: true,
            attributes: false,
            characterData: false,
        });
    };
    ScrollController.prototype.setNoAnimationJump = function () {
        var _this = this;
        var $jumpToAnchors = this.$columnNavigator.querySelectorAll("li[data-column]");
        $jumpToAnchors.forEach(function ($anchor) {
            if ($anchor.dataset.noAnimation)
                return;
            var $replacedAnchor = safeHtml($anchor.outerHTML);
            $anchor.insertAdjacentElement("afterend", $replacedAnchor);
            $anchor.remove();
            $replacedAnchor.addEventListener("click", function (e) {
                var columnId = $anchor.dataset.column;
                var $targetColumn = _this.$container.querySelector("section[data-column=" + columnId + "]");
                _this.scrollTo($targetColumn);
            });
            $replacedAnchor.dataset.noAnimation = "true";
        });
    };
    return ScrollController;
}());


;// CONCATENATED MODULE: ./src/ts/menu.ts
var Menu = /** @class */ (function () {
    function Menu() {
    }
    Object.defineProperty(Menu, "isOpen", {
        get: function () {
            return !document.body.classList.contains("mtdeck-close");
        },
        enumerable: false,
        configurable: true
    });
    Menu.open = function () {
        if (!Menu.isOpen) {
            document.body.classList.remove("mtdeck-close");
        }
    };
    Menu.close = function () {
        if (Menu.isOpen) {
            document.body.classList.add("mtdeck-close");
        }
    };
    return Menu;
}());


;// CONCATENATED MODULE: ./src/ts/back.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Backable = /** @class */ (function () {
    function Backable() {
    }
    Object.defineProperty(Backable.prototype, "exists", {
        get: function () {
            return document.querySelectorAll(this.activeQuery).length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Backable.prototype.back = function () {
        clickAll(this.clickQuery);
    };
    return Backable;
}());
var MTDeckConfig = /** @class */ (function (_super) {
    __extends(MTDeckConfig, _super);
    function MTDeckConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = ".mtdeck-config.is-open";
        _this.clickQuery = "#mtdeck-config-back";
        return _this;
    }
    return MTDeckConfig;
}(Backable));
var TweetDrawer = /** @class */ (function (_super) {
    __extends(TweetDrawer, _super);
    function TweetDrawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = ".app-content.is-open";
        _this.clickQuery = ".js-drawer-close";
        return _this;
    }
    return TweetDrawer;
}(Backable));
var ModalSocial = /** @class */ (function (_super) {
    __extends(ModalSocial, _super);
    function ModalSocial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = "#open-modal .js-column-state-social-proof";
        _this.clickQuery = "#open-modal .js-tweet-social-proof-back";
        return _this;
    }
    return ModalSocial;
}(Backable));
var ModalDetail = /** @class */ (function (_super) {
    __extends(ModalDetail, _super);
    function ModalDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = "#open-modal .js-column-state-detail-view";
        _this.clickQuery = "#open-modal .js-column-back";
        return _this;
    }
    return ModalDetail;
}(Backable));
var BackableModal = /** @class */ (function (_super) {
    __extends(BackableModal, _super);
    function BackableModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = ".mdl .btn-back";
        _this.clickQuery = ".mdl .btn-back";
        return _this;
    }
    return BackableModal;
}(Backable));
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = ".mdl .js-dismiss";
        _this.clickQuery = ".mdl .js-dismiss";
        return _this;
    }
    return Modal;
}(Backable));
var ColumnSocial = /** @class */ (function (_super) {
    __extends(ColumnSocial, _super);
    function ColumnSocial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = "#container .js-column-state-social-proof";
        _this.clickQuery = "#container .js-tweet-social-proof-back";
        return _this;
    }
    return ColumnSocial;
}(Backable));
var ColumnDetail = /** @class */ (function (_super) {
    __extends(ColumnDetail, _super);
    function ColumnDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = "#container .js-column-state-detail-view";
        _this.clickQuery = "#container .js-column-back";
        return _this;
    }
    return ColumnDetail;
}(Backable));
var ColumnOption = /** @class */ (function (_super) {
    __extends(ColumnOption, _super);
    function ColumnOption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeQuery = ".is-options-open";
        _this.clickQuery = ".is-options-open .js-action-header-button";
        return _this;
    }
    return ColumnOption;
}(Backable));
var SideMenu = /** @class */ (function (_super) {
    __extends(SideMenu, _super);
    function SideMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SideMenu.prototype, "exists", {
        get: function () {
            return Menu.isOpen;
        },
        enumerable: false,
        configurable: true
    });
    SideMenu.prototype.back = function () {
        Menu.close();
    };
    return SideMenu;
}(Backable));
var BackController = /** @class */ (function () {
    function BackController() {
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
        this.queue = [];
    }
    BackController.prototype.updateQueue = function () {
        this.queue = [];
        for (var _i = 0, _a = this.backables; _i < _a.length; _i++) {
            var backable = _a[_i];
            if (backable.exists) {
                this.queue.push(backable);
            }
        }
    };
    BackController.prototype.back = function () {
        this.updateQueue();
        if (this.queue.length > 0) {
            this.queue[0].back();
        }
    };
    return BackController;
}());


;// CONCATENATED MODULE: ./src/ts/touch.ts
var TouchManager = /** @class */ (function () {
    function TouchManager($element) {
        var _this = this;
        this.start = { x: 0, y: 0, time: 0 };
        this.end = { x: 0, y: 0, time: 0 };
        $element.addEventListener("click", function () { return _this.onTap(); });
        $element.addEventListener("touchstart", function (e) {
            _this.start = {
                x: e.touches[0].screenX,
                y: e.touches[0].screenY,
                time: new Date().getTime(),
            };
        });
        $element.addEventListener("touchmove", function (e) {
            _this.end = {
                x: e.touches[0].screenX,
                y: e.touches[0].screenY,
                time: new Date().getTime(),
            };
        });
        $element.addEventListener("touchend", function (_) {
            if (_this.isSwipedX) {
                var direction = _this.start.x < _this.end.x ? "right" : "left";
                _this.onSwipe(_this.start.x, direction);
            }
        });
    }
    Object.defineProperty(TouchManager.prototype, "isSwipedX", {
        get: function () {
            var diffX = this.end.x - this.start.x;
            var diffY = this.end.y - this.start.y;
            var diffTime = this.end.time - this.start.time;
            var velocity = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) / diffTime;
            return (Math.abs(diffY / diffX) <= 1 && // スワイプ角度の絶対値が45度以下
                Math.abs(diffX) >= 10 && // 最小距離(px)
                Math.abs(velocity) >= 0.3 // 最小速度(px/ミリ秒)
            );
        },
        enumerable: false,
        configurable: true
    });
    return TouchManager;
}());


;// CONCATENATED MODULE: ./src/ts/config.ts

var Config = /** @class */ (function () {
    function Config() {
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
                label: _("configOptionMenuOpenRange"),
                name: "mtdMenuOpenRange",
                type: "number",
                default: "30",
            },
        ];
    }
    Config.prototype.getString = function (key) {
        return localStorage.getItem(key).toString();
    };
    Config.prototype.getNumber = function (key) {
        return parseFloat(localStorage.getItem(key));
    };
    Config.prototype.getBoolean = function (key) {
        return localStorage.getItem(key) === "true";
    };
    Config.prototype.open = function () {
        this.$el.classList.add("is-open");
    };
    Config.prototype.close = function () {
        this.save();
        this.$el.classList.remove("is-open");
    };
    Config.prototype.isOpen = function () {
        return this.$el.classList.contains("is-open");
    };
    Config.prototype.save = function () {
        var $inputs = document.querySelectorAll(".mtdeck-config-input");
        $inputs.forEach(function ($input) {
            if ($input.type === "checkbox") {
                localStorage.setItem($input.name, "" + $input.checked);
            }
            else {
                localStorage.setItem($input.name, $input.value);
            }
        });
    };
    Config.prototype.saveDefault = function () {
        this.items.forEach(function (item) {
            if (localStorage.getItem(item.name) === null) {
                localStorage.setItem(item.name, item.default);
            }
        });
    };
    Config.prototype.createInfo = function () {
        this.$el.appendChild(safeHtml("\n      <div class=\"mtdeck-config-item\">\n        <p>MTDeck v" + __webpack_require__(306)/* .version */ .i8 + "</p>\n        <p>" + _("configLinksLabel") + ":\n          <a href=\"https://github.com/mkizka/MTDeck\" target=\"_blank\">Github</a>\n          <a href=\"https://twitter.com/mkizka\">Twitter</a>\n        </p>\n      </div>\n    "));
    };
    Config.prototype.createFooter = function () {
        var _this = this;
        this.$el.appendChild(safeHtml("\n      <div class=\"mtdeck-config-footer\">\n        <button id=\"mtdeck-config-save\">" + _("configSaveLabel") + "</button>\n        <button id=\"mtdeck-config-back\">" + _("configBackLabel") + "</button>\n      </div>\n    "));
        document
            .querySelector("#mtdeck-config-save")
            .addEventListener("click", function () {
            _this.save();
            location.reload();
        });
        document
            .querySelector("#mtdeck-config-back")
            .addEventListener("click", function () {
            _this.close();
        });
    };
    Config.prototype.createForm = function () {
        var _this = this;
        this.items.forEach(function (item) {
            var inputElement = safeHtml("\n        <input class=\"mtdeck-config-input\" type=\"" + item.type + "\" name=\"" + item.name + "\"/>\n      ");
            if (item.type === "checkbox") {
                inputElement.defaultChecked = _this.getBoolean(item.name);
            }
            else {
                inputElement.defaultValue = _this.getString(item.name);
            }
            _this.$el.insertAdjacentElement("beforeend", safeHtml("\n        <label class=\"mtdeck-config-item\">\n          " + inputElement.outerHTML + "  \n          " + item.label + "\n        </label>\n      "));
        });
    };
    Config.prototype.createSettingButton = function () {
        var _this = this;
        var $settingsButton = document.querySelector(".js-app-settings");
        var $copiedSettingsButton = $settingsButton.cloneNode(true);
        $copiedSettingsButton.dataset.action = "mtdeckConfig";
        $copiedSettingsButton.dataset.title = "MTDeck Config";
        $copiedSettingsButton.classList.add("mtdeck-config-button");
        $copiedSettingsButton
            .querySelector(".app-nav-link-text")
            .insertAdjacentText("afterbegin", "MTD");
        $settingsButton.parentElement.insertAdjacentElement("afterbegin", safeHtml($copiedSettingsButton.outerHTML));
        $settingsButton.parentElement.firstChild.addEventListener("click", function (e) {
            return _this.open();
        });
    };
    Config.prototype.createConfigBase = function () {
        this.$el = safeHtml("\n      <div class=\"mtdeck-config\">\n        <h1 class=\"mtdeck-config-item\">" + _("configTitle") + "</h1>\n      </div>\n    ");
        document.body.appendChild(this.$el);
    };
    Config.prototype.init = function () {
        this.saveDefault();
        this.createConfigBase();
        this.createInfo();
        this.createForm();
        this.createFooter();
        this.createSettingButton();
    };
    return Config;
}());


;// CONCATENATED MODULE: ./src/ts/deck.ts






var Deck = /** @class */ (function () {
    function Deck() {
        this.config = new Config();
        this.scrollController = new ScrollController();
        this.backController = new BackController();
        this.columnIndex = 0;
        this.$columns = [];
    }
    Deck.prototype.ready = function () {
        var _this = this;
        var initInterval = setInterval(function () {
            _this.$drawerOpenButton = document.querySelector("button[data-drawer=compose]");
            if (_this.$drawerOpenButton) {
                _this.config.init();
                _this.init();
                _this.scrollController.init();
                clearInterval(initInterval);
            }
        }, 100);
    };
    Deck.prototype.update = function () {
        var _this = this;
        this.$columns = [];
        document.querySelectorAll("section.column").forEach(function ($column) {
            _this.$columns.push($column);
        });
        this.fixColumnState();
        this.updateTweetButton();
    };
    Deck.prototype.fixColumnState = function () {
        this.columnIndex = 0;
        var $nearColumn = this.$columns[0];
        for (var i = 1; i < this.$columns.length; i++) {
            if (Math.pow(this.$columns[i].getBoundingClientRect().left, 2) <
                Math.pow($nearColumn.getBoundingClientRect().left, 2)) {
                $nearColumn = this.$columns[i];
                this.columnIndex = i;
            }
        }
        $nearColumn.scrollIntoView();
    };
    Deck.prototype.updateTweetButton = function () {
        var _this = this;
        var $tweetButton = document.querySelector(".tweet-button");
        setTimeout(function () {
            if (_this.$columns[_this.columnIndex].classList.contains("js-column-state-detail-view")) {
                $tweetButton.style.display = "none";
            }
            else {
                $tweetButton.style.display = "block";
            }
        }, 200);
    };
    Deck.prototype.init = function () {
        var _this = this;
        document.body.classList.add("mtdeck");
        Menu.close();
        if (this.config.getBoolean("mtdBackAtMounted")) {
            clickAll(".js-dismiss");
        }
        if (this.config.getBoolean("mtdNoAnimation")) {
            document.body.classList.add("mtdeck-no-animation");
        }
        if (this.config.getBoolean("mtdHideImages")) {
            document.body.classList.add("mtdeck-hide-images");
        }
        this.update();
        var $appContainer = document.querySelector("div.app-columns-container");
        var touchManager = new TouchManager($appContainer);
        touchManager.onTap = function () {
            _this.update();
            Menu.close();
        };
        var menuOpenRange = this.config.getNumber("mtdMenuOpenRange");
        touchManager.onSwipe = function (startX, direction) {
            if (direction == "right") {
                if (startX < menuOpenRange) {
                    Menu.open();
                }
                else {
                    _this.backColumn();
                }
            }
            else {
                _this.pushColumn();
            }
        };
        history.pushState(null, null, null);
        window.addEventListener("popstate", function (e) { return _this.back(); });
        this.$drawerOpenButton.addEventListener("click", function (e) {
            Menu.close();
        });
    };
    Deck.prototype.back = function () {
        this.update();
        this.backController.back();
        history.pushState(null, null, null);
    };
    Deck.prototype.pushColumn = function () {
        this.update();
        Menu.close();
        if (this.columnIndex < this.$columns.length - 1) {
            this.columnIndex++;
            this.scrollController.scrollTo(this.$columns[this.columnIndex]);
        }
    };
    Deck.prototype.backColumn = function () {
        this.update();
        Menu.close();
        if (this.columnIndex == 0) {
            Menu.open();
        }
        else {
            this.columnIndex--;
            this.scrollController.scrollTo(this.$columns[this.columnIndex]);
        }
    };
    return Deck;
}());


;// CONCATENATED MODULE: ./src/index.ts


new Deck().ready();

})();

/******/ })()
;