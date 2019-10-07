export interface ConfigItem<T> {
  label: string
  type: 'checkbox' | 'number'
  name: string
}

export class Config {
  private $el: HTMLDivElement;
  private items: ConfigItem<any>[] = [
    {label: 'カラム移動時のアニメーション', name: 'mtd', type: 'checkbox'},
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
    this.$el.classList.remove('is-open');
  }

  public isOpen(): boolean {
    return this.$el.classList.contains('is-open');
  }

  public init() {
    this.$el = document.createElement('div');
    this.$el.classList.add('mtdeck-config');
    document.body.appendChild(this.$el);

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

    const $inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.mtdeck-config-input');
    $inputs.forEach($input => {
      $input.addEventListener('change', e => {
        if ($input.type === 'checkbox') {
          localStorage.setItem($input.name, `${$input.checked}`);
        } else {
          localStorage.setItem($input.name, $input.value);
        }
      });
    });
  }
}
