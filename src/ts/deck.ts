import Hammer from "hammerjs";
import { ScrollController } from "./scroll";
import { BackController } from "./back";
import { Config } from "./config";
import { Menu } from "./menu";
import { clickAll } from "./utils";

Hammer.defaults.cssProps.userSelect = null;

export class Deck {
  private config: Config = new Config();
  private scrollController: ScrollController = new ScrollController();
  private backController: BackController = new BackController();
  private columnIndex: number = 0;
  private $columns: Element[] = [];
  private $drawerOpenButton: undefined | Element;

  public ready(): void {
    const initInterval = setInterval(() => {
      this.$drawerOpenButton = document.querySelector(
        "button[data-drawer=compose]"
      );
      if (this.$drawerOpenButton) {
        this.config.init();
        this.init();
        this.scrollController.init();
        clearInterval(initInterval);
      }
    }, 100);
  }

  private update() {
    this.$columns = [];
    document.querySelectorAll("section.column").forEach(($column) => {
      this.$columns.push($column);
    });
    this.fixColumnState();
    this.updateTweetButton();
  }

  private fixColumnState() {
    this.columnIndex = 0;
    let $nearColumn = this.$columns[0];
    for (let i = 1; i < this.$columns.length; i++) {
      if (
        this.$columns[i].getBoundingClientRect().left ** 2 <
        $nearColumn.getBoundingClientRect().left ** 2
      ) {
        $nearColumn = this.$columns[i];
        this.columnIndex = i;
      }
    }
    $nearColumn.scrollIntoView();
  }

  private updateTweetButton() {
    const $tweetButton = document.querySelector<HTMLButtonElement>(
      ".tweet-button"
    );
    setTimeout(() => {
      if (
        this.$columns[this.columnIndex].classList.contains(
          "js-column-state-detail-view"
        )
      ) {
        $tweetButton.style.display = "none";
      } else {
        $tweetButton.style.display = "block";
      }
    }, 200);
  }

  private init(): void {
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

    const $appContainer = document.querySelector("div.app-columns-container");
    const touchManager = new Hammer.Manager($appContainer, {
      inputClass: Hammer.TouchMouseInput,
    });
    touchManager.add(new Hammer.Tap());
    touchManager.add(
      new Hammer.Swipe({
        direction: Hammer.DIRECTION_HORIZONTAL,
      })
    );

    touchManager.on("tap", (e) => {
      this.update();
      Menu.close();
    });

    const menuOpenRange = this.config.getNumber("mtdMenuOpenRange");
    touchManager.on("swipe", (e) => {
      const startX = e.changedPointers[0].screenX - e.deltaX;
      if (e.deltaX > 0) {
        if (startX < menuOpenRange) {
          Menu.open();
        } else {
          this.backColumn();
        }
      } else {
        this.pushColumn();
      }
    });

    history.pushState(null, null, null);
    window.addEventListener("popstate", (e) => this.back());

    this.$drawerOpenButton.addEventListener("click", (e) => {
      Menu.close();
    });
  }

  private back() {
    this.update();
    this.backController.back();
    history.pushState(null, null, null);
  }

  private pushColumn() {
    this.update();
    Menu.close();
    if (this.columnIndex < this.$columns.length - 1) {
      this.columnIndex++;
      this.scrollController.scrollTo(this.$columns[this.columnIndex]);
    }
  }

  private backColumn() {
    this.update();
    Menu.close();
    if (this.columnIndex == 0) {
      Menu.open();
    } else {
      this.columnIndex--;
      this.scrollController.scrollTo(this.$columns[this.columnIndex]);
    }
  }
}
