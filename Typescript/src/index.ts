let x: number = 50;

// x = "jyoti"       /* error */
console.log(x);


function greet(name: string) {
    console.log(`hello ${name}`);
}

greet("jyoti")

// here a: number, b: number, and also return number
// so best practice is give :number for return type
// Otherwise it also fetch from return statment

function sum(a: number, b: number): number {
    return a + b
}

const value = sum(2, 5);
console.log(value);


// function sum2(a: number, b: number): number {
//     return a + b
// }

// const value2 = sum2(2, "5");
// console.log(value2);


const isLegal = (age: number): boolean => {
    if (age > 18) {
        return true
    } else {
        return false
    }
}

isLegal(25) ? console.log("true") : console.log("false");



function After3sec(fn: () => void, time: number) {
    setTimeout(fn, time)
}

After3sec(function () {
    console.log("jyoti");
}, 3000)