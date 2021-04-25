import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from "gsap";

Splitting();

let DOM = {
  content: {
    whatever: {
      section: document.querySelector(".content__item--whatever"),
      paragraph: document.querySelector(".content__paragraph--whatever"),
      hover: document.querySelector(".content__hover--whatever"),
      get chars() {
        return this.paragraph.querySelectorAll(".word > .char, .whitespace");
      },
      underline: document.querySelector(".underline__background"),
      isVisible: true,
    }
  },
};

//TIMELINE
const timelineSettings = {
  staggerValue: 0.02,
  charsDuration: 0.5,
};

const timelineIn = gsap.timeline({ paused: true }).addLabel("start").staggerTo(
  DOM.content.whatever.chars,
  timelineSettings.charsDuration,
  {
    ease: "Power3.easeIn",
    y: "-5%",
  },
  timelineSettings.staggerValue,
  "start"
)
  .to(
    DOM.content.whatever.underline, {
      x: '0%',
  },
    'out'
)

const timelineOut = gsap.timeline({ paused: true }).addLabel("start").staggerTo(
  DOM.content.whatever.chars,
  timelineSettings.charsDuration,
  {
    ease: "Power3.easeIn",
    y: "0%",
  },
  timelineSettings.staggerValue,
  "start"
)
  .to(
    DOM.content.whatever.underline, {
      x: '100%',
  },
    'out'
).set(
  DOM.content.whatever.underline, {
    x: '-100%',
}
)


DOM.content.whatever.hover.addEventListener("mouseover", () => {
console.log("Mouse In")
  timelineIn.play()
})
DOM.content.whatever.hover.addEventListener("mouseout", () => {
  console.log("Mouse Out")
  timelineOut.play()
  // Reset Animation

  timelineIn.progress(0);
  timelineOut.progress(0);
})
