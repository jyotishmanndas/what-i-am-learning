
// The Readonly utility type in TypeScript is used to make all properties of a given type read-only. This means that once an object of this type is created, its properties cannot be reassigned. It's particularly useful for defining configuration objects, constants, or any other data structure that should not be modified after initialization.

interface Config {
    readonly endpoint: string;
    readonly apiKey: string;
}


const config: Readonly<Config> = {
    endpoint: "http://api/openai.com",
    apiKey: "asdfgtr45gbv"
}

console.log(config);


// Attempting to modify the object will result in a TypeScript error
// config.apiKey = 'newkey'; // Error: Cannot assign to 'apiKey' because it is a read-only property.





// Extra
// const user = {
//     name: "jyotishman",
//     username: "jyoti",
//     age: 22
// }

// const userWithSex = {...user, sex: "male"}

// console.log(userWithSex);
