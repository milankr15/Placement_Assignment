// Event Bubbling
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');
const button = document.getElementById('button');

button.addEventListener('click', function (event) {
    console.log('Button clicked');
});

inner.addEventListener('click', function () {
    console.log('Inner clicked');
});

outer.addEventListener('click', function () {
    console.log('Outer clicked');
});

const outer1 = document.getElementById('outer1');
const inner1 = document.getElementById('inner1');
const button1 = document.getElementById('button1');

button1.addEventListener('click', function () {
    console.log('Button1 clicked');
});

inner1.addEventListener('click', function () {
    console.log('Inner1 clicked');
});

outer1.addEventListener(
    'click',
    function () {
        console.log('Outer1 clicked');
    },
    true // Specify the third parameter as true for event capturing
);
