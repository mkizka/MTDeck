import { Menu } from './menu';
import { clickAll } from './utils';

abstract class Backable {
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

class ModalSocial extends Backable {
  activeQuery = '#open-modal .js-column-state-social-proof';
  clickQuery = '#open-modal .js-tweet-social-proof-back';
}

class ModalDetail extends Backable {
  activeQuery = '#open-modal .js-column-state-detail-view';
  clickQuery = '#open-modal .js-column-back';
}

class BackableModal extends Backable {
  activeQuery = '.mdl .btn-back';
  clickQuery = '.mdl .btn-back';
}

class Modal extends Backable {
  activeQuery = '.mdl .js-dismiss';
  clickQuery = '.mdl .js-dismiss';
}

class ColumnSocial extends Backable {
  activeQuery = '#container .js-column-state-social-proof';
  clickQuery = '#container .js-tweet-social-proof-back';
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
    new ModalSocial(),
    new ModalDetail(),
    new BackableModal(),
    new Modal(),
    new ColumnSocial(),
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
