const array = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace',
  'Tab', 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 'Delete',
  'CapsLock', 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 'Enter',
  'ShiftLeft', 92, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 47, 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'Meta', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const body = document.querySelector('body');

const header = document.createElement('h1');
header.textContent = 'Virtual keyboard';

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';

const textarea = document.createElement('textarea');
textarea.className = 'textarea';

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';

const description = document.createElement('p')
description.textContent = 'Привет! Делала на macOS, но надеюсь все будет работать на windows тоже. Не успела сделать переключение языка и другие кнопки, которые работают при зажатии. Остальные (caps lock, enter, del и тд) работают'

let up = 0;
let isMouseDown = false;

function makeKeyboard(array, reset = false) {
  if (reset) {
    keyboard.innerHTML = '';
    // console.log('reset');
  }

  array.forEach((letter) => {
    let char = (typeof letter === 'number') ? String.fromCharCode(letter) : letter.replace('Meta', 'win')
      .replace('ArrowUp', `${String.fromCharCode(8593)}`).replace('ArrowDown', `${String.fromCharCode(8595)}`)
      .replace('ArrowLeft', `${String.fromCharCode(8592)}`).replace('ArrowRight', `${String.fromCharCode(8594)}`)
      .replace('ControlLeft', 'ctrl').replace('ControlRight', 'ctrl').replace('Right', '').replace('Left', '')
      .replace('Delete', 'del').replace('Space', '').replace('Arrow', '')
      .toLowerCase();
    const key = document.createElement('div');

    if (up && typeof letter === 'number') {
      char = char.toUpperCase();
    }
    key.className = (typeof letter === 'string') ? `key__item ${letter.toLowerCase()}` : 'key__item';
    key.textContent = char;
    key.onclick = () => buttonClick(char);
    keyboard.append(key);
  });

  body.append(wrapper);
  wrapper.append(header, textarea, keyboard, description);
}
makeKeyboard(array);

function buttonClick(char) {
  if (char === 'capslock') {
    up = (up === 0) ? 1 : 0;
    makeKeyboard(array, true);
  } else if (char === 'backspace') {
    textarea.value = textarea.value.slice(0, -1);
  } else if (char === 'enter') {
    textarea.value = textarea.value.substring(0, textarea.selectionStart) + "\n" + textarea.value.substring(textarea.selectionEnd, textarea.value.length);
    textarea.focus()
  } else if (char === 'tab') {
    textarea.value += '\t';
    textarea.focus();
  } else if (char === '') {
    textarea.value += ' ';
    textarea.focus();
  } else if (char === String.fromCharCode(8593) || char === String.fromCharCode(8595) || char === String.fromCharCode(8592) || char === String.fromCharCode(8594)) {
    textarea.value += char;
  } else if (char === 'del') {
    const pos = textarea.selectionStart
    if (pos < textarea.value.length) {
      textarea.value = textarea.value.slice(0, pos) + textarea.value.slice(pos + 1);
    }
  }
}

document.addEventListener('keydown', (event) => {
  const keys = document.querySelectorAll('.key__item');

  keys.forEach((key, index) => {
    console.log(key.textContent, event.key);
    if (event.code === array[index]) {
      key.classList.add('_active');
    }
    if (key.textContent === event.key || key.textContent === event.key.toUpperCase()) {
      console.log(key.textContent, event.key);

      const char = key.textContent;
      textarea.value += char;
      key.classList.add('_active');
    }

    if (event.key === 'Backspace' || event.key === 'Enter' || event.key === ' ') {
      textarea.focus();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      textarea.focus();
      textarea.value = textarea.value.slice(0, textarea.selectionStart) + '\t' + textarea.value.slice(textarea.selectionEnd);
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (event.key.toLowerCase() === key.classList[1]) {
        textarea.value += key.textContent;
      }
    }

  });
});

document.addEventListener('keyup', (event) => {
  const keys = document.querySelectorAll('.key__item');

  keys.forEach((key, index) => {
    if (key.textContent === event.key || key.textContent === event.key.toUpperCase()) {
      key.classList.remove('_active');
    }

    if (event.code === array[index]) {
      key.classList.remove('_active');
    }
  });
});

document.addEventListener('click', (event) => {
  const keys = document.querySelectorAll('.key__item');

  keys.forEach((key, index) => {
    if (key.textContent === event.target.textContent) {
      let char = (typeof array[index] === 'number') ? key.textContent : '';
      textarea.value += char;
      key.classList.add('_active');
      key.classList.remove('_active');
    }
  });
});

const shiftLeft = document.querySelector('.shiftleft');
const shiftRight = document.querySelector('.shiftright');

// function switchNumbers(array) {
//   let newArray = array.slice();
//   let symbols = [1025, 33, 34, 8470, 37, 58, 44, 46, 59, 40, 41, 95, 43];

//   if (isMouseDown) {
//     for (let i = 0; i < 13; i++) {
//       newArray[i] = symbols[i];
//     }
//     console.log(newArray);
//   } else {
//     console.log(array);
//   }
// }

// shiftLeft.addEventListener('mousedown', () => {
//   isMouseDown = true;
//   switchNumbers(array);
// })

// shiftLeft.addEventListener('mouseup', () => {
//   isMouseDown = false;
//   switchNumbers(array);
// })

// document.onkeypress = (event) => {
//   console.log(event);
//   console.log(event.keyCode);
//   console.log(String.fromCharCode(event.keyCode));
// }

// document.addEventListener('keydown', (event) => {
//   console.log(event.key);
// });




// let heheboard = []
// document.onkeypress = function(event) {
//   heheboard.push(event.charCode);
//   console.log(heheboard);
// };

