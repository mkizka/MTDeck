import { Menu } from './menu';

export const clickAll = (query: string) => {
  const $buttons: NodeListOf<HTMLElement> = document.querySelectorAll(query);
  $buttons.forEach(($button) => $button.click());
};

class Backable {
  activeQuery: string;
  clickQuery: string;

  get exists(): boolean {
    return document.querySelectorAll(this.activeQuery).length > 0;
  }

  back(): void {
    clickAll(this.clickQuery);
  }
}

class TweetDrawer extends Backable {
  activeQuery = '.app-content.is-open';
  clickQuery = '.js-drawer-close';
}

class ModalDetail extends Backable {
  activeQuery = '#open-modal .js-column-state-detail-view';
  clickQuery = '#open-modal .js-column-back';
}

class Modal extends Backable {
  activeQuery = '.mdl .js-dismiss';
  clickQuery = '.mdl .js-dismiss';
}

class ColumnDetail extends Backable {
  activeQuery = '#container .js-column-state-detail-view';
  clickQuery = '#container .js-column-back';
}

class ColumnOption extends Backable {
  activeQuery = '.is-options-open';
  clickQuery = '.is-options-open .js-action-header-button';
}

class SideMenu extends Backable {
  get exists(): boolean {
    return Menu.isOpen;
  }

  back(): void {
    Menu.close();
  }
}

export class BackController {
  private backables: Array<Backable> = [
    new TweetDrawer(),
    new ModalDetail(),
    new Modal,
    new ColumnDetail(),
    new ColumnOption(),
    new SideMenu(),
  ];
  private queue: Array<Backable> = [];

  updateQueue(): void {
    this.queue = [];
    for (let backable of this.backables) {
      if (backable.exists) {
        this.queue.push(backable);
      }
    }
  }

  back(): void {
    this.updateQueue();
    if (this.queue.length > 0) {
      this.queue[0].back();
    }
  }
}
