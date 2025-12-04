
function myname<T>(name: T): T {
    return name
}

const output = myname<String>("jyoti");
const output2 = myname<number>(1);

console.log(output);
console.log(output2);


function getFirstElement<T>(arr: T[]): T {
    return arr[0]
}

const output3 = getFirstElement<string>(["Subodh", "rita"])
const output4 = getFirstElement<number>([5, 7, 12, 25])

console.log(output3.toUpperCase());
console.log(output4);

