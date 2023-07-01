// Function Currying Example

function multiply(a, b, c) {
    return a * b * c;
}

// Currying The multiply function
function multiplyCurry(a) {
    return function (b) {
        return function (c) {
            return a * b * c;
        };
    };
}

// Using The Curried Function
const curriedMultiply = multiplyCurry(4); // Partially Ppplying The First Argument

const curriedMultiply1 = curriedMultiply(3); // Calling The Curried Function With The Second Argument

const result = curriedMultiply1(6); // Calling The Curried Function With The Third Argument

console.log(result); // Output: 72