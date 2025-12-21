// give square bracket [] after the data type so that it will known as array

function maxno(arr: number[]) {

    let max: number = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max
}

const Maxvalue = maxno([1, 2, 3]);

console.log(Maxvalue);



interface User3 {
    firstName: string,
    lastName: string,
    age: number
}


function filteredUser(user: User3[]) {
    const filter = user.filter((x) => x.age > 18)
    return filter
}


const filterAge = filteredUser([
    {
        firstName: "jyoti",
        lastName: "das",
        age: 20
    },
    {
        firstName: "Raman",
        lastName: "Singh",
        age: 16
    },
])

console.log(filterAge);

// Tuple
let userInfo: [string, number, boolean?]

userInfo=["jyoti", 22]
userInfo = ["jyoti", 22, true]

const chaiItems: [name: string, price:number] = ["Masala", 50]