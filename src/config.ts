export interface ConfigItem {
  label: string
  type: 'checkbox' | 'number'
  name: string
  default: string
}

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
    const $backButton = document.createElement('button');
    $backButton.innerText = '戻る';
    $backButton.classList.add('mtdeck-config-back');
    $backButton.addEventListener('click', e => this.close());
    this.$el.appendChild($backButton);
  }

  private createForm() {
    this.items.forEach(item => {
      const $inputEl = document.createElement('input');
      $inputEl.classList.add('mtdeck-config-input');
      $inputEl.type = item.type;
      $inputEl.name = item.name;
      if (item.type === 'checkbox') {
        $inputEl.defaultChecked = localStorage.getItem(item.name) === 'true';
      } else {
        $inputEl.defaultValue = localStorage.getItem(item.name) || '';
      }
      this.$el.insertAdjacentHTML('beforeend', `
        <p>${item.label}</p>
        <div class="mtdeck-config-item">${$inputEl.outerHTML}</div>
      `);
    });
  }

  private createSettingButton() {
    const $settingsButton = document.querySelector('.js-app-settings');
    const $copiedSettingsButton = $settingsButton.cloneNode(true) as HTMLAnchorElement;
    $copiedSettingsButton.dataset.action = 'mtdeckConfig';
    $copiedSettingsButton.dataset.title = 'MTDeck Config';
    $copiedSettingsButton.classList.add('mtdeck-config-button');
    $copiedSettingsButton.querySelector('.app-nav-link-text').insertAdjacentText('afterbegin', 'MTD');
    $settingsButton.parentElement.insertAdjacentHTML('afterbegin', $copiedSettingsButton.outerHTML);
    $settingsButton.parentElement.firstChild.addEventListener('click', e => this.open());
  }

  public init() {
    this.saveDefault();
    this.$el = document.createElement('div');
    this.$el.classList.add('mtdeck-config');
    document.body.appendChild(this.$el);
    this.createBackButton();
    this.createForm();
    this.createSettingButton();
  }
}
