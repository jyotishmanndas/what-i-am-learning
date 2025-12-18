
// Ugly approach

// interface Car {
//     name: string;
//     model: string
// }

// type Cars = {
//     [key: string]: Car
// }

// const car: Cars = {
//     "1": {
//         name: "Toyota",
//         model: "Fortuner"
//     },
//     "2": {
//         name: "Range Rover",
//         model: "Discovery"
//     }
// }

// console.log(car);


// Better approach

// The Record<K, T> utility type is used to construct a type with a set of properties K of a given type T. It provides a cleaner and more concise syntax for typing objects when you know the shape of the values but not the keys in advance.

interface Car {
    name: string;
    model: string;
}

// Using Record to type an object with string keys and Car values
type Cars = Record<string, Car>


const car: Cars = {
    "1": {
        name: "Toyota",
        model: "Fortuner"
    },
    "2": {
        name: "Range Rover",
        model: "Autobiography"
    }
}

console.log(car);


// The Map object in TypeScript (inherited from JavaScript) represents a collection of key-value pairs where both the keys and values can be of any type. Maps remember the original insertion order of the keys, which is a significant difference from plain JavaScript objects.


interface user {
    id: number
    name: string,
}

// Initialize an empty Map with string keys and User values
const userMap = new Map<string, user>();

// Add users to the map using .set
userMap.set("1", { id: 1, name: "jyotishman" });
userMap.set("2", { id: 2, name: "rita das" });


// Accessing a value using .get
console.log(userMap.get("1"));

