import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// 1. Core Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// 2. Inventory Data (Title, Qty, Location)
const inventory = [
  { title: "Dune", qty: 12, loc: "Shelf A1", color: 0xe67e22 },
  { title: "Neuromancer", qty: 5, loc: "Shelf B2", color: 0x3498db },
  { title: "Foundation", qty: 8, loc: "Shelf A2", color: 0x2ecc71 }
];

// 3. Render Books
const books = [];
inventory.forEach((bookData, index) => {
  const geometry = new THREE.BoxGeometry(2, 3, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: bookData.color });
  const book = new THREE.Mesh(geometry, material);
  
  book.position.x = (index - 1) * 3;
  scene.add(book);
  books.push(book);
});

camera.position.z = 8;
camera.position.y = 1;

// 4. Animation & Resize Handling
function animate() {
  requestAnimationFrame(animate);
  books.forEach(b => b.rotation.y += 0.005);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
