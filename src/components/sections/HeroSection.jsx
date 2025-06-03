import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../MarqueeSection/Marquee.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // Animate background and margins
    gsap.to(el, {
      backgroundColor: "#000000",
      marginLeft: "-200px",
      marginTop: "-200px",
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top+=700 center",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });

    // Animate text color inside the section
    const textEls = el.querySelectorAll("h2, p, .text-black");

    gsap.to(textEls, {
      color: "#ffffff",
      scrollTrigger: {
        trigger: el,
        start: "top+=600 center",
        end: "bottom bottom",
        scrub: true,
      },
    });

  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen bg-gray-100 overflow-hidden border-4 border-black rounded-lg transition-all duration-700 ease-in-out"
      style={{ willChange: "background-color, margin, color" }}
    >
      <div className="relative w-full h-full">
        {/* Top Left Text Block */}
        <div className="absolute top-8 left-8 w-80 text-black">
          <h2 className="text-lg font-bold mb-2 tracking-wider">THE FUTURE IS UPON US</h2>
          <p className="text-sm leading-tight">
            Not what we dreamed of? Killer Machines, Cyborg Assassins, Neuro Hacking, Quantum Control...
          </p>
        </div>

        {/* Top Right Text Block */}
        <div className="absolute top-8 right-8 w-80 text-black text-right">
          <h2 className="text-lg font-bold mb-2 tracking-wider">PREDICTION 2075</h2>
          <p className="text-sm leading-tight">
            Will the A.I conquer humans and make them slaves or will the humans prevail...
          </p>
        </div>

        {/* Main CYBERPUNK Title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <Marquee />
        </div>

        {/* Central Character Image */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-96 h-[600px] z-10">
          <img
            src="/CE40D70C-A7B0-4E32-B145-01205D9FFCE1-removebg-preview 1.svg"
            alt="Cyberpunk Character"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Bottom Left - Scroll Down Text */}
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center space-x-4 mb-4 text-black font-bold">
            SCROLL DOWN
          </div>
        </div>

        {/* Bottom Right - Small Character Preview */}
        <div className="absolute bottom-0 right-8">
          <div className="w-24 h-32 bg-black border-2 border-black overflow-hidden">
            <img
              src="/CE40D70C-A7B0-4E32-B145-01205D9FFCE1-removebg-preview 1.svg"
              alt="Character Preview"
              width={96}
              height={128}
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
