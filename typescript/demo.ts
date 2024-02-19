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

// Conditional Types
type Example1 = Dog extends Animal ? number : string;
// type Example1 = number;

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

// Utility Types
// TypeScript provides several utility types to facilitate
// common type transformations

// Awaited<Type>
// This type is meant to model operations like await in async functions
type A = Awaited<Promise<string>>;
// type A = string

// Partial<Type>
// Constructs a type with all properties
// of Type set to optional
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
  description: 'throw out trash',
});

// Required<Type>
// Constructs a type consisting of all properties
// of Type set to required
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 };
// Property 'b' is missing in type '{ a: number; }' but
// required in type 'Required<Props>'.

// Readonly<Type>
// Constructs a type with all properties of Type set to readonly
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
};

todo.title = 'Hello';
// Cannot assign to 'title' because it is a read-only property.

// Record<Keys, Type>
// Constructs an object type whose property
// keys are Keys and whose property values are Type
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};

cats.boris;

// const cats: Record<CatName, CatInfo>;

// decorator @sealed
function sealed(target) {
  // do something with 'target' ...
}

// declaration merging
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };

// for..of
let someArray = [1, 'string', false];
for (let entry of someArray) {
  console.log(entry); // 1, "string", false
}

// for..of vs. for..in
let list = [4, 5, 6];
for (let i in list) {
  console.log(i); // "0", "1", "2",
}
for (let i of list) {
  console.log(i); // 4, 5, 6
}

// Encapsulation
// class Character {
//   private _name: string;

//   constructor(name: string) {
//     this._name = name;
//   }

//   public get name(): string {
//     return this._name;
//   }

//   public set name(value: string) {
//     this._name = value;
//   }
// }

// Abstraction
// abstract class Character {
//   public name: string;
//   public damage: number;
//   public attackSpeed: number;

//   constructor(name: string, damage: number, speed: number) {
//     this.name = name;
//     this.damage = damage;
//     this.attackSpeed = speed;
//   }

//   public abstract damagePerSecond(): number;
// }

// class Goblin extends Character {
//   constructor(name: string, damage: number, speed: number) {
//     super(name, damage, speed);
//   }

//   public damagePerSecond(): number {
//     return this.damage * this.attackSpeed;
//   }
// }

// Inheritance
// class Character {
//   public name: string;
//   public damage: number;

//   constructor(name: string, damage: number) {
//     this.name = name;
//     this.damage = damage;
//   }

//   public talk(): void {
//     console.log('Says something ...');
//   }
// }

// class Orc extends Character {
//   public weapon: string;

//   constructor(name: string, damage: number, weapon: string) {
//     super(name, damage);

//     this.weapon = weapon;
//   }

//   public attack(): void {
//     console.log(`Attacks his target with his ${this.weapon}.`);
//   }
// }

// Polymorphism
class Character {
  public name: string;
  public damage: number;

  constructor(name: string, damage: number) {
    this.name = name;
    this.damage = damage;
  }

  public talk(): void {
    console.log('Says something ...');
  }

  public attack(): void {
    console.log(`Attacks his target with his fists.`);
  }
}

class Orc extends Character {
  public weapon: string;

  constructor(name: string, damage: number, weapon: string) {
    super(name, damage);

    this.weapon = weapon;
  }

  public talk(): void {
    console.log('Says something but in orcish ...');
  }

  public attack(): void {
    console.log(`Attacks his target with his ${this.weapon}.`);
  }
}

// The promise syntax
const angelMowersPromise = new Promise<string>((resolve, reject) => {
  // a resolved promise after certain hours
  setTimeout(() => {
    resolve('We finished mowing the lawn');
  }, 100000); // resolves after 100,000ms
  reject("We couldn't mow the lawn");
});

// Sequential execution with .then
angelMowersPromise
  .then(() => myPaymentPromise.then((res) => console.log(res)))
  .catch((error) => console.log(error));

// async/await
const myAsync = async (): Promise<Record<string, number | string>> => {
  await angelMowersPromise;
  const response = await myPaymentPromise;
  return response;
};

const baseApi = 'https://reqres.in/api/users?page=1';
const userApi = 'https://reqres.in/api/user';

const fetchAllEmployees = async (url: string): Promise<Employee[]> => {
  const response = await fetch(url);
  const { data } = await response.json();
  return data;
};

const fetchEmployee = async (
  url: string,
  id: number
): Promise<Record<string, string>> => {
  const response = await fetch(`${url}/${id}`);
  const { data } = await response.json();
  return data;
};
const generateEmail = (name: string): string => {
  return `${name.split(' ').join('.')}@company.com`;
};

const runAsyncFunctions = async () => {
  try {
    const employees = await fetchAllEmployees(baseApi);
    Promise.all(
      employees.map(async (user) => {
        const userName = await fetchEmployee(userApi, user.id);
        const emails = generateEmail(userName.name);
        return emails;
      })
    );
  } catch (error) {
    console.log(error);
  }
};
runAsyncFunctions();
