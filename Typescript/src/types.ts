
// similar to interface
// types can not use for implementing class

// Q. Diff. between types & interfaces
//  ans. interfaces is used to implement from the class while types is used to union or intersection if we don't know the datatype then using union (|) and  if we want from both types/interfaces then use intersection (&)



type User2 = {           // must be needed = sign
    firstName: string,
    lastName: string,
    age: number
}

// 1. Unions
// Let’ say you want to print the id of a user, which can be a number or a string.


function printId(id: number | string) {     // we can use this for number or string
    console.log(id);
}

printId(10)


// ---- OR ----
// using type

type id = number | string

function printId1(id: id) {
    console.log(id);
}

printId1(50)
printId1("22")


// 2. Intersection
// What if you want to create a type that has every property of multiple types/ interfaces


type Employee = {
    name: string,
    startDate: Date
}

type Manager = {
    name: string,
    department: string
}

type TeamLead = Employee & Manager;

const t: TeamLead = {
    name: "jyotishman",
    startDate: new Date(),
    department: "Software Engineer"
}

console.log(t.department, t.name);
