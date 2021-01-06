export class Menu {
  static get isOpen(): boolean {
    return !document.body.classList.contains("mtdeck-close");
  }

  static open(): void {
    if (!Menu.isOpen) {
      document.body.classList.remove("mtdeck-close");
    }
  }

  static close(): void {
    if (Menu.isOpen) {
      document.body.classList.add("mtdeck-close");
    }
  }
}
