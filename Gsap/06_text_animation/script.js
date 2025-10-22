function breakText() {
    let h1 = document.querySelector("h1");
    let text = h1.textContent;

    let splitText = text.split("");
    let halfValue = Math.floor(splitText.length / 2)
    let clutter = ""

    splitText.forEach((e, id) => {
        if (id < halfValue) {
            clutter += `<span class="a">${e}</span>`
        } else {
            clutter += `<span class="b">${e}</span>`
        }
    });

    h1.innerHTML = clutter
}

breakText()

gsap.from(".a", {
    opacity: 0,
    y: 50,
    duration: 0.7,
    delay: 0.5,
    stagger: 0.15,
})
gsap.from(".b", {
    opacity: 0,
    y: 50,
    duration: 0.7,
    delay: 0.5,
    stagger: -0.15,
})