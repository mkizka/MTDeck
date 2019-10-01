declare function GM_addStyle(css: string): void;

GM_addStyle(`
button.mtdeck-button {
  z-index: 1;
  position: fixed !important;
  right: 0;
  bottom: 0;
  margin: 10px;
  width: 4.5rem !important;
  height: 4.5rem !important;
}
body.mtdeck-close header.app-header {
  position: relative;
  top: -50px
}
body.mtdeck-close div.app-content {
  left: 0px !important;
}
section.mtdeck-column {
  width: 100% !important;
}
`);

const initInterval = setInterval(() => {
  const $button = document.querySelector('button[data-drawer=compose]');
  const $columns = document.querySelectorAll('section.column');
  if ($button && $columns) {
    $button.classList.add('mtdeck-button');
    $columns.forEach($column => {
      $column.classList.add('mtdeck-column');
    });
    document.body.classList.add('mtdeck-close');
    clearInterval(initInterval);
  }
}, 100);
