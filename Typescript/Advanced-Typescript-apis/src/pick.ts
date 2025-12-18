interface User {
    id: number
    name: string
    username: string
    email: string,
    password: string
}

// The Pick utility type in TypeScript allows us to create types that are subsets of existing types. 

// Creating a new type with only `name` and `email` properties from `User`
type userProfile = Pick<User, "name" | "email">


// Function that accepts a UserProfile type
function displayUserProfile(user: userProfile) {
    console.log(`Name: ${user.name} Email: ${user.email}`);
}

displayUserProfile({ name: "jyotishman", email: "jyoti@gmail.com" })