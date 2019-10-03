const scrollOpt = {
  behavior: 'smooth',
  block: 'center',
  inline: 'nearest',
} as ScrollIntoViewOptions;

export class Deck {
  private columnIndex: number = 0;
  private $columns: Element[] = [];
  private $drawerOpenButton: undefined | Element;

  public ready(): void {
    const initInterval = setInterval(() => {
      this.$drawerOpenButton = document.querySelector('button[data-drawer=compose]');
      if (this.$drawerOpenButton) {
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
    document.body.classList.add('mtdeck-mdl-left-close');

    this.update();

    const $appContent = document.querySelector('div.app-columns-container');
    $appContent.addEventListener('tap', e => {
      this.update();
      this.closeMenu();
    });

    $appContent.addEventListener('swipeleft', e => this.pushColumn());
    $appContent.addEventListener('swiperight', e => this.backColumn());

    history.pushState(null, null, null);
    window.addEventListener('popstate', e => this.back());

    this.$drawerOpenButton.addEventListener('tap', e => {
      this.closeMenu();
    });
  }

  private get hasDetail() {
    return document.querySelectorAll('.js-column-state-detail-view').length > 0;
  }

  private get hasModal() {
    return document.querySelectorAll('.js-modal-panel').length > 0 ||
      document.querySelectorAll('.js-modal-context').length > 0;
  }

  private get hasDrawer() {
    return document.querySelectorAll('.app-content.is-open').length > 0;
  }

  private back() {
    if (this.hasDetail) {
      const $backButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.js-column-back');
      $backButtons.forEach(($button) => {
        $button.click();
      });
    }
    if (this.hasModal) {
      const $dismissButton: HTMLAnchorElement = document.querySelector('.js-dismiss');
      $dismissButton.click();
    }
    if (this.hasDrawer) {
      const drawerCloseButton: HTMLSpanElement = document.querySelector('.js-compose-close');
      drawerCloseButton.click();
    }
    history.pushState(null, null, null);
  }

  private pushColumn() {
    this.update();
    this.closeMenu();
    if (this.columnIndex < this.$columns.length - 1) {
      this.columnIndex++;
      this.$columns[this.columnIndex].scrollIntoView(scrollOpt);
    }
  }

  private backColumn() {
    this.update();
    this.closeMenu();
    if (this.columnIndex == 0) {
      this.openMenu();
    } else {
      this.columnIndex--;
      this.$columns[this.columnIndex].scrollIntoView(scrollOpt);
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
