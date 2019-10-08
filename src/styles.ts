export const styles = `
/* mtdeckに影響を受ける要素 */
body.mtdeck button[data-drawer=compose] {
  z-index: 1;
  position: fixed !important;
  right: 20px;
  bottom: 50px;
  width: 4rem !important;
  height: 4rem !important;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.7));
}
body.mtdeck div.app-content {
  left: 0 !important;
}
body.mtdeck div.app-columns-container {
  overflow-x: hidden;
  overflow-y: auto;
}
body.mtdeck section.column, body.mtdeck .js-modal-panel,
body.mtdeck .prf-header, body.mtdeck .prf-header-inner-overlay,
body.mtdeck .social-proof-container {
  width: 100% !important;
}
body.mtdeck .mdl, body.mtdeck .mdl section.column-temp {
  width: 100% !important;
  overflow-x: hidden !important;
}
body.mtdeck .mdl-content {
  overflow: scroll !important;
}
body.mtdeck .med-tweet {
  width: 100% !important;
  left: 0 !important;
}
body.mtdeck .mdl .mdl-dismiss {
  right: 10px !important;
}
body.mtdeck .js-modal-context:before {
  height: 0 !important;
}
body.mtdeck .old-composer-footer,
body.mtdeck .column-nav-flyout {
  display: none;
}
body.mtdeck .js-search-in-popover .popover {
  width: 200px !important;
}
body.mtdeck .js-mediaembed .js-media-native-video,
body.mtdeck .js-mediaembed .youtube-player {
  width: 100% !important;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto !important;
  z-index: 1;
}
body.mtdeck .column-navigator {
  top: 50px;
}

/* サイドバーを下へ */
body.mtdeck .js-int-scroller {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1c2938;
  overflow-x: auto;
  white-space: nowrap;
  padding-top: 10px
}
body.mtdeck .js-int-scroller .column-nav-item {
  height: 35px;
}
body.mtdeck .js-int-scroller .column-nav-item .icon-medium {
  font-size: 20px;
}
body.mtdeck .js-int-scroller .column-nav-item .js-header-action {
  height: 35px;
  padding-left: 12px !important;
  padding-right: 12px !important;
}
body.mtdeck .hide-detail-view-inline .js-int-scroller {
  display: none;
}
body.mtdeck .column-nav-item {
  display: inline-block;
}
body.mtdeck .column-content, body.mtdeck .tweet-detail-reply {
  padding-bottom: 50px;
}

/* サイドバーの開閉 */
body.mtdeck-close header.app-header {
  position: relative;
  top: -50px
}
body.mtdeck-close div.app-columns-container {
  left: 0px !important;
}

/* ツイートドロワーの開閉 */
body.mtdeck div.app-content.is-open {
  margin-right: 0 !important;
  transform: translateX(100%) !important;
}
body.mtdeck div.drawer[data-drawer=compose] {
  left: -100%;
  width: 100%;
}
body.mtdeck button.js-hide-drawer {
  display: none !important;
}

/* コンフィグ */
.mtdeck-config {
  display: none;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 201;
  background-color: #1c2938;
  padding: 20px;
}
.mtdeck-config.is-open {
  display: block;
}
.mtdeck-config-button {
  color: blueviolet !important;
}
.mtdeck-config-title {
  margin-bottom: 20px !important;
}
.mtdeck-config-back {
  margin-top: 20px !important;
}
`;

export const insertStyle = (css: string) => {
  document.querySelectorAll('#mtdeck-stylesheet').forEach($oldStyle => $oldStyle.remove());
  const styleSheet = document.createElement('style');
  styleSheet.id = 'mtdeck-stylesheet';
  styleSheet.appendChild(document.createTextNode(css));
  document.head.appendChild(styleSheet);
};
