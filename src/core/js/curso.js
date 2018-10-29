// // function counter(interval, name) {
// //   this.seconds = 1
// //   setInterval(() => {
// //     console.log(`${name} ${this.seconds++}`)
// //   }, interval)
// // }
// // let contadorzinho = new counter(1000, 'TUM')
// // new counter(1000/3, 'TAAA TAAA')


// const counter = (interval, name) => {
//   let seconds = 1
//   setInterval(() => {
//     console.log(`${name} ${seconds++}`)
//   }, interval)
// }
// // let contadorzinho = new counter(500, 'TUM')
// // new counter(500/3, 'TAAA TAAA')

// // function counter() {
// //   this.seconds = 1
// //   setInterval(function() {
// //     console.log(this.seconds++)
// //   }.bind(this), 1000)
// // }
// // new counter

// // function Pessoa() {
// //   this.idade = 0
// //   setInterval(function() {
// //     this.idade++
// //     console.log(this.idade)
// //   }.bind(this), 1000)
// // }
// // Pessoa()


const objEx = ({nome = 'Desconhecido', idade = 0, nacionalidade='LOL'}) => {
  return {nome, idade, nacionalidade}
}

let obj1 = new objEx({nome: 'João', idade: 27, nacionalidade: 'First'})

// setInterval(() => {
//   ++obj1.idade
//   obj1.nacionalidade = obj1.idade >= 30 ? 'Brasileiro' : 'Desconhecido'
//   console.log(obj1)
// }, 1000)
// console.log(obj1)

const avo = {
  nome:'João',
  sobrenome: 'Silva',
  familia: 'Lima',
  nome_print: function() {
    return `${this.nome} ${this.sobrenome} ${this.familia} ${this.nacionalidade}`
  }
}
const pai = {
  __proto__: avo,
  nome:'Ricardo',
  sobrenome: 'Messias'
}
const filho = {
  __proto__: pai,
  nome:'Luiz'
}

avo.nacionalidade = 'Brasileiro'

console.log(filho.nome_print())
