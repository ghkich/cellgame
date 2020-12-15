let x = 100;
let y = 100;

let moveTopBy = y
let moveLeftBy = x

let scaleX = 1
let scaleY = 1

let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;
let arrowUp = false;

document.addEventListener('keypress', (e) => {
  if (e.key === ' ') {
    const Ball = document.getElementById('ball')
    Ball.classList.remove("pulse");
    void Ball.offsetWidth;
    Ball.classList.add('pulse')
    navigator.vibrate(100);
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') arrowDown = true
  if (e.key === 'ArrowLeft') arrowLeft = true
  if (e.key === 'ArrowRight') arrowRight = true
  if (e.key === 'ArrowUp') arrowUp = true
  if (e.key === 'Space') arrowUp = true
})

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowDown') arrowDown = false
  if (e.key === 'ArrowLeft') arrowLeft = false
  if (e.key === 'ArrowRight') arrowRight = false
  if (e.key === 'ArrowUp') arrowUp = false
})



document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    const Ball = document.getElementById('ball')
    Ball.style.top = y
    Ball.style.left = x
  }
}

setInterval(() => {
  const Ball = document.getElementById('ball')
  scaleX = 1
  scaleY = 1

  if (arrowDown) {
    moveTopBy += 10
    scaleX = 0.75
  }
  if (arrowUp) {
    moveTopBy -= 10
    scaleX = 0.75
  }
  if (arrowLeft) {
    scaleY = 0.75
    moveLeftBy -= 10
  }
  if (arrowRight) {
    moveLeftBy += 10
    scaleY = 0.75
  }

  Ball.style.transform = `translate(${moveLeftBy}px, ${moveTopBy}px)`
  Ball.style.transform += `scale(${scaleX}, ${scaleY})`
}, 10)