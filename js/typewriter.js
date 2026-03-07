const typewriterElement = document.getElementById("typewriter");
const textParts = [
  { text: "Front-", style: "color:#F8C8FF;" },
  { text: "end Developer", style: "" }
];

let partIndex = 0;
let charIndex = 0;
const speed = 100; // velocidade em ms

function typeWriter() {
  if (partIndex < textParts.length) {
    const currentPart = textParts[partIndex];

    if (charIndex < currentPart.text.length) {
      // se tiver estilo, escreve dentro de um span
      if (currentPart.style) {
        typewriterElement.innerHTML += `<span style="${currentPart.style}">${currentPart.text.charAt(charIndex)}</span>`;
      } else {
        typewriterElement.innerHTML += currentPart.text.charAt(charIndex);
      }
      charIndex++;
      setTimeout(typeWriter, speed);
    } else {
      // terminou uma parte, passa pra próxima
      partIndex++;
      charIndex = 0;
      setTimeout(typeWriter, speed);
      
    }
  }
}

window.onload = typeWriter;