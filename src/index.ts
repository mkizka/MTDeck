import 'tocca';

declare function GM_addStyle(css: string): void;

GM_addStyle(`
body.mtdeck button[data-drawer=compose] {
  z-index: 1;
  position: fixed !important;
  right: 0;
  bottom: 0;
  margin: 10px;
  width: 4.5rem !important;
  height: 4.5rem !important;
}
body.mtdeck section.column {
  width: 100% !important;
}
body.mtdeck-close header.app-header {
  position: relative;
  top: -50px
}
body.mtdeck-close div.app-content {
  left: 0px !important;
}
`);

let columnIndex = 0;

const initInterval = setInterval(() => {
  const $button = document.querySelector('button[data-drawer=compose]');
  if ($button) {
    document.body.classList.add('mtdeck');
    document.body.classList.add('mtdeck-close');

    const $columns = document.querySelectorAll('section.column');
    $columns[0].scrollIntoView();

    document.body.addEventListener('swipeleft', e => {
      if (columnIndex < $columns.length) {
        columnIndex++;
        $columns[columnIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    });
    document.body.addEventListener('swiperight', e => {
      console.log(columnIndex);
      if (columnIndex == 0) {
        document.body.classList.remove('mtdeck-close');
      } else {
        columnIndex--;
        $columns[columnIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    });

    const $appContent = document.querySelector('div.app-content');
    $appContent.addEventListener('tap', e => {
      if (!document.body.classList.contains('mtdeck-close')) {
        document.body.classList.add('mtdeck-close');
      }
    });

    clearInterval(initInterval);
  }
}, 100);
