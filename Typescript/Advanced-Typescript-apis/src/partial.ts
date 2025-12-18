
// The Partial utility type in TypeScript is used to create a new type by making all properties of an existing type optional.


interface User {
    id: number;
    name: string;
    age: string;
    email: string;
    password: string;
};


// Selecting 'name', 'age', and 'email' properties from User
type UpdateProps = Pick<User, "name" | "email" | "password">


// Making the selected properties optional
type UpdatePropsOptional = Partial<UpdateProps>


// Function that accepts an object with optional 'name', 'age', and 'email' properties
function updateUser(updatedProps: UpdatePropsOptional) {
    // hit the database to update the user
}


// Example usage of updateUser
updateUser({ name: "Alice" }); // Only updating the name
updateUser({ email: "alice@example.com", password: "123456" }); // Updating password and email
updateUser({}); // No updates, but still a valid call