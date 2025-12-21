
// type assertion

let response: any = '42'

let numericLength: number = (response as string).length

console.log(numericLength);


type Book = {
    name: string
}

let bookString = '{"name": "who moved my cheese"}'

let bookObject = JSON.parse(bookString) as Book

console.log(bookObject);


function book(name: Book): string {
    return `${name.name}`
}

book({ name: "book" })


try {

} catch (error) {
    // console.log(error.message);   //gives error

    if (error instanceof Error) {
        console.log(error.message);
    }
}