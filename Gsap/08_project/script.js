function page1Animation() {
    let tl = gsap.timeline();

    tl.from("#nav h1", {
        opacity: 0,
        y: -30,
        duration: 0.6,
        delay: 1
    });

    tl.from("#categories h4", {
        opacity: 0,
        y: -30,
        duration: 0.7,
        stagger: 0.15
    });

    tl.from("#categories button", {
        opacity: 0,
        duration: 0.7
    });

    tl.from("#center-part-1 h1", {
        x: -200,
        opacity: 0,
        duration: 0.6
    })

    tl.from("#center-part-1 p", {
        x: -100,
        opacity: 0,
        duration: 0.6
    });

    tl.from("#center-part-1 button", {
        opacity: 0,
        duration: 0.7
    });

    tl.from("#center-part-2 img ", {
        opacity: 0,
        duration: 0.5,
        x: 200
    }, "-=0.5");

    tl.from("#logo-section img", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15
    })
}


function page2Animation() {
    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "section",
            scroller: "body",
            start: "top 50%",
            end: "top 0%",
            scrub: 2,
        }
    })

    tl2.from("#services", {
        y: 30,
        opacity: 0,
        duration: 0.5
    })

    tl2.from("#elem1", {
        x: -300,
        opacity: 0,
        duration: 1
    }, "anim1");

    tl2.from("#elem2", {
        x: 300,
        opacity: 0,
        duration: 1
    }, "anim1");

    tl2.from("#elem3", {
        x: -300,
        opacity: 0,
        duration: 1
    }, "anim2");

    tl2.from("#elem4", {
        x: 300,
        opacity: 0,
        duration: 1
    }, "anim2")
}

page1Animation();
page2Animation();