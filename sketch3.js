let leftUpperArmAngle = 0;
let leftLowerArmAngle = 0;
let rightUpperArmAngle = 0;
let rightLowerArmAngle = 0;

let muliplicator = 2;

let x = 200;
let y = 200;
let headRadius = 20;
let upperBodyLength = 50*muliplicator; // Deklaration und Initialisierung
let upperArmLength = 30*muliplicator;
let lowerArmLength = 30*muliplicator;


function setup() {
  createCanvas(400, 400);

  // Slider für den linken Oberarm
  const leftUpperArmSlider = document.getElementById('leftUpperArmSlider');
  leftUpperArmSlider.addEventListener('input', () => {
    leftUpperArmAngle = map(leftUpperArmSlider.value, -90, 90, -PI / 2, PI / 2);
  });

  // Slider für den linken Unterarm
  const leftLowerArmSlider = document.getElementById('leftLowerArmSlider');
  leftLowerArmSlider.addEventListener('input', () => {
    leftLowerArmAngle = map(leftLowerArmSlider.value, -90, 90, -PI / 2, PI / 2);
  });

  // Slider für den rechten Oberarm
  const rightUpperArmSlider = document.getElementById('rightUpperArmSlider');
  rightUpperArmSlider.addEventListener('input', () => {
    rightUpperArmAngle = map(rightUpperArmSlider.value, -90, 90, -PI / 2, PI / 2);
  });

  // Slider für den rechten Unterarm
  const rightLowerArmSlider = document.getElementById('rightLowerArmSlider');
  rightLowerArmSlider.addEventListener('input', () => {
    rightLowerArmAngle = map(rightLowerArmSlider.value, -90, 90, -PI / 2, PI / 2);
  });
}

function draw() {
  background(220);
  // ... (Zeichnen des Strichmännchens mit den oben definierten Winkeln)
	
	
  // Kopf
  ellipse(x, y - upperBodyLength - headRadius, headRadius * 2, headRadius * 2);

  // Oberkörper
  line(x, y - upperBodyLength, x, y);

  // Arme
  drawArm(x, y - upperBodyLength, leftUpperArmAngle, leftLowerArmAngle, upperArmLength, lowerArmLength, -1); // Linker Arm
  drawArm(x, y - upperBodyLength, rightUpperArmAngle, rightLowerArmAngle, upperArmLength, lowerArmLength, 1); // Rechter Arm

}

function drawArm(startX, startY, upperArmAngle, lowerArmAngle, upperArmLength, lowerArmLength, direction) {
  // Oberarm
  let upperArmX = startX - cos(upperArmAngle) * upperArmLength * direction;
  let upperArmY = startY - sin(upperArmAngle) * upperArmLength;
  line(startX, startY, upperArmX, upperArmY);

  // Unterarm
  let lowerArmX = upperArmX - cos(upperArmAngle + lowerArmAngle) * lowerArmLength * direction;
  let lowerArmY = upperArmY - sin(upperArmAngle + lowerArmAngle) * lowerArmLength;
  line(upperArmX, upperArmY, lowerArmX, lowerArmY);
}