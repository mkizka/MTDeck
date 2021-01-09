import { safeHtml } from "./utils";

export class ScrollController {
  private $container: HTMLDivElement | null = null;
  private $columnNavigator: HTMLElement | null = null;
  private isNoAnimation: boolean = false;

  init() {
    this.$container = document.querySelector<HTMLDivElement>("#container");
    this.$columnNavigator = document.querySelector<HTMLElement>(
      "#column-navigator"
    );
    this.isNoAnimation = document.body.classList.contains(
      "mtdeck-no-animation"
    );
    if (this.isNoAnimation) {
      this.setNoAnimationJump();
      this.setNoAnimationObserver();
    }
  }

  scrollTo(columnId: string) {
    const $navButton = this.$columnNavigator?.querySelector<HTMLAnchorElement>(
      `li[data-column=${columnId}] a`
    );
    $navButton?.click();
    $navButton?.scrollIntoView({
      behavior: this.isNoAnimation ? "auto" : "smooth",
      inline: "nearest",
    });
  }

  private setNoAnimationObserver() {
    const observer = new MutationObserver(() => this.setNoAnimationJump());
    observer.observe(this.$columnNavigator!, {
      childList: true,
      attributes: false,
      characterData: false,
    });
  }

  private setNoAnimationJump() {
    const $anchors = this.$columnNavigator?.querySelectorAll<HTMLAnchorElement>(
      "li[data-column] a"
    );
    $anchors?.forEach(($anchor) => {
      const $replacedAnchor = removeEventHandler($anchor);
      $replacedAnchor.addEventListener("click", (e) => {
        const columnId = $anchor.dataset.column;
        const $targetColumn = this.$container?.querySelector<HTMLElement>(
          `section[data-column=${columnId}]`
        );
        $targetColumn?.scrollIntoView({
          behavior: "auto",
          inline: "nearest",
        });
      });
    });
  }
}

function removeEventHandler($element: Element): typeof $element {
  const $replaced = safeHtml<HTMLAnchorElement>($element.outerHTML);
  $element.insertAdjacentElement("afterend", $replaced);
  $element.remove();
  return $replaced;
}
