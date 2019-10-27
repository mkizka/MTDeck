import Hammer from 'hammerjs';
import { styles, insertStyle } from './styles';
import { BackController, clickAll } from './back';
import { Config } from './config';

export class Deck {
  private config: Config = new Config();
  private backController: BackController = new BackController();
  private columnIndex: number = 0;
  private $columns: Element[] = [];
  private $drawerOpenButton: undefined | Element;

  private get scrollOpt(): ScrollIntoViewOptions {
    return {
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    };
  }

  public ready(): void {
    const initInterval = setInterval(() => {
      this.$drawerOpenButton = document.querySelector('button[data-drawer=compose]');
      if (this.$drawerOpenButton) {
        insertStyle(styles);
        this.config.init();
        this.init();
        clearInterval(initInterval);
      }
    }, 100);
  }

  private update() {
    this.$columns = [];
    document.querySelectorAll('section.column').forEach($column => {
      this.$columns.push($column);
    });
    this.fixColumnState();
  }

  private fixColumnState() {
    this.columnIndex = 0;
    let $nearColumn = this.$columns[0];
    for (let i = 1; i < this.$columns.length; i++) {
      if (this.$columns[i].getBoundingClientRect().left ** 2 < $nearColumn.getBoundingClientRect().left ** 2) {
        $nearColumn = this.$columns[i];
        this.columnIndex = i;
      }
    }
    $nearColumn.scrollIntoView();
  }

  private init(): void {
    document.body.classList.add('mtdeck');
    document.body.classList.add('mtdeck-close');

    if (this.config.getBoolean('mtdEnforceBackAtMounted')) {
      clickAll('.js-dismiss');
    }
    this.update();

    const $appContainer = document.querySelector('div.app-columns-container');
    const touchManager = new Hammer.Manager($appContainer, {inputClass: Hammer.TouchMouseInput});
    touchManager.add(new Hammer.Tap());
    touchManager.add(new Hammer.Swipe({
      direction: Hammer.DIRECTION_HORIZONTAL
    }));

    touchManager.on('tap', e => {
      this.update();
      this.closeMenu();
    });

    touchManager.on('swipe', e => {
      if (e.deltaX > 0) {
        this.backColumn();
      } else {
        this.pushColumn();
      }
    });

    history.pushState(null, null, null);
    window.addEventListener('popstate', e => this.back());

    this.$drawerOpenButton.addEventListener('click', e => {
      this.closeMenu();
    });
  }

  private back() {
    if (this.config.isOpen()) {
      this.config.close();
    } else {
      this.backController.back();
    }
    history.pushState(null, null, null);
  }

  private pushColumn() {
    this.update();
    this.closeMenu();
    if (this.columnIndex < this.$columns.length - 1) {
      this.columnIndex++;
      this.$columns[this.columnIndex].scrollIntoView(this.scrollOpt);
    }
  }

  private backColumn() {
    this.update();
    this.closeMenu();
    if (this.columnIndex == 0) {
      this.openMenu();
    } else {
      this.columnIndex--;
      this.$columns[this.columnIndex].scrollIntoView(this.scrollOpt);
    }
  }

  private get hasMenuOpen(): boolean {
    return !document.body.classList.contains('mtdeck-close');
  }

  private openMenu(): void {
    if (!this.hasMenuOpen) {
      document.body.classList.remove('mtdeck-close');
    }
  }

  private closeMenu(): void {
    if (this.hasMenuOpen) {
      document.body.classList.add('mtdeck-close');
    }
  }
}
