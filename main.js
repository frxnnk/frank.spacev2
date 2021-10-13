import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloat } from 'three/src/math/MathUtils';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);


// Background
// Animation Loop
function render() {
  if (resize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
      renderer.setSize(width, height, false);
  }
  return needResize;
}


window.addEventListener( 'resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight )
})

function randomColor(){
  let color = [0x50c878, 0x7850c8, 0xc850a0, 0xc87850, 0xc85064, 0xffffff]
  return color[Math.floor(Math.random()*color.length)];
}
function addStar() {
  const geometry = new THREE.SphereGeometry(randFloat(0.01,0.18), 20, 20);
  const material = new THREE.MeshStandardMaterial({ color: randomColor()});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);

// Torus

const geometry = new THREE.TorusGeometry(20, 1, 5, 60);
const material = new THREE.MeshStandardMaterial({ color: 0x66cc66 });
const torus = new THREE.Mesh(geometry, material);
torus.position.setX(0);

scene.add(torus);


// Avatar

const franTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/smeraldgreen/frank.spacev2/master/fran.png');

const fran = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: franTexture }));

scene.add(fran);

// Moon

const moonTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/smeraldgreen/frank.spacev2/master/moon.jpg');
const marsTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/smeraldgreen/frank.spacev2/master/mars.jpg');
const fordTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/smeraldgreen/frank.spacev2/master/ford.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);

const ford = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: fordTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);
scene.add(mars);
scene.add(ford);

fran.position.z = -6;
fran.position.setY(-2);
fran.position.setX(0);

ford.position.z = -1;
ford.position.setX(-1);

moon.position.z = 7;
moon.position.setX(-3);

mars.position.z = 15;
mars.position.setX(-5);


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.01;
  moon.rotation.z += 0.01;

  mars.rotation.x += 0.01;
  mars.rotation.y += 0.01;
  mars.rotation.z += 0.01;

  ford.rotation.x += 0.01;
  ford.rotation.y += 0.01;
  ford.rotation.z += 0.01;

  fran.rotation.y += 0.01;
  fran.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();





function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  ford.rotation.x += 0.005;
  mars.rotation.x += 0.005;

  fran.rotation.x += 0.001;
  // controls.update();

  renderer.render(scene, camera);
}

window.onload(animate());

