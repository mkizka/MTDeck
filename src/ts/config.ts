import { safeHtml } from './utils';

interface ConfigItem {
  label: string
  type: 'checkbox' | 'number'
  name: string
  default: string
}

export class Config {
  private $el: HTMLDivElement;
  private items: ConfigItem[] = [
    {label: '起動直後に開いている通知などを閉じる', name: 'mtdBackAtMounted', type: 'checkbox', default: 'true'},
    {label: 'アニメーションの無効化', name: 'mtdNoAnimation', type: 'checkbox', default: 'false'},
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

  private createInfo() {
    this.$el.appendChild(safeHtml(`
      <div class="mtdeck-config-item">
        <p>MTDeck v${require('../../package.json').version}</p>
        <p>バグ報告/機能提案など:
          <a href="https://github.com/Compeito/MTDeck" target="_blank">Github</a>
          <a href="https://twitter.com/ugo_compeito">Twitter</a>
        </p>
      </div>
    `));
  }

  private createFooter() {
    this.$el.appendChild(safeHtml(`
      <div class="mtdeck-config-footer">
        <button id="mtdeck-config-save">保存して再読み込み</button>
        <button id="mtdeck-config-back">戻る</button>
      </div>
    `));
    document.querySelector('#mtdeck-config-save').addEventListener('click', () => {
      this.save();
      location.reload();
    });
    document.querySelector('#mtdeck-config-back').addEventListener('click', () => {
      this.close();
    });
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
        <label class="mtdeck-config-item">
          ${inputElement.outerHTML}  
          ${item.label}
        </label>
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
        <h1 class="mtdeck-config-item">設定メニュー</h1>
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
