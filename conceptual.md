### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

**Callbacks:** One of the earliest methods for handling asynchronous code. You pass a function (callback) to another function, which will be invoked once the asynchronous operation completes.

**Async/Await:** Also introduced in ES6, async/await provides a more readable and synchronous-like way to write asynchronous code. The async keyword is used to define a function that returns a promise, and the await keyword is used to pause the execution of the function until the promise is resolved.


- What is a Promise?

A promise is an object representing the eventual completion or failure of an asynchronous operation

- What are the differences between an async function and a regular function?

**Async functions** provide a cleaner and more concise way to write asynchronous code in JavaScript, making it easier to handle asynchronous operations and improving code readability. They leverage promises and the async/await syntax to simplify asynchronous programming compared to using callbacks or promise chaining with regular functions.

- What is the difference between Node.js and Express.js?

**Node.js** is a JavaScript runtime environment for executing JavaScript code on the server-side, while **Express.js** is a web application framework built on top of Node.js, providing a more structured and streamlined way to build web servers and APIs. Express.js simplifies common tasks associated with web development and allows developers to focus on building the core features of their applications.

- What is the error-first callback pattern?

The error-first callback pattern is a convention widely used in Node.js and JavaScript for handling asynchronous operations and passing errors between functions.

- What is middleware?

Middleware is a term used in web development, particularly in frameworks like Express.js, to describe functions that have access to the request and response objects in an HTTP request-response cycle. Middleware functions are invoked sequentially in the order they are defined, and they can modify the request or response objects, end the request-response cycle, or call the next middleware function in the stack.

- What does the `next` function do?

In the context of middleware in Express.js, the next function is a callback function that is passed to each middleware function in the middleware stack. It is used to pass control from one middleware function to the next middleware function in the stack.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

There are several issues with the provided code:

Performance: The code is making three separate HTTP requests sequentially, which can lead to poor performance, especially if the requests are independent and could be made concurrently.

Structure: The code violates the DRY (Don't Repeat Yourself) principle by repeating similar code for each API request. This makes the code less maintainable and harder to read.

Error Handling: There's no error handling in the code. If any of the API requests fail, the function will not handle the errors, potentially leaving the application in an inconsistent state.

Naming: The variable names (elie, joel, matt) are not descriptive and don't convey their purpose clearly. Better variable names would improve the readability of the code.

Dependency: The code relies on an external library ($.getJSON) without explicitly mentioning its source. It's unclear where $.getJSON is coming from, which could lead to issues if the library changes or is removed.


```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
