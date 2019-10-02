const scrollOpt = {
  behavior: 'smooth',
  block: 'center',
  inline: 'nearest',
} as ScrollIntoViewOptions;

export class Deck {
  private columnIndex: number = 0;
  private $columns: Element[] = [];

  public ready(): void {
    const initInterval = setInterval(() => {
      const $button = document.querySelector('button[data-drawer=compose]');
      if ($button) {
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

    this.update();

    document.body.addEventListener('swipeleft', e => this.pushColumn());
    document.body.addEventListener('swiperight', e => this.backColumn());

    const $appContent = document.querySelector('div.app-content');
    $appContent.addEventListener('tap', e => {
      this.update();
      this.closeDrawer();
    });
  }

  private pushColumn() {
    this.update();
    this.closeDrawer();
    if (this.columnIndex < this.$columns.length - 1) {
      this.columnIndex++;
      this.$columns[this.columnIndex].scrollIntoView(scrollOpt);
    }
  }

  private backColumn() {
    this.update();
    this.closeDrawer();
    if (this.columnIndex == 0) {
      this.openDrawer();
    } else {
      this.columnIndex--;
      this.$columns[this.columnIndex].scrollIntoView(scrollOpt);
    }
  }

  private get hasDrawerOpen(): boolean {
    return !document.body.classList.contains('mtdeck-close');
  }

  private openDrawer(): void {
    if (!this.hasDrawerOpen) {
      document.body.classList.remove('mtdeck-close');
    }
  }

  private closeDrawer(): void {
    if (this.hasDrawerOpen) {
      document.body.classList.add('mtdeck-close');
    }
  }
}
