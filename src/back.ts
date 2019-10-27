export const clickAll = (query: string) => {
  const $buttons: NodeListOf<HTMLElement> = document.querySelectorAll(query);
  $buttons.forEach(($button) => $button.click());
};

interface Backable {
  activeQuery: string;
  clickQuery: string;
}

export class BackController {
  private backables: Array<Backable> = [
    {
      activeQuery: '.app-content.is-open',
      clickQuery: '.js-drawer-close',
    }, // ツイートドロワー
    {
      activeQuery: '#open-modal .js-column-state-detail-view',
      clickQuery: '#open-modal .js-column-back',
    }, // モーダル上の詳細ビュー
    {
      activeQuery: '.mdl .js-dismiss',
      clickQuery: '.mdl .js-dismiss',
    }, // モーダル
    {
      activeQuery: '#container .js-column-state-detail-view',
      clickQuery: '#container .js-column-back',
    }, // 詳細ビュー
    {
      activeQuery: '.is-options-open',
      clickQuery: '.is-options-open .js-action-header-button',
    }, // カラムオプション
  ];
  private queue: Array<Backable> = [];

  updateQueue() {
    this.queue = [];
    for (let backable of this.backables) {
      if (document.querySelectorAll(backable.activeQuery).length > 0) {
        this.queue.push(backable);
      }
    }
  }

  back() {
    this.updateQueue();
    if (this.queue.length > 0) {
      clickAll(this.queue[0].clickQuery);
    }
  }
}
