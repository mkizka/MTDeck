export const styles = `
/* mtdeckに影響を受ける要素 */
body.mtdeck button[data-drawer=compose] {
  z-index: 1;
  position: fixed !important;
  right: 0;
  bottom: 0;
  margin: 20px !important;
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
body.mtdeck .mdl {
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
body.mtdeck .old-composer-footer {
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
`;

export const insertStyle = (css: string) => {
  const styleSheet = document.createElement('style');
  styleSheet.appendChild(document.createTextNode(css));
  document.head.appendChild(styleSheet);
};
