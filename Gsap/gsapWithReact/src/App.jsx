import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

function App() {
  const [circle, setCircle] = useState(0);
  const random = gsap.utils.random(-500, 500, 10);

  // const gref = useRef();
  // useGSAP(() => {
  //   gsap.from(gref.current, {
  //     opacity: 0,
  //     rotate: 360,
  //     duration: 1,
  //     delay: 1
  //   })
  // })
  useGSAP(() => {
    gsap.to(".circle", {
      x: circle,
      duration: 0.5,
    })
  }, [circle])

  return (
    <main>

      {/* <div className="container">
        <div className="circle"></div>
        <div class="box"></div>
      </div>
      <div className="container-2">
        <div className="circle"></div>
        <div class="box"></div>
      </div> */}

      <button onClick={() => {
        setCircle(random)
      }}>Animate</button>
      <div className="circle"></div>
    </main>
  )
}

export default App
