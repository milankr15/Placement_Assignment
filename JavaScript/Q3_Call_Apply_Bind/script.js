// Call Method
const person = { name: 'Milan', age: 26 };
function greet(greeting) { console.log(`${greeting}, ${this.name}`); }
greet.call(person, 'Good Morning');

// Apply Method
const person1 = { name: 'Milan', age: 26 };
function greet1(greeting) { console.log(`${greeting}, ${this.name}`); }
greet1.apply(person1, ['Good Morning']);

// Bind Method
const person2 = { name: 'Milan', age: 26 };
function greet2(greeting) { console.log(`${greeting}, ${this.name}`); }
const greetPerson = greet2.bind(person, 'Good Morning');
greetPerson();