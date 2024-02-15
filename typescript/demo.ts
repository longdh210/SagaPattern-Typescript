// string
let s = 'Hello world';
// number
let n = 2024;
// boolean
let b = true;
// arrays
let arr = [1, 2, 3];

// any
let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';

// Type Annotations on Variables
let myName: string = 'Alice';
// Funcions
// Parameter type annotations
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}
// Return type annotations
function getFavoriteNumber(): number {
  return 26;
}
// Return promises
async function getPromise(): Promise<number> {
  return 26;
}
// Anonymous functions
const names = ['Alice', 'Bob', 'Eve'];
// Contextual typing for function - parameter s
// inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

// Object Types
// The parameter's type annotation is an object type
// function printCoord(pt: { x: number; y: number }) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
// printCoord({ x: 3, y: 7 });
// Union Types
function printId(id: number | string) {
  if (typeof id === 'string') {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

// Type Aliases
// type Point = {
//   x: number;
//   y: number;
// };
// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
// printCoord({ x: 100, y: 100 });

// Interfaces
// the key distinction is that a type cannot be re-opened
// to add new properties vs an interface which is
// always extendable.
interface Point {
  x: number;
  y: number;
}
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });

// Type Assertions
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
// Literal Types
let changingString = 'Hello World';
changingString = 'Olá Mundo';
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
// let changingString: string;

const constantString = 'Hello World';
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;
// const constantString: 'Hello World';

// null and undefined
// strictNullChecks
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase());
  }
}
// non-null assertion operator
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

// big-int
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
// symbol
const firstName = Symbol('name');
const secondName = Symbol('name');
if (firstName === secondName) {
  // This comparison appears to be unintentional
  // because the types 'typeof firstName' and 'typeof
  // secondName' have no overlap.
  // Can't ever happen
}

// Keyof Type Operator
type Point = { x: number; y: number };
type P = keyof Point;
// type P = keyof Point;
// Typeof Type Operator
let s = 'hello';
let n: typeof s;
// let n: string;
// Indexed Access Types
type Person = { age: number; name: string; alive: boolean };
type Age = Person['age'];

type Age = number;

// Mapped Types
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
// Template Literal Types
type World = 'world';
type Greeting = `hello ${World}`;
// type Greeting = 'hello world';
