import { Deck } from "./ts/deck";
import { insertStyle } from "./ts/utils";
import styles from "./scss/index.scss";

insertStyle(styles);
(window as any).MTD = new Deck();
(window as any).MTD.ready();
