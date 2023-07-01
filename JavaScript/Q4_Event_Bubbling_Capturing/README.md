# Q4 Event Bubbling and Event Capturing Example


## Event Bubbling


```html
<div id="outer">
    <div id="inner">
        <button id="button">Click me</button>
    </div>
</div>
```


```javascript
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
```


## Event Capturing


```html
<div id="outer1">
    <div id="inner1">
        <button id="button1">Click me</button>
    </div>
</div>
```


```javascript
const outer1 = document.getElementById('outer1');
const inner1 = document.getElementById('inner1');
const button1 = document.getElementById('button1');

button1.addEventListener('click', function () {
    console.log('Button clicked');
});

inner1.addEventListener('click', function () {
    console.log('Inner clicked');
});

outer1.addEventListener(
    'click',
    function () {
        console.log('Outer clicked');
    },
    true // Specify the third parameter as true for event capturing
);
```