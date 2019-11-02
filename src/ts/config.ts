import { safeHtml, _, Settings } from './utils';

interface ConfigItem {
  label: string
  type: 'checkbox' | 'number'
  name: string
  default: string
}

export class Config {
  private $el: HTMLDivElement;
  private items: ConfigItem[] = [
    {label: _('configOptionBackAtMounted'), name: 'mtdBackAtMounted', type: 'checkbox', default: 'true'},
    {label: _('configOptionNoAnimation'), name: 'mtdNoAnimation', type: 'checkbox', default: 'false'},
    {label: _('configOptionNoImage'), name: 'mtdNoImage', type: 'checkbox', default: 'false'},
  ];

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
        Settings.set($input.name, `${$input.checked}`);
      } else {
        Settings.set($input.name, $input.value);
      }
    });
  }

  private saveDefault() {
    this.items.forEach(settingItem => {
      Settings.get(settingItem.name, result => {
        if (result === undefined) {
          Settings.set(settingItem.name, settingItem.default);
        }
      });
    });
  }

  private createInfo() {
    this.$el.appendChild(safeHtml(`
      <div class="mtdeck-config-item">
        <p>MTDeck v${require('../../package.json').version}</p>
        <p>${_('configLinksLabel')}:
          <a href="https://github.com/Compeito/MTDeck" target="_blank">Github</a>
          <a href="https://twitter.com/ugo_compeito">Twitter</a>
        </p>
      </div>
    `));
  }

  private createFooter() {
    this.$el.appendChild(safeHtml(`
      <div class="mtdeck-config-footer">
        <button id="mtdeck-config-save">${_('configSaveLabel')}</button>
        <button id="mtdeck-config-back">${_('configBackLabel')}</button>
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
      this.$el.insertAdjacentElement('beforeend', safeHtml(`
        <label class="mtdeck-config-item">
          ${inputElement.outerHTML}  
          ${item.label}
        </label>
      `));
    });
  }

  private setFormValue() {
    document.querySelectorAll('.mtdeck-config-input').forEach(($input: HTMLInputElement) => {
      Settings.get($input.name, result => {
        if ($input.type === 'checkbox') {
          $input.defaultChecked = result === 'true';
        } else {
          $input.defaultValue = result;
        }
      });
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
        <h1 class="mtdeck-config-item">${_('configTitle')}</h1>
      </div>
    `) as HTMLDivElement;
    document.body.appendChild(this.$el);
  }

  public init() {
    this.saveDefault();
    this.createConfigBase();
    this.createInfo();
    this.createForm();
    this.setFormValue();
    this.createFooter();
    this.createSettingButton();
  }
}
