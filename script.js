const array = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace',
  'Tab', 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92, 'Delete',
  'CapsLock', 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 'Enter',
  'ShiftLeft', 92, 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 47, 8593, 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 8592, 8595, 8594];

const body = document.querySelector('body');

const header = document.createElement('h1');
header.textContent = 'Virtual keyboard';

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';

const textarea = document.createElement('textarea');
textarea.className = 'textarea';

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';

let up = 0;

function makeKeyboard(array, reset = false) {
  if (reset) {
    keyboard.innerHTML = '';
    console.log('reset');
  }

  array.forEach((letter) => {
    let char = (typeof letter === 'number') ? String.fromCharCode(letter) : letter.replace('MetaLeft', 'win')
      .replace('ControlLeft', 'ctrl').replace('ControlRight', 'ctrl').replace('Left', '').replace('Delete', 'del')
      .replace('Space', '').replace('Right', '').replace('Meta', '').replace('Arrow', '')
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
  wrapper.append(header, textarea, keyboard);
}
makeKeyboard(array);

function buttonClick(a) {
  console.log(a);
  if (a === 'capslock') {
    up = (up === 0) ? 1 : 0;
    makeKeyboard(array, true);
  }
}


document.onkeypress = (event) => {
  console.log(event);
  // console.log(event.keyCode);
  // console.log(String.fromCharCode(event.keyCode));
}

// document.addEventListener('keydown', (event) => {
//   console.log(event.code);
// });




// let keyboard = []
// document.onkeypress = function(event) {
//   keyboard.push(event.charCode);
//   console.log(keyboard);
// };

