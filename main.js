let x = 100;
let y = 100;

let moveTopBy = y;
let moveLeftBy = x;

let scaleX = 1;
let scaleY = 1;

let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;
let arrowUp = false;

let downEdge = false;
let leftEdge = false;
let rightEdge = false;
let upEdge = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") arrowDown = true;
  if (e.key === "ArrowLeft") arrowLeft = true;
  if (e.key === "ArrowRight") arrowRight = true;
  if (e.key === "ArrowUp") arrowUp = true;
  if (e.key === "Space") arrowUp = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowDown") arrowDown = false;
  if (e.key === "ArrowLeft") arrowLeft = false;
  if (e.key === "ArrowRight") arrowRight = false;
  if (e.key === "ArrowUp") arrowUp = false;
});

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    const Text = document.getElementById("text");
    const Ball = document.getElementById("ball");
    const Outer = document.getElementById("outer");
    const Inner = document.getElementById("inner");
    const Letter = document.getElementById("letter");
    Ball.style.top = y;
    Ball.style.left = x;

    let word = "";
    let letters = [];
    let digitTimer;
    let wordTimer;

    function showText() {
      word = letters.join().replaceAll(",", "");
      Text.innerHTML = word;
      Text.classList.remove("showing");
      void Text.offsetWidth;
      Text.classList.add("showing");
      clearTimeout(wordTimer);
      wordTimer = setTimeout(() => {
        Text.classList.remove("showing");
      }, 1000);
      letters = [];
      Inner.classList.remove("hide");
      Letter.classList.remove("show");
    }

    document.addEventListener("keypress", (e) => {
      if (e.key === " ") {
        Outer.classList.remove("pulse");
        void Outer.offsetWidth;
        Outer.classList.add("pulse");
        navigator.vibrate(100);
      }

      const key = e.key.toLowerCase();
      const isLetter = key >= "a" && key <= "z" && key !== "enter";

      Inner.classList.remove("hide");
      Letter.classList.remove("show");
      void Inner.offsetWidth;
      void Letter.offsetWidth;

      if (isLetter || e.key === "?" || e.key === " " || e.key === "!") {
        Inner.classList.add("hide");
        Letter.classList.add("show");
        Letter.innerHTML = e.key;
        letters.push(e.key);
        clearTimeout(digitTimer);
        digitTimer = setTimeout(() => {
          showText();
        }, 300);
      }
    });

    let innerXMov = 0;
    let innerYMov = 0;
    let idle = false;

    setInterval(() => {
      scaleX = 1;
      scaleY = 1;

      idle = innerYMov === 0 && innerXMov === 0;
      downEdge = innerYMov === 12;
      upEdge = innerYMov === -12;
      rightEdge = innerXMov === 12;
      leftEdge = innerXMov === -12;

      if (arrowDown) {
        if (innerYMov < 12) innerYMov += 1;
      } else {
        if (innerYMov > 0) innerYMov -= 1;
      }

      if (arrowUp) {
        if (innerYMov > -12) innerYMov -= 1;
      } else {
        if (innerYMov < 0) innerYMov += 1;
      }

      if (arrowLeft) {
        if (innerXMov > -12) innerXMov -= 1;
      } else {
        if (innerXMov < 0) innerXMov += 1;
      }

      if (arrowRight) {
        if (innerXMov < 12) innerXMov += 1;
      } else {
        if (innerXMov > 0) innerXMov -= 1;
      }

      if (downEdge) {
        moveTopBy += 10;
        scaleX = 0.75;
        scaleY = 1.25;
      }
      if (upEdge) {
        moveTopBy -= 10;
        scaleX = 0.75;
        scaleY = 1.25;
      }
      if (leftEdge) {
        moveLeftBy -= 10;
        scaleY = 0.75;
        scaleX = 1.25;
      }
      if (rightEdge) {
        moveLeftBy += 10;
        scaleY = 0.75;
        scaleX = 1.25;
      }

      if (idle) {
        Inner.classList.add("idle");
      } else {
        Inner.classList.remove("idle");
      }

      Ball.style.transform = `translate(${moveLeftBy}px, ${moveTopBy}px)`;
      Outer.style.transform = `scale(${scaleX}, ${scaleY})`;

      Inner.style.transform = `translate(${innerXMov}px, ${innerYMov}px)`;
    }, 10);
  }
};
