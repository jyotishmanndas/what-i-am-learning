let tl = gsap.timeline();
let menu = document.querySelector("#menu");
let close = document.querySelector("#close");

tl.from("#nav h2", {
    opacity: 0,
    y: -30,
    duration: 1,
});

tl.from("#nav h4", {
    opacity: 0,
    y: -30,
    duration: 1,
});

// tl.to("#full", {
//     right: 0,
//     duration: 1,
// });

// tl.from("#full h4", {
//     x: 100,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.3
// });

// tl.from("#full i", {
//     opacity: 0,
// });

// tl.pause();

menu.addEventListener("click", () => {
    tl.to("#full", {
        right: 0,
        duration: 1,
    });
    tl.from("#full h4", {
        x: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.3
    });
    tl.from("#full i", {
        opacity: 0,
    });
    // tl.play()
});

close.addEventListener("click", () => {
    tl.to("#full", {
        right: "-40%",
        duration: 1,
    });
    // tl.reverse()
})