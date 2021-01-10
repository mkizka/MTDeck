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

  scrollTo($target: HTMLElement) {
    const { left } = $target.getBoundingClientRect();
    const behavior = this.isNoAnimation ? "auto" : "smooth";
    // ナビゲーションバーのスクロール(scrollIntoView)と
    // 同時に発火出来ない？ためscrollByでスクロール
    this.$container!.scrollBy({ left, behavior });
    const $navButton = this.$columnNavigator!.querySelector(
      `li[data-column=${$target.dataset.column}]`
    );
    $navButton!.scrollIntoView({ behavior, inline: "nearest" });
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
      $replacedAnchor.addEventListener("click", (_) => {
        const $targetColumn = this.$container?.querySelector(
          `section[data-column=${$anchor.dataset.column}]`
        );
        $targetColumn!.scrollIntoView({ inline: "nearest" });
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
