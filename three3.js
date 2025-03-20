// (c) ZUJKOV COM | all rights reserved

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


document.addEventListener('DOMContentLoaded', function() {
// Three.js Setup
const container = document.createElement('div');
document.body.appendChild(container);

const scene = new THREE.Scene({ alpha: true });

	scene.rotation.x = 0;
	scene.rotation.y = -Math.PI/3;
	scene.rotation.z = 0;
	
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 0, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
container.appendChild(renderer.domElement);

// Beleuchtung
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 200);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(0, 200, 200);
scene.add(dirLight);

// GLTF Loader und Modell laden
const loader = new GLTFLoader();
let model, BoneARML1, BoneARML2, BoneARMR1, BoneARMR2, BoneBEINL1, BoneBEINL2, BoneBEINL3, BoneBEINR1, BoneBEINR2, BoneBEINR3;

loader.load('RO_Bone_small_v3.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);

    // Initialisieren der Bones nach dem Laden des Modells
    BoneARMR1 = model.getObjectByName('ARMR1');
    BoneARMR2 = model.getObjectByName('ARMR2');
    BoneARML1 = model.getObjectByName('ARML1');
    BoneARML2 = model.getObjectByName('ARML2');
    BoneBEINL1 = model.getObjectByName('BEINL1');
    BoneBEINL2 = model.getObjectByName('BEINL2');
    BoneBEINL3 = model.getObjectByName('BEINL3');
    BoneBEINR1 = model.getObjectByName('BEINR1');
    BoneBEINR2 = model.getObjectByName('BEINR2');
    BoneBEINR3 = model.getObjectByName('BEINR3');

    // Optionale Initialrotationen
    rotateBone(BoneARMR2, 0, 0, -(Math.PI / 4));
    rotateBone(BoneARMR1, 0, 0, -(Math.PI / 4));

    renderer.setAnimationLoop(animate); // Starten der Animation nach dem Laden des Modells
}, undefined, function(error) {
    console.error(error);
});

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
controls.minDistance = 500;
controls.maxDistance = 1000;
controls.target.set(0, 0, 0);
controls.update();

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function render() {
    renderer.render(scene, camera);
}



setInterval( () => {
  
	rotateBone(BoneARML1, 0, 0, -(leftUpperArmAngle + (Math.PI / 2)));
	rotateBone(BoneARML2, 0, 0, -(leftLowerArmAngle ));
	
	rotateBone(BoneARMR1, 0, 0, -(rightUpperArmAngle + (Math.PI / 2)));
	rotateBone(BoneARMR2, 0, 0, -(rightLowerArmAngle ));
	
	
	
}, 250 );
	
	

function animate() {

    renderer.render(scene, camera);
	
}

// Hilfsfunktionen

function gradToRadiant(grad) {
    return grad * Math.PI / 180;
}


function rotateBone(bone, angleX, angleY, angleZ) {
    if (bone) { // ÃœberprÃ¼fen, ob das Bone gefunden wurde
        bone.rotation.set(angleX, angleY, angleZ);
    }
}


});
















