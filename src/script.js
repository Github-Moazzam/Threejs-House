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
const grassAlbedo = textureLoader.load(
  "/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png");
const grassAo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png');
const grassHeight = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png');
const grassMetallic = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png');
const grassNormal = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png');
const grassRoughness = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png');


const boxTexture = textureLoader.load(
  "/textures/bricks-mortar-bl/bricks-mortar-albedo.png"
);
const boxAo =  textureLoader.load('/textures/bricks-mortar-bl/bricks-mortar-ao.png')
const boxHeight =  textureLoader.load('/textures/bricks-mortar-bl/bricks-mortar-height.png')
const boxMetallic =  textureLoader.load('/textures/bricks-mortar-bl/bricks-mortar-metallic.png')
const boxNormal =  textureLoader.load('/textures/bricks-mortar-bl/bricks-mortar-normal-ogl.png')
const boxRoughness = textureLoader.load('/textures/bricks-mortar-bl/bricks-mortar-roughness.png')



const gateTexture = textureLoader.load("/textures/pngwing.com.png");


const roofTexture = textureLoader.load(
  "/textures/grey-asphalt-shingles-bl/grey-asphalt-shingles_albedo.png"
);
const roofAo = textureLoader.load(
  "/textures/grey-asphalt-shingles-bl/grey-asphalt-shingles_ao.png"
);
const roofHeight = textureLoader.load(
  "/textures/grey-asphalt-shingles-bl/grey-asphalt-shingles_height.png"
);
const roofMetallic = textureLoader.load(
  "/textures/grey-asphalt-shingles-bl/grey-asphalt-shingles_metallic.png"
);
const roofNormal = textureLoader.load(
  "/textures/grey-asphalt-shingles-bl/grey-asphalt-shingles_normal-ogl.png"
);
const roofroughness = textureLoader.load(
  "/textures/grey-asphalt-shingles-bl/grey-asphalt-shingles_roughness.png"
);


grassAlbedo.repeat.set(3, 3);
grassAlbedo.wrapS = THREE.RepeatWrapping;
grassAlbedo.wrapT = THREE.RepeatWrapping;

pane.addBinding(grassAlbedo, "offset", {
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
const sphereGeometry = new THREE.SphereGeometry(1,42,42)

//Material
const material = new THREE.MeshStandardMaterial();
material.map = grassAlbedo;
material.roughnessMap = grassRoughness;
material.aoMap = grassAo
material.displacementMap = grassHeight
material.displacementScale=0.3
material.metalnessMap = grassMetallic
material.normalMap = grassNormal

const boxMaterial = new THREE.MeshPhysicalMaterial();
boxMaterial.map = boxTexture;
boxMaterial.aoMap = boxAo

boxMaterial.roughnessMap = boxRoughness;
boxMaterial.displacementMap = boxHeight
boxMaterial.displacementScale=0
boxMaterial.metalnessMap = boxMetallic
boxMaterial.normalMap = boxNormal


const gateMaterial = new THREE.MeshStandardMaterial;
gateMaterial.map = gateTexture;

const roofMaterial = new THREE.MeshStandardMaterial();
roofMaterial.map = roofTexture;
roofMaterial.aoMap = roofAo
roofMaterial.roughnessMap = roofroughness;
roofMaterial.displacementMap = roofHeight
roofMaterial.displacementScale=0
roofMaterial.metalnessMap = roofMetallic
roofMaterial.normalMap = roofNormal



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

const sphere = new THREE.Mesh(sphereGeometry,material)
sphere.position.set(0,10,0)


group.add(box1, plane, gate, roof);
group2.add(box2,gate2,roof2)
parentGroup.add(group,group2,sphere)



//lighting
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight('white', 20);
pointLight.position.set(0, 4.3, 2.51);
scene.add(pointLight);

const axes = new THREE.AxesHelper(100);
parentGroup.add(axes)

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


  // parentGroup.rotation.y += delta * 1;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
