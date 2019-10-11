import Hammer from 'hammerjs';
import { styles, insertStyle } from './styles';
import { Config } from './config';

export class Deck {
  private config: Config = new Config();
  private columnIndex: number = 0;
  private $columns: Element[] = [];
  private $drawerOpenButton: undefined | Element;

  private get scrollOpt(): ScrollIntoViewOptions {
    return {
      behavior: this.config.getBoolean('mtdColumnAnimation') ? 'smooth' : 'auto',
      block: 'center',
      inline: 'nearest',
    };
  }

  public ready(): void {
    const initInterval = setInterval(() => {
      this.$drawerOpenButton = document.querySelector('button[data-drawer=compose]');
      if (this.$drawerOpenButton) {
        insertStyle(styles);
        this.init();
        this.config.init();
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

    this.update();

    const $appContainer = document.querySelector('div.app-columns-container');
    const touchManager = new Hammer.Manager($appContainer);
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

  private get hasDetail() {
    return document.querySelectorAll('.js-column-state-detail-view').length > 0;
  }

  private get hasModal() {
    return document.querySelectorAll('.js-dismiss').length > 0;
  }

  private get hasDrawerOpen() {
    return document.querySelectorAll('.app-content.is-open').length > 0;
  }

  private get hasOptionsOpen() {
    return document.querySelectorAll('.is-options-open').length > 0;
  }

  private back() {
    if (this.hasDetail) {
      const $backButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.js-column-back');
      $backButtons.forEach(($button) => {
        $button.click();
      });
    }
    if (this.hasModal) {
      const $dismissButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.js-dismiss');
      $dismissButtons.forEach($button => {
        $button.click();
      });
    }
    if (this.hasDrawerOpen) {
      const $drawerCloseButton: HTMLAnchorElement = document.querySelector('.js-drawer-close');
      $drawerCloseButton.click();
    }
    if (this.hasOptionsOpen) {
      const $optionToggleButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.is-options-open .js-action-header-button');
      $optionToggleButtons.forEach($button => {
        $button.click();
      });
    }
    if (this.hasMenuOpen) this.closeMenu();
    if (this.config.isOpen()) this.config.close();
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
