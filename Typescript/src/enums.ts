
// Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.


// enum Direction {
//     up,
//     down,
//     left,
//     right
// }


enum Direction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}

function jyoti(keypressed: Direction) {

    if (keypressed === Direction.Up) {
        console.log("I love my mom and dad");
        console.log(Direction.Up);
    }
}

jyoti(Direction.Up)



