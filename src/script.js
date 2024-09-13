import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { max, step } from "three/webgpu";
import { Pane } from "tweakpane";

const pane = new Pane();
// Canvas
const canvas = document.querySelector("canvas.webgl");

//init texture loader
const textureLoader = new THREE.TextureLoader();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

//Textures load
const grassTexture = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);
const boxTexture = textureLoader.load(
  "/textures/bricks-mortar-bl/bricks-mortar-albedo.png"
);
const gateTexture = textureLoader.load("/textures/pngwing.com.png");
const roofTexture = textureLoader.load(
  "/textures/grey-asphalt-shingles-bl/grey-asphalt-shingles_albedo.png"
);

grassTexture.repeat.set(2, 2);
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;

pane.addBinding(grassTexture, "offset", {
  x: {
    min: -1,
    max: 1,
    step: 0.001,
  },
  y: {
    min: -1,
    max: 1,
    step: 0.001,
  },
});

//geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const gateGeometry = new THREE.PlaneGeometry(1.3, 2.5);
const roofGeometry = new THREE.ConeGeometry(4, 2, 4, 1, false);

//Material
const material = new THREE.MeshBasicMaterial();
material.map = grassTexture;

const boxMaterial = new THREE.MeshBasicMaterial();
boxMaterial.map = boxTexture;

const gateMaterial = new THREE.MeshBasicMaterial();
gateMaterial.map = gateTexture;

const roofMaterial = new THREE.MeshBasicMaterial();
roofMaterial.map = roofTexture;

const group = new THREE.Group();
const group2 = new THREE.Group();
const parentGroup = new THREE.Group();
scene.add(group,group2,parentGroup)

// Create Mesh
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -(Math.PI * 0.5);
plane.scale.set(100, 100);
plane.position.set(0, 0, 0);

const box1 = new THREE.Mesh(geometry, boxMaterial);
box1.scale.set(5, 4.5, 5);
box1.position.set(0, 2.25, 0);

const box2 = new THREE.Mesh(geometry, boxMaterial);
box2.scale.set(5, 4.5, 5);
box2.position.set(10, 2.25, 0);

const gate = new THREE.Mesh(gateGeometry, gateMaterial);
gate.position.set(0, 1.3, 2.501);

const gate2 = new THREE.Mesh(gateGeometry, gateMaterial);
gate2.position.set(10, 1.3, 2.501);

const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(0, 5.52, 0);
roof.rotation.y = Math.PI * 0.25;


const roof2 = new THREE.Mesh(roofGeometry, roofMaterial);
roof2.position.set(10, 5.52, 0);
roof2.rotation.y = Math.PI * 0.25;


group.add(box1, plane, gate, roof);
group2.add(box2,gate2,roof2)
parentGroup.add(group,group2)



//lighting
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(0, 4, 0);
scene.add(pointLight);

const axes = new THREE.AxesHelper(100);
scene.add(axes)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 8;
camera.position.y = 10;

scene.add(camera);

//Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

//renderer set size
renderer.setSize(sizes.width, sizes.height);

//Resizing feature
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Clock
const clock = new THREE.Clock();
let previousTime = 0;

//Render Loop
const tick = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;


  parentGroup.rotation.y += delta * 1;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
