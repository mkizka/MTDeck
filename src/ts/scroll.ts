import { safeHtml } from './utils';

export class ScrollController {
  private $container: undefined | Element;
  private $columnNavigator: undefined | Element;
  private isNoAnimation: boolean;

  init() {
    this.$container = document.querySelector('#container');
    this.$columnNavigator = document.querySelector('#column-navigator');
    this.isNoAnimation = document.body.classList.contains('mtdeck-no-animation');
    if (this.isNoAnimation) {
      this.setNoAnimationJump();
      this.setNoAnimationObserver();
    }
  }

  scrollTo($target: Element) {
    const rect = $target.getBoundingClientRect();
    const behavior = this.isNoAnimation ? 'auto' : 'smooth';
    this.$container.scrollBy({
      left: rect.left,
      behavior: behavior,
    });

    const columnId = ($target as HTMLElement).dataset.column;
    const $navButton = document.querySelector(`.column-nav-item[data-column=${columnId}]`);
    $navButton.scrollIntoView({
      behavior: behavior,
      inline: 'nearest'
    });
  }

  private setNoAnimationObserver() {
    const observer = new MutationObserver(() => this.setNoAnimationJump());
    observer.observe(this.$columnNavigator, {
      childList: true,
      attributes: false,
      characterData: false
    });
  }

  private setNoAnimationJump() {
    const $jumpToAnchors: NodeListOf<HTMLAnchorElement> = this.$columnNavigator.querySelectorAll('li[data-column]');
    $jumpToAnchors.forEach($anchor => {
      if ($anchor.dataset.noAnimation) return;

      const $replacedAnchor = safeHtml($anchor.outerHTML) as HTMLAnchorElement;
      $anchor.insertAdjacentElement('afterend', $replacedAnchor);
      $anchor.remove();

      $replacedAnchor.addEventListener('click', e => {
        const columnId = $anchor.dataset.column;
        const $targetColumn = this.$container.querySelector(`section[data-column=${columnId}]`);
        this.scrollTo($targetColumn);
      });
      $replacedAnchor.dataset.noAnimation = 'true';
    });
  }
}
