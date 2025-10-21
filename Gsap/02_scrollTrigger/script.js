// gsap.from("#page-1 #box", {
//     scale: 0,
//     delay: 1,
//     duration: 2,
//     rotate: 360,
//     backgroundColor: "blue"
// })

// gsap.from("#page-2 h1", {
//     opacity: 0,
//     x: 500,
//     duration: 1,
//     scrollTrigger: {
//         trigger: "#page-2 h1",
//         scroller: "body",
//         markers: true,
//         start: "top 50%",
//         end: "top 20%",
//         scrub: 2,
//         pin: true
//     }
// })



// practice 2
gsap.to("#page-2 h1", {
    transform: "translateX(-110%)",
    scrollTrigger: {
        trigger: "#page-2",
        scroller: "body",
        markers: true,
        start: "top 0%",
        end: "top -150%",
        scrub: 2,
        pin: true
    }
})


