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
      isVisible: true,
    },
    somethingelse: {
      section: document.querySelector(".content__item--something"),
      paragraph: document.querySelector(".content__paragraph--something"),
      hover: document.querySelector(".content__hover--something"),
      get chars() {
        return this.paragraph.querySelectorAll(".word > .char, .whitespace");
      },
      isVisible: false,
    },
  },
};

//TIMELINE
const timelineSettings = {
  staggerValue: 0.02,
  charsDuration: 0.5,
};

const timelineW = gsap.timeline({ paused: true }).addLabel("start").staggerTo(
  DOM.content.whatever.chars,
  timelineSettings.charsDuration,
  {
    ease: "Power3.easeIn",
    y: "-100%",
    opacity: 0,
  },
  timelineSettings.staggerValue,
  "start"
);
const timelineS = gsap.timeline({ paused: true }).addLabel("start")
  .from(DOM.content.somethingelse.chars,{
    ease: "Power3.easeIn",
    y: "100%",
    opacity: 0,
  },
    "start"
  )
  .staggerTo(
  DOM.content.somethingelse.chars,
  timelineSettings.charsDuration,
  {
    ease: "Power3.easeIn",
    y: "0%",
    opacity: 1,
  },
  timelineSettings.staggerValue,
  "start"
)

const switchContentIn = function () {
  DOM.content.whatever.isVisible = !DOM.content.whatever.isVisible;
  DOM.content.somethingelse.isVisible = !DOM.content.whatever.isVisible;
  timelineW.play();
  if (!timelineW.isActive()) {
    DOM.content.whatever.paragraph.classList.remove("content__active");
    DOM.content.somethingelse.paragraph.classList.add("content__active");
  }
  timelineS.play()
};
const switchContentOut = function () {
  DOM.content.whatever.isVisible = !DOM.content.whatever.isVisible;
  DOM.content.somethingelse.isVisible = !DOM.content.whatever.isVisible;
  timelineS.reverse()
  if (!timelineS.isActive()) {
    DOM.content.somethingelse.paragraph.classList.remove("content__active");
    DOM.content.whatever.paragraph.classList.add("content__active");
  }
  timelineW.reverse();
};

DOM.content.whatever.hover.addEventListener("mouseover", () =>
  switchContentIn()
);
DOM.content.whatever.hover.addEventListener("mouseout", () =>
  switchContentOut()
);
