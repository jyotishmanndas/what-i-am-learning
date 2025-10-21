let finalPath = `M 10 100 Q 500 100 990 100`;
let path = `M 10 100 Q 500 100 990 100`;

let main = document.querySelector("#main");

main.addEventListener("mousemove", (e) => {
    path = `M 10 100 Q ${e.x} ${e.y} 990 100`;
    gsap.to("svg path", {
        attr: { d: path },
        duration: 0.3,
        ease: "power3.out"
    })
})

main.addEventListener("mouseleave", (e) => {
    gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 2,
        ease: "elastic.out(1,0.2)"
    })
})