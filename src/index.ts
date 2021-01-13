import "./scss/index.scss";
import { Deck } from "./ts/deck";

(window as any).MTD = new Deck();
(window as any).MTD.ready();
