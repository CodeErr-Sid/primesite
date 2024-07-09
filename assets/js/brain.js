import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow map

document.getElementById("container3D").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 50, 100); // Adjust as needed

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(500, 500, 500);
directionalLight.castShadow = true; // Enable shadows for the light
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load(
  `models/brain/scene.gltf`,
  function (gltf) {
    const object = gltf.scene;
    object.scale.set(30, 30, 30);
    object.position.set(0, 0, 0);

    object.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Enable shadows for the object
        child.receiveShadow = true; // Enable shadow receiving
        child.material.color.set("#C1DD42");
      }
    });

    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
