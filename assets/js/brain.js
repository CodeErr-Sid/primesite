import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

console.log("Initializing scene and camera");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

console.log("Initializing renderer");
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

console.log("Appending renderer to DOM");
document.getElementById("container3D").appendChild(renderer.domElement);

console.log("Initializing OrbitControls");
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zoom
controls.enablePan = false; // Disable panning
controls.enableRotate = false; // Disable manual rotation

camera.position.set(0, 50, 100);

console.log("Adding lights to the scene");
const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(500, 500, 500);
directionalLight.castShadow = true;
scene.add(directionalLight);

console.log("Loading 3D model");
const loader = new GLTFLoader();
loader.load(
  `models/brain/scene.gltf`,
  function (gltf) {
    console.log("3D model loaded successfully");
    const object = gltf.scene;
    object.scale.set(17, 17, 17);
    object.position.set(-67, 25, 0);

    object.traverse((child) => {
      if (child.isMesh) {
        console.log("Setting up shadows for child mesh");
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.color.set("#C1DD42");
      }
    });

    scene.add(object);

    animate();

    function animate() {
      requestAnimationFrame(animate);

      // Rotate the object around its Y-axis
      object.rotation.y += 0.01; // Adjust rotation speed as needed

      renderer.render(scene, camera);
    }
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("Error loading 3D model", error);
  }
);

window.addEventListener("resize", () => {
  console.log("Window resized");
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
