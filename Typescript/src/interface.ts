
// syntax
/*
*   interface [name] {              // no need to equal sign after name
*    ...
*    }
*/



interface User {
    firstName: string,
    lastName: string,
    age: number
    email?: string  // This indicates that the email property is optional
}

function greet1(user: User) {
    console.log(user.firstName);
}

greet1({
    firstName: "jyoti",
    lastName: "das",
    age: 22
})

function greet2(user: User) {
    console.log(user.firstName);
}

greet2({
    firstName: "rita",
    lastName: "das",
    age: 53
})