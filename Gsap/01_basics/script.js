// gsap.to("#box", {
//     x: 1000,
//     duration: 2,
//     delay: 1,
//     rotate: 360,
//     backgroundColor: "blue",
//     borderRadius: "50%"
// })

// gsap.from("#box2", {
//     x: 1000,
//     duration: 2,
//     delay: 1,
//     rotate: 360,
//     backgroundColor: "pink",
//     borderRadius: "50%"
// })

gsap.from("h1", {
    opacity: 0,
    duration: 2,
    delay: 1,
    y: 20,
    stagger: 0.3,
    // repeat: -1,   //infinite time
    // yoyo: true    
})



// Timeline

// bad practice
// gsap.to("#box", {
//     x: 1200,
//     duration: 2,
//     delay: 1,
//     rotate: 360
// })

// gsap.to("#box2", {
//     x: 1200,
//     duration: 2,
//     delay: 3,
//     rotate: 360
// })


// var tl = gsap.timeline();

// tl.to("#box", {
//     x: 1200,
//     duration: 2,
//     delay: 1,
//     rotate: 360
// })

// // Now we don't give delay, because it is within the automatic timeline and things run in sync within the timeline
// tl.to("#box2", {
//     x: 1200,
//     duration: 2,
//     rotate: 360
// })

// tl.to("#box3", {
//     x: 1200,
//     duration: 2,
//     rotate: 360
// })


// practice
var tl = gsap.timeline();

tl.from("h2", {
    opacity: 0,
    y: -20,
    duration: 0.5,
    delay: 1
})

tl.from("#categories h4", {
    opacity: 0,
    y: -20,
    duration: 0.5,
    stagger: 0.3
})

tl.from("h1", {
    // opacity: 0,
    y: 20,
    scale: 0.2,
    duration: 0.5,
})