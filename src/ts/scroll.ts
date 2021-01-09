import { safeHtml } from "./utils";

export class ScrollController {
  private $container: undefined | Element;
  private $columnNavigator: undefined | Element;
  private isNoAnimation: boolean;

  init() {
    this.$container = document.querySelector("#container");
    this.$columnNavigator = document.querySelector("#column-navigator");
    this.isNoAnimation = document.body.classList.contains(
      "mtdeck-no-animation"
    );
    if (this.isNoAnimation) {
      this.setNoAnimationJump();
      this.setNoAnimationObserver();
    }
  }

  scrollTo($target: Element) {
    const columnId = ($target as HTMLElement).dataset.column;
    const $navButton = document.querySelector<HTMLAnchorElement>(
      `.column-nav-item[data-column=${columnId}] a`
    );
    $navButton.click();
    $navButton.scrollIntoView({
      behavior: this.isNoAnimation ? "auto" : "smooth",
      inline: "nearest",
    });
  }

  private setNoAnimationObserver() {
    const observer = new MutationObserver(() => this.setNoAnimationJump());
    observer.observe(this.$columnNavigator, {
      childList: true,
      attributes: false,
      characterData: false,
    });
  }

  private setNoAnimationJump() {
    const $anchors = this.$columnNavigator.querySelectorAll<HTMLAnchorElement>(
      "li[data-column] a"
    );
    $anchors.forEach(($anchor) => {
      const $replacedAnchor = removeEventHandler($anchor);
      $replacedAnchor.addEventListener("click", (e) => {
        const columnId = $anchor.dataset.column;
        const $targetColumn = this.$container.querySelector(
          `section[data-column=${columnId}]`
        );
        $targetColumn.scrollIntoView({
          behavior: "auto",
          inline: "nearest",
        });
      });
    });
  }
}

function removeEventHandler($element: Element): typeof $element {
  const $replaced = safeHtml($element.outerHTML) as HTMLAnchorElement;
  $element.insertAdjacentElement("afterend", $replaced);
  $element.remove();
  return $replaced;
}
