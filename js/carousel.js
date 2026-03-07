gsap.registerPlugin(MotionPathPlugin);

// Converts the <circle> to a <path>
const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
circlePath.id = "circlePath";
document.querySelector("svg").prepend(circlePath);

// Select itens
const items = document.querySelectorAll('.item');
const itemCount = items.length;

// Labels in the same order as .item in HTML
const labels = ["HTML", "JavaScript", "CSS"]; 
// Paragraph texts corresponding to each item (same order)
const paragraphs = [
  "HTML (HyperText Markup Language) is the standard coding language for creating web pages, using tags to structure content like headings, paragraphs, images, and links, telling web browsers how to display it, forming the fundamental building block of the web alongside CSS and JavaScript.",
  "JavaScript is a scripting and programming language that brings web pages to life: it enables the implementation of complex features, creates dynamically updating content, controls multimedia, animates images, and powers a wide range of interactive behaviors.",
  "Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media."
];

// Define passo e snapping
let step = 1 / itemCount;
let wrapProgress = gsap.utils.wrap(0, 1);
let snap = gsap.utils.snap(step);

// Offset used in gsap.set (keep the same value here)
const offset = 0.75;

// Position the items along the circle.
gsap.set(items, {
  motionPath: {
    path: circlePath,
    align: circlePath,
    alignOrigin: [0.5, 0.5],
    end: i => (i / itemCount) + offset
  }
});

// We'll animate the rotation in angular steps so the carousel can rotate
// continuously without snapping back. Use a manual index and relative
// rotations for `.wrapper` and counter-rotation for `items`.

let currentIndex = 0;
const angleStep = 360 * step; // degrees per item

// Update active class and title.
function updateActiveItem(index) {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
  const titleEl = document.getElementById('dynamicTitle');
  if (titleEl && labels[index] !== undefined) titleEl.textContent = labels[index];
  const paragraphEl = document.getElementById('dynamicParagraph');
  if (paragraphEl && paragraphs[index] !== undefined) paragraphEl.textContent = paragraphs[index];
  currentIndex = index;
}

// initialize
updateActiveItem(0);

// NEXT
document.getElementById('next').addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // rotate forward by one step (angleStep)
  currentIndex = (currentIndex + 1) % itemCount;
  gsap.to('.wrapper', {
    rotation: `+=${angleStep}`,
    transformOrigin: 'center',
    duration: 0.6,
    ease: 'power1.inOut',
    overwrite: true
  });
  gsap.to(items, {
    rotation: `-=${angleStep}`,
    transformOrigin: 'center',
    duration: 0.6,
    ease: 'power1.inOut',
    overwrite: true
  });
  updateActiveItem(currentIndex);
});

// PREV
document.getElementById('prev').addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // rotate backward by one step (angleStep)
  currentIndex = (currentIndex - 1 + itemCount) % itemCount;
  gsap.to('.wrapper', {
    rotation: `-=${angleStep}`,
    transformOrigin: 'center',
    duration: 0.6,
    ease: 'power1.inOut',
    overwrite: true
  });
  gsap.to(items, {
    rotation: `+=${angleStep}`,
    transformOrigin: 'center',
    duration: 0.6,
    ease: 'power1.inOut',
    overwrite: true
  });
  updateActiveItem(currentIndex);
});

