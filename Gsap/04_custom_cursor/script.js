let main = document.querySelector("#main");
let cursor = document.querySelector("#cursor");
let img = document.querySelector("#img");

main.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.x,
        y: e.y,
        duration: 0.8
    })
});

img.addEventListener("mouseenter", () => {
    cursor.innerHTML = "View More"
    gsap.to(cursor, {
        scale: 3,
        backgroundColor: "#ffffff5c"
    })
})

img.addEventListener("mouseleave", () => {
    cursor.innerHTML = ""
    gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#fff"
    })
})