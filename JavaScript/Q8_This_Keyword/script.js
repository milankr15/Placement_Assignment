// function defined as method on a object has its context set as person object

const person = {
    name: 'Milan',
    greet: function () {
        console.log(`Hello, My Name is ${this.name}`);
    }
};

person.greet(); // Output: Hello, My Name is Milan
