// function printAlphabet(cols) {
//   const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
//    const quantityPerColumn = Math.ceil(alphabet.length / cols);
//   const splittedByCols = [...Array(Math.ceil(cols)).keys()].map((el, i) => alphabet.splice(0, quantityPerColumn));

//    return [...Array(Math.ceil(quantityPerColumn)).keys()].forEach(index => {
//     const line = splittedByCols.map((chunk, i, arr) => chunk[index]).filter(el => el).join('\t');
//     console.log(`${line}`);
//    })
//  }

//  console.log(printAlphabet(5))

//  function printAlphabet(cols) {
//   const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
//    const quantityPerColumn = Math.ceil(alphabet.length / cols);
//   const splittedByCols = [...Array(Math.ceil(cols)).keys()].map((el, i) => alphabet.splice(0, quantityPerColumn));

//    return [...Array(Math.ceil(quantityPerColumn)).keys()].forEach(index => {
//     console.log(`${splittedByCols.map(chunk => chunk[index]).join(' ')}`);
//    })
//  }

// ______________________________________________________________________________

// function capitalizeText(text) {

//   return text.split(' ').map( (el) => el[0].toUpperCase() + el.slice(1)).join(' ')
// }
// console.log(capitalizeText("i can't wait to be king"))

// ______________________________________________________________________________

// function isValidParentheses(expression) {
//   let result = false;
//   const stack = [];
//   for (const symbol of expression) {

//     if (symbol === '(') {
//       stack.push(symbol);
//     } else if (symbol === ')') {
//       if (stack.length) {
//         stack.pop()
//       } else { return false }
//       // if (!stack.pop()) {
//       //   return false;
//       // }
//     }
//   }
//   result = stack.length === 0 ? !result : result;
//   return result
// }

// console.log(isValidParentheses('(())') ? 'OK' : 'ERROR')

// ______________________________________________________________________________

// function textToAlphabetPos(text) {
//   let result = text.toUpperCase().split(' ').map( el => el.split('').map( el => el.charCodeAt() - 64).join(' ')).join('   ');

// let a = text.toUpperCase().split(' ')  //[ 'ABC', 'BB', 'XYZ' ]

// let b = a.map( el => {
//   let sss = el.split('')
//   let aaa = sss.map( el => el.charCodeAt() - 64)
//   return aaa.join(' ');

//   // for(bukva of el) {
//   //   (bukva.charCodeAt() - 64)
//   // }

// })

// console.log(b.join('   '));

//   return result; // '1 2 3   2 2   24 25'
// }

// console.log(textToAlphabetPos('abc bb xyz'))

// ______________________________________________________________________________

// function renderField(field) {
//   let output = ''
//   let numberToSymbol = field.map( el => {
//     if(el === 1) {
//       return 'x'
//     } else if(el === -1) {
//       return '0'
//     } else if(el === 0) {
//       return ' '
//     }
//   })
//     output += ` ${numberToSymbol[0]} | ${numberToSymbol[1]} | ${numberToSymbol[2]} ` + '\n';
//     output += `---+---+---` + '\n';
//     output += ` ${numberToSymbol[3]} | ${numberToSymbol[4]} | ${numberToSymbol[5]} ` + '\n';
//     output += `---+---+---` + '\n';
//     output += ` ${numberToSymbol[6]} | ${numberToSymbol[7]} | ${numberToSymbol[8]} ` + '\n';
// console.log(output);
//      return output;
// }
// renderField([
//   0, 0, 0,
//   0, 0, 0,
//   0, 0, 0,
//  ])

// _____________________________________

// function gameStatus(field) {
//   let winCombine = [
//     [1, 1, 1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, 1, 1, 1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, 1, 1, 1],
//     [1, -1, -1, 1, -1, -1, 1, -1, -1],
//     [-1, 1, -1, -1, 1, -1, -1, 1, -1],
//     [-1, -1, 1, -1, -1, 1, -1, -1, 1],
//     [1, -1, -1, -1, 1, -1, -1, -1, 1],
//     [-1, -1, 1, -1, 1, -1, 1, -1, -1],
//   ];
//   let status = () => {
//     // for (let i = 0; i < winCombine.length; i++) {
//     //   if (field[i] === 1 || field[i] === -1 && winCombine.map(el => el[i] === 1)) {
//     //     return 'end'
//     //   } else {
//     //     return 'play'
//     //   }
//     // }
//     let result = winCombine.filter((winArr, i) => {
//       if ((winArr[i] === 1 && field[i] === 1) || field[i] === -1) {
//         return "end";
//       } else {
//         return "play";
//       }
//     });
//     return result;
//   };
//   console.log(status());

//   return "some status";
// }

// gameStatus([
//   1, 0, -1,
//   0, 1, -1,
//   0, 0, 0 ]);

// _________________________________________________

// function renderField(field) {
//   let output = '';
//   const symbols = {
//       '1': 'x',
//       '-1': '0',
//       '0': ' '
//   }
//   let numberToSymbol = field.map( el => {return symbols[el]})
//   output += ` ${numberToSymbol[0]} | ${numberToSymbol[1]} | ${numberToSymbol[2]} ` + '\n';
//   output += `---+---+---` + '\n';
//   output += ` ${numberToSymbol[3]} | ${numberToSymbol[4]} | ${numberToSymbol[5]} ` + '\n';
//   output += `---+---+---` + '\n';
//   output += ` ${numberToSymbol[6]} | ${numberToSymbol[7]} | ${numberToSymbol[8]} ` + '\n';
//   return output;
// }
// console.log(renderField([
// 1, 0, 0,
// -1, 0, 0,
// 0, 1, -1
// ]))

// _________________________________________________

// function printTask(index, task) {
// let output = ``
//   output += `${index}. `
//   output += `${task.done === true ? '[x]' : '[ ]'}`
//   output += `${task.title ? ` ${task.title}` : ''}`
//   output += `${task.dueDate ? ` (${task.dueDate.toDateString().slice(4,10)})` : ''}`
//   output += `
//    ${task.desc ? task.desc : ''}`
//   console.log(output);
// }

// printTask(4, {done: true, title: 'Objects', dueDate: new Date('2022-07-13'), desc: 'Learn more about this'})

// ________________________________________________________
'use strict'

class Task {
  constructor(attributes) {
      Object.assign(this, attributes);
      this.id;
      this.done = false;
      this.title;
      this.dueDate;
      this.desc;
  }
  toggle() {
    this.done = !this.done
  }

  isOverdue() {
    return this.dueDate < new Date ? true : false
  }

  postpone({days}) {
    this.dueDate.setDate(this.dueDate.getDate() + days)
  }

  toString() {
    let output = ``
    output += `${this.id}. `
    output += `${this.done ? '[x]' : '[ ]'}`
    output += `${this.title ? ` ${this.title}` : ''}`
    output += `${this.dueDate ? ` (${this.dueDate.toDateString().slice(4,10)})` : ''}`
    output += `
    ${this.desc ? this.desc : ''}`
    return output;
  }
}

let start = new Date('2022-01-17');
let task = new Task({dueDate: start});
task.postpone({days: 2})
console.log(task.dueDate.toDateString());