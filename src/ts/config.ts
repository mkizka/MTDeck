import { version } from "../../package.json";
import { safeHtml, _ } from "./utils";

interface ConfigBase {
  label: string;
  type: unknown;
  name: string;
  default: unknown;
}

interface ConfigCheckbox extends ConfigBase {
  type: "checkbox";
  default: boolean;
}

interface ConfigNumber extends ConfigBase {
  type: "number";
  default: number;
}

interface ConfigSelect extends ConfigBase {
  type: "select";
  default: string;
  options: string[][];
}

type ConfigItem = ConfigCheckbox | ConfigNumber | ConfigSelect;

export class Config {
  private $el: HTMLDivElement | null = null;
  private items: ConfigItem[] = [
    {
      label: _("configOptionHScroll"),
      name: "mtdHScroll",
      type: "select",
      options: [
        ["swipe", _("configSelectSwipe")],
        ["gesture", _("configSelectGesture")],
      ],
      default: "swipe",
    },
    {
      label: _("configOptionNoAnimation"),
      name: "mtdNoAnimation",
      type: "checkbox",
      default: false,
    },
    {
      label: _("configOptionHideImages"),
      name: "mtdHideImages",
      type: "checkbox",
      default: true,
    },
    {
      label: _("configOptionLazyLoadImages"),
      name: "mtdLazyLoadImages",
      type: "checkbox",
      default: false,
    },
    {
      label: _("configOptionMenuOpenRange"),
      name: "mtdMenuOpenRange",
      type: "number",
      default: 30,
    },
  ];

  public getString(key: string): string {
    return localStorage.getItem(key)!.toString();
  }

  public getNumber(key: string): number {
    return parseFloat(localStorage.getItem(key)!);
  }

  public getBoolean(key: string): boolean {
    return localStorage.getItem(key) === "true";
  }

  public open() {
    this.$el!.classList.add("is-open");
  }

  public close() {
    this.save();
    this.$el!.classList.remove("is-open");
  }

  public isOpen(): boolean {
    return this.$el!.classList.contains("is-open");
  }

  private save() {
    const $inputs: NodeListOf<
      HTMLInputElement | HTMLSelectElement
    > = document.querySelectorAll(".mtdeck-config-input");
    $inputs.forEach(($input) => {
      switch ($input.type) {
        case "checkbox":
          // @ts-ignore
          localStorage.setItem($input.name, `${$input.checked}`);
          break;
        default:
          localStorage.setItem($input.name, $input.value);
          break;
      }
    });
  }

  private saveDefault() {
    this.items.forEach((item) => {
      if (localStorage.getItem(item.name) === null) {
        localStorage.setItem(item.name, item.default.toString());
      }
    });
  }

  private createInfo() {
    this.$el!.appendChild(
      safeHtml(`
      <div class="mtdeck-config-item">
        <p>MTDeck v${version}</p>
        <p>${_("configLinksLabel")}:
          <a href="https://github.com/mkizka/MTDeck" target="_blank">Github</a>
          <a href="https://twitter.com/mkizka">Twitter</a>
        </p>
      </div>
    `)
    );
  }

  private createFooter() {
    this.$el!.appendChild(
      safeHtml(`
      <div class="mtdeck-config-footer">
        <button id="mtdeck-config-save">${_("configSaveLabel")}</button>
        <button id="mtdeck-config-back">${_("configBackLabel")}</button>
      </div>
    `)
    );
    document
      .querySelector<HTMLButtonElement>("#mtdeck-config-save")!
      .addEventListener("click", () => {
        this.save();
        location.reload();
      });
    document
      .querySelector<HTMLButtonElement>("#mtdeck-config-back")!
      .addEventListener("click", () => {
        this.close();
      });
  }

  private createForm() {
    const getElement = (item: ConfigItem) => {
      switch (item.type) {
        case "checkbox":
          return safeHtml<HTMLInputElement>(`
          <input
            class="mtdeck-config-input"
            type="${item.type}"
            name="${item.name}"
            ${this.getBoolean(item.name) ? "checked" : ""}
          />
        `);
        case "number":
          return safeHtml<HTMLInputElement>(`
          <input
            class="mtdeck-config-input"
            type="${item.type}"
            name="${item.name}"
            value="${this.getString(item.name)}"
          />
        `);
        case "select":
          return safeHtml<HTMLSelectElement>(`
          <select
            class="mtdeck-config-input"
            name="${item.name}"
          >${item.options.map(([value, label]) => {
            const selected =
              value == this.getString(item.name) ? "selected" : "";
            return `<option value="${value}" ${selected}>${label}</option>`;
          })}
          </select>
        `);
      }
    };
    this.items.forEach((item) => {
      this.$el!.insertAdjacentElement(
        "beforeend",
        safeHtml(`
        <label class="mtdeck-config-item">
          ${getElement(item)!.outerHTML}  
          ${item.label}
        </label>
      `)
      );
    });
  }

  private createSettingButton() {
    const $settingsButton = document.querySelector<HTMLAnchorElement>(
      ".js-app-settings"
    );
    const $copiedSettingsButton = safeHtml<HTMLAnchorElement>(
      $settingsButton!.outerHTML!
    );
    $copiedSettingsButton.dataset.action = "mtdeckConfig";
    $copiedSettingsButton.dataset.title = "MTDeck Config";
    $copiedSettingsButton.classList.add("mtdeck-config-button");
    $copiedSettingsButton
      .querySelector<HTMLDivElement>(".app-nav-link-text")!
      .insertAdjacentText("afterbegin", "MTD");
    $settingsButton!.parentElement!.insertAdjacentElement(
      "afterbegin",
      $copiedSettingsButton
    );
    $copiedSettingsButton.addEventListener("click", (e) => this.open());
  }

  private createConfigBase() {
    this.$el = safeHtml(`
      <div class="mtdeck-config">
        <h1 class="mtdeck-config-item">${_("configTitle")}</h1>
      </div>
    `) as HTMLDivElement;
    document.body.appendChild(this.$el);
  }

  public init() {
    this.saveDefault();
    this.createConfigBase();
    this.createInfo();
    this.createForm();
    this.createFooter();
    this.createSettingButton();
  }
}
