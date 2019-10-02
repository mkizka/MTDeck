import 'tocca';
import { Deck } from './deck';

declare function GM_addStyle(css: string): void;

GM_addStyle(`
body.mtdeck button[data-drawer=compose] {
  z-index: 1;
  position: fixed !important;
  right: 0;
  bottom: 0;
  margin: 10px;
  width: 4.5rem !important;
  height: 4.5rem !important;
}
body.mtdeck section.column {
  width: 100% !important;
}
body.mtdeck-close header.app-header {
  position: relative;
  top: -50px
}
body.mtdeck-close div.app-content {
  left: 0px !important;
}
`);

new Deck().ready();
