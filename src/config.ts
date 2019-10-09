interface ConfigItem {
  label: string
  type: 'checkbox' | 'number'
  name: string
  default: string
}

const safeHtml = (html: string): Element => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, `text/html`);
  const body = parsed.querySelector('body');
  return body.firstElementChild;
};

export class Config {
  private $el: HTMLDivElement;
  private items: ConfigItem[] = [
    {label: '左右スワイプ時にアニメーションするかどうか', name: 'mtdColumnAnimation', type: 'checkbox', default: 'true'},
  ];

  public getString(key: string): string {
    return localStorage.getItem(key).toString();
  }

  public getNumber(key: string): number {
    return parseFloat(localStorage.getItem(key));
  }

  public getBoolean(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }

  public open() {
    this.$el.classList.add('is-open');
  }

  public close() {
    this.save();
    this.$el.classList.remove('is-open');
  }

  public isOpen(): boolean {
    return this.$el.classList.contains('is-open');
  }

  private save() {
    const $inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.mtdeck-config-input');
    $inputs.forEach($input => {
      if ($input.type === 'checkbox') {
        localStorage.setItem($input.name, `${$input.checked}`);
      } else {
        localStorage.setItem($input.name, $input.value);
      }
    });
  }

  private saveDefault() {
    if (localStorage.getItem(this.items[0].name) === null) {
      this.items.forEach(item => {
        localStorage.setItem(item.name, item.default);
      });
    }
  }

  private createBackButton() {
    const $backButton = safeHtml(`
      <button class="mtdeck-config-back">保存</button>
    `) as HTMLButtonElement;

    $backButton.addEventListener('click', e => this.close());
    this.$el.insertAdjacentElement('beforeend', $backButton);
  }

  private createForm() {
    this.items.forEach(item => {
      const inputElement = safeHtml(`
        <input class="mtdeck-config-input" type="${item.type}" name="${item.name}"/>
      `) as HTMLInputElement;

      if (item.type === 'checkbox') {
        inputElement.defaultChecked = this.getBoolean(item.name);
      } else {
        inputElement.defaultValue = this.getString(item.name);
      }

      this.$el.insertAdjacentElement('beforeend', safeHtml(`
        <div class="mtdeck-config-item">
          <p>${item.label}</p>
          ${inputElement.outerHTML}  
        </div>
      `));
    });
  }

  private createSettingButton() {
    const $settingsButton = document.querySelector('.js-app-settings');
    const $copiedSettingsButton = $settingsButton.cloneNode(true) as HTMLAnchorElement;
    $copiedSettingsButton.dataset.action = 'mtdeckConfig';
    $copiedSettingsButton.dataset.title = 'MTDeck Config';
    $copiedSettingsButton.classList.add('mtdeck-config-button');
    $copiedSettingsButton.querySelector('.app-nav-link-text').insertAdjacentText('afterbegin', 'MTD');
    $settingsButton.parentElement.insertAdjacentElement('afterbegin', safeHtml($copiedSettingsButton.outerHTML));
    $settingsButton.parentElement.firstChild.addEventListener('click', e => this.open());
  }

  private createConfigBase() {
    this.$el = safeHtml(`
      <div class="mtdeck-config">
        <h1 class="mtdeck-config-title">MTDeck 設定メニュー(仮)</h1>
      </div>
    `) as HTMLDivElement;
    document.body.appendChild(this.$el);
  }

  public init() {
    this.saveDefault();
    this.createConfigBase();
    this.createForm();
    this.createBackButton();
    // this.createSettingButton();
  }
}
