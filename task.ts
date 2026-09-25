type User = {
    id: number,
    name: string,
    role: "user"
}

type Admin = {
    id: number,
    name: string,
    role: "admin",
    permissions: string[]
}

type SingleUser = User | Admin

const userJan: User = {
    id: 1,
    name: "Jan",
    role: "user"
}

const userAnna: Admin = {
    id: 2,
    name: "Anna",
    role: "admin",
    permissions: ["users:read", "users:delete"]
}

function describeUser(user: SingleUser): string{
    if(user.role === "user"){
        return `User: ${user.name}`
    }else{
        return `Admin: ${user.name}, permissions: ${user.permissions.length}`
    }
}


function isAdmin(value: unknown): value is Admin {
    if (typeof value !== "object" || value === null) { return false; }

    if (!("role" in value)) { return false; }

    if (value.role !== "admin") { return false; }

    if (!("id" in value)) { return false; }

    if (typeof(value.id) !== "number"){ return false; }

    if (!("name" in value)) { return false; }

    if (typeof(value.name) !== "string") { return false; }

    if (value.name.length === 0) {return false; }

    if (!("permissions" in value)) { return false; }

    if (!(Array.isArray(value.permissions))) { return false; }

    if (!(value.permissions.every(elem => typeof(elem) === "string"))){ return false; }

    return true;
}

function getName(data: unknown): string {

    const errorMessage: string = 'input is not recognized';

    if(typeof(data) !== "object" || data === null){ return errorMessage; }

    if(!("name" in data)){ return errorMessage; }

    if(typeof(data.name) !== "string"){ return errorMessage;}

    return data.name;
}

//console.log(isAdmin(userAnna));

//console.log(getName(userJan));

// --------------------------- //

type partialUser = Partial<Admin>;

const updatePartialName: partialUser = {
    name: "test 123"
}

type requiredUser = Required<Admin>;

const updateRequiredUser: requiredUser = {
    name: "Michał",
    id: 2,
    role: "admin",
    permissions: ["user:execute"]
}

type readonlyUser = Readonly<User>;

const userKamil: readonlyUser = {
    id: 1,
    name: 'Kamil',
    role: 'user'
}

//console.log(userKamil);

// ---------------------------- //

function identity<T>(value: T): T{
    return value;
}

function first<T>(items: T[]): T | undefined{
    
    return items[0];
}

//console.log(first([1, 2, 3]));
//console.log(first(["a", "b", "c"]));
//console.log(first([]));


function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = {
    id: 10,
    name: "Jan",
    age: 25
};

//console.log(typeof(getProperty(user, "name")));
//console.log(typeof(getProperty(user, "age")));
//console.log(typeof(getProperty(user, "id")));

// ------------------------------ // 
// Intersections (&)
type A = {
    id: number;
};

type B = {
    name: string;
};

type C = A | B;
type D = A & B;

const x = { id: 1 };
const y = { name: "Jan" };
const z = { id: 1, name: "Jan" };

// ----------- NARROWING -------- //

function printValue( value: string | number ){
    if(typeof(value) === "string"){
        console.log(value.toUpperCase());
    }else{
        console.log(`NUMBER: ${value}`)
    }
}

printValue("hello");
printValue(42);