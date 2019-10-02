import 'tocca';
import { Deck } from './deck';

declare function GM_addStyle(css: string): void;

GM_addStyle(`
/* mtdeckに影響を受ける要素 */
html, body.mtdeck {
  overflow-x: hidden !important;
}
body.mtdeck button[data-drawer=compose] {
  z-index: 1;
  position: fixed !important;
  right: 0;
  bottom: 0;
  margin: 10px;
  width: 4.5rem !important;
  height: 4.5rem !important;
}
body.mtdeck div.app-content {
  left: 0 !important;
}
body.mtdeck section.column {
  width: 100% !important;
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
`);

new Deck().ready();
